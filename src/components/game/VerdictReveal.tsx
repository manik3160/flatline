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
      }, 2500); // Slower reveal for high drama
      return () => clearTimeout(timer);
    }
  }, [revealedCount, results.length]);

  return (
    <div className="bg-void text-on-surface min-h-screen flex flex-col font-body-base overflow-x-hidden relative pb-24">
      {/* Optional Top Bar area (empty or for future use) */}
      <div className="w-full pt-8 px-gutter flex justify-between items-center mb-4">
        <div className="font-timer-mono text-jugaad opacity-70">
          RESULTS
        </div>
        <div className="font-display text-2xl text-primary tracking-tighter uppercase opacity-50">
          FLATLINE
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto px-gutter flex flex-col items-center">
        {/* Verdict Cards Stack */}
        <div className="w-full flex flex-col gap-12">
          {results.slice(0, revealedCount).map((result, index) => (
            <motion.div
              key={result.playerId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
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
            transition={{ delay: 1 }}
            className="mt-16 w-full"
          >
            {isHost ? (
              <button
                className="w-full py-5 bg-primary text-on-primary font-display text-[32px] leading-none uppercase rounded shadow-[0_0_15px_rgba(255,84,74,0.3)] hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={onNext}
              >
                NEXT ROUND <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
              </button>
            ) : (
              <p className="font-timer-mono text-center text-on-surface-variant uppercase tracking-widest text-sm opacity-50">
                WAITING FOR HOST TO CONTINUE...
              </p>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
