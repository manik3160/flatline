/**
 * Generate a unique 5-character alphanumeric room code
 * Uses characters that are easy to read and type on mobile
 */
export function generateRoomCode(): string {
  // Exclude ambiguous characters: 0/O, 1/I/L
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
