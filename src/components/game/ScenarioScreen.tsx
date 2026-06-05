'use client';

import { motion } from 'framer-motion';
import type { ScenarioCategory } from '@/types';

const CATEGORY_LABELS: Record<ScenarioCategory, { label: string; emoji: string }> = {
  mixed: { label: 'Random', emoji: '🎲' },
  family_pressure: { label: 'Family Pressure', emoji: '👨‍👩‍👧' },
  college_life: { label: 'College Life', emoji: '🎓' },
  indian_streets: { label: 'Indian Streets', emoji: '🛺' },
  monsoon_madness: { label: 'Monsoon Madness', emoji: '🌧️' },
  festival_chaos: { label: 'Festival Chaos', emoji: '🎆' },
  startup_it_life: { label: 'Startup/IT', emoji: '💻' },
  shaadi_season: { label: 'Shaadi Season', emoji: '💍' },
};

interface ScenarioScreenProps {
  scenario: string;
  roundNumber: number;
  totalRounds: number;
  category: ScenarioCategory;
}

export function ScenarioScreen({
  scenario,
  roundNumber,
  totalRounds,
  category,
}: ScenarioScreenProps) {
  const cat = CATEGORY_LABELS[category] || CATEGORY_LABELS.mixed;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: '24px',
        padding: '20px 0',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          className="font-mono"
          style={{
            fontSize: '0.7rem',
            color: 'var(--red-flatline)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '4px 10px',
            background: 'var(--red-soft)',
            borderRadius: '4px',
          }}
        >
          Round {roundNumber}/{totalRounds}
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            padding: '4px 10px',
            background: 'var(--bg-surface)',
            borderRadius: '4px',
          }}
        >
          {cat.emoji} {cat.label}
        </div>
      </div>

      {/* Scenario Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <p
          className="font-serif"
          style={{
            fontSize: 'clamp(1.1rem, 4.5vw, 1.5rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          {scenario}
        </p>
      </motion.div>

      {/* Bottom status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        Read carefully... answering starts soon
      </motion.div>
    </div>
  );
}
