'use client';

import { motion } from 'framer-motion';
import type { CharacterDef } from '@/types';

interface CharacterCardProps {
  character: CharacterDef;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function CharacterCard({ character, selected, onSelect, disabled }: CharacterCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      className="card"
      style={{
        padding: '16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: selected
          ? '2px solid var(--gold-jugaad)'
          : '1px solid var(--border)',
        boxShadow: selected ? 'var(--glow-jugaad)' : 'none',
        opacity: disabled ? 0.4 : 1,
        textAlign: 'left',
        width: '100%',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Emoji + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.8rem' }}>{character.emoji}</span>
        <div>
          <div
            className="font-display"
            style={{
              fontSize: '1.1rem',
              color: selected ? 'var(--gold-jugaad)' : 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            {character.name}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            {character.ability}
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.4,
        }}
      >
        {character.description}
      </p>
    </motion.button>
  );
}
