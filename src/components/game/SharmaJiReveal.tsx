'use client';

import { motion } from 'framer-motion';

interface SharmaJiRevealProps {
  answer: string;
  scenario: string;
  isHost: boolean;
  onNext: () => void;
}

export function SharmaJiReveal({ answer, scenario, isHost, onNext }: SharmaJiRevealProps) {
  return (
    <div className="bg-void text-on-surface min-h-screen flex flex-col items-center justify-center px-gutter md:px-margin-desktop py-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.03)_0%,_rgba(8,8,8,1)_80%)]" />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full max-w-md">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[1.6rem] md:text-[2rem] text-jugaad text-center tracking-wider uppercase glow-text-primary"
        >
          SHARMA JI KA BETA WOULD HAVE...
        </motion.div>

        {/* Character Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card p-8 w-full relative overflow-hidden"
          style={{ 
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)',
            borderColor: 'rgba(255, 215, 0, 0.2)',
          }}
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-jugaad/50 to-transparent" />
          
          {/* Avatar */}
          <div className="text-center mb-5">
            <span className="text-[3rem] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">📚</span>
            <div className="font-display text-[1.4rem] text-jugaad mt-2 tracking-wider uppercase">
              SHARMA JI KA BETA
            </div>
            <div className="font-timer-mono text-[10px] text-on-surface-variant mt-1 uppercase tracking-widest opacity-60">
              THE PERFECT ANSWER™
            </div>
          </div>

          {/* Answer */}
          <p className="font-scenario-text text-scenario-text text-on-surface leading-relaxed text-center italic">
            &ldquo;{answer}&rdquo;
          </p>
        </motion.div>

        {/* Next */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full"
        >
          {isHost ? (
            <button
              onClick={onNext}
              className="w-full py-4 bg-primary text-on-primary font-display text-[1.5rem] uppercase rounded-lg tracking-widest shadow-[0_0_15px_rgba(255,84,74,0.3)] hover:bg-primary-container hover:shadow-[0_0_25px_rgba(255,84,74,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              SCOREBOARD
              <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            </button>
          ) : (
            <p className="font-timer-mono text-center text-on-surface-variant uppercase tracking-widest text-sm opacity-50">
              Waiting for host...
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
