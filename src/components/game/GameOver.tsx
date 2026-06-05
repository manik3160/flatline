'use client';

import { motion } from 'framer-motion';
import { EkgLine } from '@/components/ui/EkgLine';
import type { PlayerRow } from '@/types';

interface GameOverProps {
  players: PlayerRow[];
  onPlayAgain: () => void;
}

const PODIUM_EMOJIS = ['🥇', '🥈', '🥉'];

const CHARACTER_EMOJIS: Record<string, string> = {
  topper: '🎓',
  jugaadu: '🔧',
  sharma_ji: '📚',
  it_uncle: '💻',
};

export function GameOver({ players, onPlayAgain }: GameOverProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        paddingTop: '40px',
        paddingBottom: '40px',
        minHeight: '100dvh',
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            color: 'var(--red-flatline)',
            lineHeight: 1,
          }}
        >
          FLATLINE COMPLETE
        </h2>
        <div style={{ margin: '12px auto', width: '150px' }}>
          <EkgLine height={24} animationDuration={2} />
        </div>
      </motion.div>

      {/* Podium — Top 3 */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'flex-end', width: '100%' }}>
        {sorted.slice(0, 3).map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (2 - index) * 0.2 + 0.3, duration: 0.5, type: 'spring' }}
            style={{
              flex: 1,
              textAlign: 'center',
              order: index === 0 ? 1 : index === 1 ? 0 : 2,
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
              {PODIUM_EMOJIS[index]}
            </div>
            <div
              className="card"
              style={{
                padding: '16px 10px',
                height: index === 0 ? '140px' : index === 1 ? '110px' : '90px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                border: index === 0
                  ? '1px solid var(--gold-jugaad)33'
                  : '1px solid var(--border)',
                boxShadow: index === 0 ? 'var(--glow-jugaad)' : 'none',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{CHARACTER_EMOJIS[player.character]}</span>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                {player.name}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--gold-jugaad)',
                }}
              >
                {player.score}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Player List */}
      {sorted.length > 3 && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sorted.slice(3).map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div
                className="font-mono"
                style={{ fontSize: '0.85rem', color: 'var(--text-muted)', width: '24px', textAlign: 'center' }}
              >
                {index + 4}
              </div>
              <div className="card" style={{ flex: 1, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>{CHARACTER_EMOJIS[player.character]}</span>
                <span style={{ flex: 1, fontSize: '0.85rem' }}>{player.name}</span>
                <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--gold-jugaad)' }}>
                  {player.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}
      >
        <button
          className="btn btn-primary"
          onClick={onPlayAgain}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.1em',
          }}
        >
          PLAY AGAIN
        </button>
      </motion.div>
    </div>
  );
}
