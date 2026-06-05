import { getSupabaseClient } from './client';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

/**
 * Get or create a realtime channel for a room
 */
export function getRoomChannel(roomCode: string): RealtimeChannel {
  const supabase = getSupabaseClient();
  return supabase.channel(`room:${roomCode}`);
}

/**
 * Subscribe to room DB changes
 */
export function subscribeToRoomChanges(
  roomCode: string,
  onUpdate: (payload: Record<string, unknown>) => void
): RealtimeChannel {
  const supabase = getSupabaseClient();
  
  return supabase
    .channel(`room-db-${roomCode}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'rooms',
        filter: `code=eq.${roomCode}`,
      },
      (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
        onUpdate(payload.new as Record<string, unknown>);
      }
    )
    .subscribe();
}

/**
 * Subscribe to players table changes for a room
 */
export function subscribeToPlayerChanges(
  roomId: string,
  onUpdate: (payload: Record<string, unknown>) => void,
  onInsert: (payload: Record<string, unknown>) => void
): RealtimeChannel {
  const supabase = getSupabaseClient();
  
  return supabase
    .channel(`players-db-${roomId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'players',
        filter: `room_id=eq.${roomId}`,
      },
      (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => onUpdate(payload.new as Record<string, unknown>)
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'players',
        filter: `room_id=eq.${roomId}`,
      },
      (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => onInsert(payload.new as Record<string, unknown>)
    )
    .subscribe();
}
