'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VerdictCard } from '@/components/ui/VerdictCard';
import type { VerdictResult } from '@/types';

interface VerdictRevealProps {
  results: VerdictResult[];
  myPlayerId: string;
  isHost: boolean;
  onNext: () => void;
}

export function VerdictReveal({ results, myPlayerId, isHost, onNext }: VerdictRevealProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const allRevealed = revealedCount >= results.length;

  useEffect(() => {
    if (revealedCount < results.length) {
      const timer = setTimeout(() => {
        setRevealedCount((c) => c + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [revealedCount, results.length]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        paddingTop: '24px',
        paddingBottom: '24px',
        minHeight: '100dvh',
      }}
    >
      {/* Title */}
      <div
        className="font-display"
        style={{
          fontSize: '1.5rem',
          color: 'var(--red-flatline)',
          textAlign: 'center',
          marginBottom: '8px',
        }}
      >
        VERDICTS
      </div>

      {/* Verdict Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {results.slice(0, revealedCount).map((result, index) => (
          <motion.div
            key={result.playerId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <VerdictCard
              playerName={result.playerName}
              character={result.character}
              verdict={result.verdict}
              narration={result.narration}
              roastText={result.roastText}
              isMyVerdict={result.playerId === myPlayerId}
            />
          </motion.div>
        ))}
      </div>

      {/* Next button (host only, after all revealed) */}
      {allRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isHost ? (
            <button
              className="btn btn-primary"
              onClick={onNext}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.1em',
              }}
            >
              SHARMA JI KA BETA →
            </button>
          ) : (
            <p
              className="font-mono"
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}
            >
              Waiting for host...
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
