import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';
import { generateRoomCode } from '@/lib/game/roomCode';
import type { ScenarioCategory, CharacterType } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      playerName,
      character,
      category = 'mixed',
      totalRounds = 5,
      sessionId,
    } = body as {
      playerName: string;
      character: CharacterType;
      category: ScenarioCategory;
      totalRounds: number;
      sessionId: string;
    };

    if (!playerName || !character || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields: playerName, character, sessionId' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    // Generate unique room code (retry on collision)
    let code = generateRoomCode();
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabase
        .from('rooms')
        .select('id')
        .eq('code', code)
        .single();

      if (!existing) break;
      code = generateRoomCode();
      attempts++;
    }

    // Create room
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .insert({
        code,
        host_session_id: sessionId,
        status: 'lobby',
        category,
        total_rounds: totalRounds,
        current_round: 0,
      })
      .select()
      .single();

    if (roomError || !room) {
      console.error('Room creation error:', roomError);
      return NextResponse.json(
        { error: 'Failed to create room' },
        { status: 500 }
      );
    }

    // Create host player
    const { data: player, error: playerError } = await supabase
      .from('players')
      .insert({
        room_id: room.id,
        session_id: sessionId,
        name: playerName,
        character,
        is_host: true,
        score: 0,
        lifeline_used: false,
        is_active: true,
      })
      .select()
      .single();

    if (playerError || !player) {
      console.error('Player creation error:', playerError);
      return NextResponse.json(
        { error: 'Failed to create player' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      room,
      player,
      code: room.code,
    });
  } catch (error) {
    console.error('Create room error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
