import type { VerdictTier, CharacterType } from '@/types';

/**
 * Base points for each verdict tier
 */
const VERDICT_POINTS: Record<VerdictTier, number> = {
  JUGAAD: 3,
  BACH_GAYA: 1,
  BARBAD: 0,
  ANTIM_SANSKAR: 0,
};

/**
 * Tier upgrade order for Jugaadu character ability
 */
const TIER_UPGRADE: Record<VerdictTier, VerdictTier> = {
  ANTIM_SANSKAR: 'BARBAD',
  BARBAD: 'BACH_GAYA',
  BACH_GAYA: 'JUGAAD',
  JUGAAD: 'JUGAAD', // Already max
};

/**
 * Calculate final verdict and points with character modifiers
 */
export function calculateScore(
  verdict: VerdictTier,
  character: CharacterType
): { finalVerdict: VerdictTier; points: number } {
  let finalVerdict = verdict;

  // Jugaadu: +1 tier, can never get ANTIM_SANSKAR
  if (character === 'jugaadu') {
    finalVerdict = TIER_UPGRADE[finalVerdict];
  }

  const points = VERDICT_POINTS[finalVerdict];

  return { finalVerdict, points };
}
