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
    <div className="bg-void text-on-surface min-h-screen flex flex-col px-gutter md:px-margin-desktop py-6 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(32,15,13,0.6)_0%,_rgba(8,8,8,1)_100%)]" />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-6 flex-1">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-[2.5rem] md:text-[3rem] text-primary-container glow-text-red uppercase tracking-wider leading-none">
            ROUND {currentRound} SCORES
          </h1>
          <p className="font-timer-mono text-[12px] text-on-surface-variant mt-2 uppercase tracking-widest opacity-60">
            {currentRound}/{totalRounds} rounds complete
          </p>
        </motion.div>

        {/* Separator */}
        <div className="ekg-line opacity-40" />

        {/* Player Scores */}
        <div className="flex flex-col gap-3 flex-1">
          {sorted.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {/* Rank */}
              <div
                className={`font-display text-[1.8rem] w-8 text-center shrink-0 ${
                  index === 0 ? 'text-jugaad' : index === 1 ? 'text-on-surface-variant' : 'text-on-surface-variant/50'
                }`}
              >
                {index + 1}
              </div>

              {/* Player Chip */}
              <div className="flex-1">
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
                  className="font-timer-mono text-[14px] text-bach-gaya font-bold shrink-0"
                >
                  +{getThisRoundPoints(player.id)}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Next Round / Game Over */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-auto"
        >
          {isHost ? (
            <button
              onClick={onNextRound}
              className="w-full py-4 bg-primary text-on-primary font-display text-[2rem] uppercase rounded-lg tracking-widest shadow-[0_0_15px_rgba(255,84,74,0.3)] hover:bg-primary-container hover:shadow-[0_0_25px_rgba(255,84,74,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isLastRound ? 'FINAL RESULTS' : 'NEXT ROUND'}
              <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
            </button>
          ) : (
            <p className="font-timer-mono text-center text-on-surface-variant uppercase tracking-widest text-sm opacity-50">
              WAITING FOR HOST...
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
