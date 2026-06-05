'use client';

import { motion } from 'framer-motion';
import { PlayerChip } from '@/components/ui/PlayerChip';
import type { PlayerRow, VerdictResult } from '@/types';

interface RoundScoresProps {
  players: PlayerRow[];
  verdictResults: VerdictResult[];
  currentRound: number;
  totalRounds: number;
  isHost: boolean;
  onNextRound: () => void;
}

export function RoundScores({
  players,
  verdictResults,
  currentRound,
  totalRounds,
  isHost,
  onNextRound,
}: RoundScoresProps) {
  // Sort players by score
  const sorted = [...players].sort((a, b) => b.score - a.score);

  // Merge scores from this round's verdicts
  const getThisRoundPoints = (playerId: string): number => {
    const v = verdictResults.find((r) => r.playerId === playerId);
    return v?.points || 0;
  };

  const isLastRound = currentRound >= totalRounds;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingTop: '24px',
        paddingBottom: '24px',
        minHeight: '100dvh',
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <div
          className="font-display"
          style={{ fontSize: '1.5rem', color: 'var(--red-flatline)' }}
        >
          ROUND {currentRound} SCORES
        </div>
        <div
          className="font-mono"
          style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}
        >
          {currentRound}/{totalRounds} rounds complete
        </div>
      </div>

      {/* Player Scores */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {sorted.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            {/* Rank */}
            <div
              className="font-display"
              style={{
                fontSize: '1.4rem',
                color: index === 0 ? 'var(--gold-jugaad)' : index === 1 ? 'var(--text-secondary)' : 'var(--text-muted)',
                width: '30px',
                textAlign: 'center',
              }}
            >
              {index + 1}
            </div>

            {/* Player Chip */}
            <div style={{ flex: 1 }}>
              <PlayerChip
                name={player.name}
                character={player.character}
                isHost={player.is_host}
                score={player.score + getThisRoundPoints(player.id)}
                showScore
              />
            </div>

            {/* This round's points */}
            {getThisRoundPoints(player.id) > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--green-bach)',
                  fontWeight: 600,
                }}
              >
                +{getThisRoundPoints(player.id)}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Next Round / Game Over */}
      {isHost ? (
        <button
          className="btn btn-primary"
          onClick={onNextRound}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.1em',
          }}
        >
          {isLastRound ? 'FINAL RESULTS →' : 'NEXT ROUND →'}
        </button>
      ) : (
        <p
          className="font-mono"
          style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}
        >
          Waiting for host...
        </p>
      )}
    </div>
  );
}
