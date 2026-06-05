import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format seconds into MM:SS display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(Math.max(0, seconds) / 60);
  const secs = Math.max(0, seconds) % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get or create a persistent session ID in localStorage
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  const KEY = 'flatline_session_id';
  let id = localStorage.getItem(KEY);
  
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  
  return id;
}

/**
 * Calculate remaining seconds from a deadline timestamp
 */
export function getSecondsRemaining(deadline: string | number | null): number {
  if (!deadline) return 0;
  const deadlineMs = typeof deadline === 'string' ? new Date(deadline).getTime() : deadline;
  return Math.ceil((deadlineMs - Date.now()) / 1000);
}
