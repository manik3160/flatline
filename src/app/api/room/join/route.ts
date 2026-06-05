import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';
import type { CharacterType } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { playerName, character, roomCode, sessionId } = body as {
      playerName: string;
      character: CharacterType;
      roomCode: string;
      sessionId: string;
    };

    if (!playerName || !character || !roomCode || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    // Find room by code
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('code', roomCode.toUpperCase())
      .single();

    if (roomError || !room) {
      return NextResponse.json(
        { error: 'Room not found. Check the code and try again.' },
        { status: 404 }
      );
    }

    if (room.status !== 'lobby') {
      return NextResponse.json(
        { error: 'Game already in progress. Cannot join.' },
        { status: 400 }
      );
    }

    // Check if player already exists in this room (reconnecting)
    const { data: existingPlayer } = await supabase
      .from('players')
      .select('*')
      .eq('room_id', room.id)
      .eq('session_id', sessionId)
      .single();

    if (existingPlayer) {
      // Reconnect — update active status
      const { data: updatedPlayer } = await supabase
        .from('players')
        .update({ is_active: true, name: playerName, character })
        .eq('id', existingPlayer.id)
        .select()
        .single();

      return NextResponse.json({
        room,
        player: updatedPlayer || existingPlayer,
        code: room.code,
        reconnected: true,
      });
    }

    // Check player count (max 8)
    const { count } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })
      .eq('room_id', room.id)
      .eq('is_active', true);

    if (count !== null && count >= 8) {
      return NextResponse.json(
        { error: 'Room is full (max 8 players)' },
        { status: 400 }
      );
    }

    // Create player
    const { data: player, error: playerError } = await supabase
      .from('players')
      .insert({
        room_id: room.id,
        session_id: sessionId,
        name: playerName,
        character,
        is_host: false,
        score: 0,
        lifeline_used: false,
        is_active: true,
      })
      .select()
      .single();

    if (playerError || !player) {
      console.error('Player creation error:', playerError);
      return NextResponse.json(
        { error: 'Failed to join room' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      room,
      player,
      code: room.code,
      reconnected: false,
    });
  } catch (error) {
    console.error('Join room error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
