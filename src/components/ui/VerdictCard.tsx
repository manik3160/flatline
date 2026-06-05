'use client';

import { motion } from 'framer-motion';
import type { VerdictTier } from '@/types';

interface VerdictCardProps {
  playerName: string;
  character: string;
  verdict: VerdictTier;
  narration: string;
  roastText?: string;
  isMyVerdict: boolean;
}

const VERDICT_CONFIG: Record<VerdictTier, { label: string; emoji: string; color: string; glow: string }> = {
  JUGAAD: { label: 'JUGAAD', emoji: '🔥', color: 'var(--gold-jugaad)', glow: 'var(--glow-jugaad)' },
  BACH_GAYA: { label: 'BACH GAYA', emoji: '😅', color: 'var(--green-bach)', glow: 'var(--glow-bach)' },
  BARBAD: { label: 'BARBAD', emoji: '💀', color: 'var(--orange-barbad)', glow: 'var(--glow-barbad)' },
  ANTIM_SANSKAR: { label: 'ANTIM SANSKAR', emoji: '☠️', color: 'var(--purple-antim)', glow: 'var(--glow-antim)' },
};

const CHARACTER_EMOJIS: Record<string, string> = {
  topper: '🎓',
  jugaadu: '🔧',
  sharma_ji: '📚',
  it_uncle: '💻',
};

export function VerdictCard({
  playerName,
  character,
  verdict,
  narration,
  roastText,
  isMyVerdict,
}: VerdictCardProps) {
  const config = VERDICT_CONFIG[verdict];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
      className="card"
      style={{
        padding: '20px',
        border: `1px solid ${config.color}33`,
        boxShadow: isMyVerdict ? config.glow : 'none',
        transform: isMyVerdict ? 'scale(1.02)' : undefined,
      }}
    >
      {/* Player Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '1.6rem' }}>{CHARACTER_EMOJIS[character] || '🎮'}</span>
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {playerName}
        </span>
        {isMyVerdict && (
          <span
            className="font-mono"
            style={{
              fontSize: '0.6rem',
              padding: '2px 6px',
              background: 'var(--red-soft)',
              color: 'var(--red-flatline)',
              borderRadius: '4px',
              marginLeft: 'auto',
            }}
          >
            YOU
          </span>
        )}
      </div>

      {/* Verdict */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{config.emoji}</div>
        <div
          className="font-display"
          style={{
            fontSize: '2rem',
            color: config.color,
            lineHeight: 1,
            animation: 'verdict-glow 2s ease-in-out infinite',
          }}
        >
          {config.label}
        </div>
      </div>

      {/* Narration */}
      <p
        className="font-serif"
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{narration}&rdquo;
      </p>

      {/* Roast (ANTIM SANSKAR only) */}
      {roastText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '12px',
            padding: '12px',
            background: 'rgba(168, 85, 247, 0.08)',
            borderRadius: '8px',
            border: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--purple-antim)',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            {roastText}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
