'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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

  // 5 seconds countdown
  const [timeLeft, setTimeLeft] = useState(500); 

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(Math.floor(remaining / 10)); // 10ms intervals for two decimal places
      
      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 30); // ~30fps update rate for smooth display

    return () => clearInterval(timer);
  }, []);

  const seconds = Math.floor(timeLeft / 100);
  const milliseconds = (timeLeft % 100).toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 bg-void text-on-surface h-screen w-screen overflow-hidden flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container z-50">
      {/* Top Status Section */}
      <header className="w-full pt-8 px-gutter md:px-margin-desktop flex flex-col items-center">
        <div className="flex justify-between w-full max-w-4xl mb-4">
          <div className="font-timer-mono text-timer-mono text-on-surface-variant text-sm tracking-widest uppercase">
            ROUND {roundNumber} OF {totalRounds}
          </div>
          <div className="font-timer-mono text-timer-mono text-tertiary text-sm tracking-widest uppercase">
            [Category: {cat.label}]
          </div>
        </div>
        
        {/* The EKG Line / Progress Bar */}
        <div className="w-full max-w-4xl h-[2px] bg-surface-container-highest relative overflow-hidden">
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="absolute top-0 right-0 h-full bg-primary-container shadow-[0_0_10px_rgba(255,84,74,0.8)]"
          />
        </div>
      </header>

      {/* Main Scenario Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop z-10 relative">
        <div className="max-w-3xl text-center space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-scenario-text text-scenario-text md:text-5xl md:leading-tight text-white drop-shadow-lg"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
          >
            "{scenario}"
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="font-body-base text-body-base text-on-surface-variant italic mt-8 opacity-70"
          >
            A twist is coming...
          </motion.p>
        </div>
      </main>

      {/* Bottom Countdown */}
      <footer className="w-full pb-8 md:pb-margin-desktop px-gutter flex justify-center items-end relative z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            Answering starts in
          </span>
          <div className="font-timer-mono text-timer-mono text-primary text-5xl md:text-7xl drop-shadow-[0_0_15px_rgba(255,180,171,0.5)] flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
            <div className="flex items-baseline w-[120px] md:w-[160px]">
              <span>{seconds}</span>
              <span className="text-3xl md:text-4xl text-primary-fixed-dim">.{milliseconds}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-container-high via-void to-void z-0"></div>
    </div>
  );
}
