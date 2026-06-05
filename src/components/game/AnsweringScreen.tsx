'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlotTwistBanner } from '@/components/game/PlotTwistBanner';

interface AnsweringScreenProps {
  scenario: string;
  plotTwist: string;
  answerDeadline: number | null;
  plotTwistDeadline: number | null;
  myAnswer: string;
  onAnswerChange: (text: string) => void;
  onSubmit: () => void;
  hasSubmitted: boolean;
  submittedCount: number;
  totalPlayers: number;
  onLifeline: () => void;
  lifelineUsed: boolean;
  lifelineAdvice: string | null;
  onTimeUp: () => void;
  roundNumber: number;
  totalRounds: number;
}

export function AnsweringScreen({
  scenario,
  plotTwist,
  answerDeadline,
  plotTwistDeadline,
  myAnswer,
  onAnswerChange,
  onSubmit,
  hasSubmitted,
  submittedCount,
  totalPlayers,
  onLifeline,
  lifelineUsed,
  lifelineAdvice,
  onTimeUp,
  roundNumber,
  totalRounds,
}: AnsweringScreenProps) {
  const [showPlotTwist, setShowPlotTwist] = useState(false);
  const [showLifelineModal, setShowLifelineModal] = useState(false);
  const [lifelineLoading, setLifelineLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Time remaining calculator
  useEffect(() => {
    if (!answerDeadline) return;

    const timer = setInterval(() => {
      const remaining = Math.max(0, answerDeadline - Date.now());
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(timer);
        onTimeUp();
      }
    }, 30);

    return () => clearInterval(timer);
  }, [answerDeadline, onTimeUp]);

  // Check for plot twist timing
  useEffect(() => {
    if (!plotTwistDeadline) return;

    const check = () => {
      if (Date.now() >= plotTwistDeadline) {
        setShowPlotTwist(true);
      }
    };

    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [plotTwistDeadline]);

  const handleLifeline = useCallback(async () => {
    if (lifelineUsed) return;
    setLifelineLoading(true);
    await onLifeline();
    setLifelineLoading(false);
    setShowLifelineModal(true);
  }, [lifelineUsed, onLifeline]);

  const seconds = Math.floor(timeLeft / 1000);
  const milliseconds = Math.floor((timeLeft % 1000) / 10).toString().padStart(2, '0');
  const maxTime = 75000; // 75s
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));

  return (
    <div className="bg-void text-on-surface min-h-screen flex flex-col font-body-base text-body-base overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(32,15,13,0.8)_0%,_rgba(8,8,8,1)_100%)]">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(94, 63, 59, 0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(94, 63, 59, 0.1) 20px)' }}></div>
      </div>

      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-2 border-b border-outline-variant bg-void">
        <div className="font-display text-display-xl text-primary tracking-tighter uppercase" style={{ fontSize: '48px', lineHeight: 1 }}>FLATLINE</div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary-container transition-colors cursor-pointer" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary-container transition-colors cursor-pointer" style={{ fontVariationSettings: "'FILL' 0" }}>emergency</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col justify-center px-gutter md:px-margin-desktop pt-24 pb-24 z-10 w-full max-w-4xl mx-auto h-full min-h-screen">
        
        {/* Timer UI */}
        <div className="mb-4 w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
              Round {roundNumber}/{totalRounds} • Time Remaining
            </span>
            <div className={`font-timer-mono text-timer-mono text-primary ${timeLeft < 15000 ? 'animate-pulse' : ''} drop-shadow-[0_0_10px_rgba(255,84,74,0.8)]`}>
              {seconds}.{milliseconds}s
            </div>
          </div>
          <div className="w-full h-[6px] bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
            <div 
              className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(255,84,74,0.3)] transition-all ease-linear"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Condensed Scenario */}
        <div className="mb-4 p-6 bg-surface-container border border-outline-variant rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <svg height="50" preserveAspectRatio="none" viewBox="0 0 1000 50" width="100%">
              <path className="animate-pulse" d="M0,25 L300,25 L320,5 L340,45 L360,10 L380,35 L400,25 L1000,25" fill="none" stroke="#ffb4ab" strokeWidth="2"></path>
            </svg>
          </div>
          <h2 className="font-label-sm text-label-sm text-primary mb-2 uppercase tracking-widest relative z-10">Scenario {roundNumber.toString().padStart(2, '0')}</h2>
          <p className="font-scenario-text text-scenario-text text-on-surface relative z-10">{scenario}</p>
        </div>

        {/* Plot Twist */}
        <AnimatePresence>
          {showPlotTwist && (
            <div className="mb-4">
              <PlotTwistBanner plotTwist={plotTwist} />
            </div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="flex-grow flex flex-col mb-4">
          <label className="sr-only" htmlFor="survival-plan">Type your survival plan</label>
          <textarea 
            id="survival-plan" 
            className="w-full flex-grow min-h-[150px] md:min-h-[200px] bg-surface-container-lowest border-0 border-b-2 border-primary focus:ring-0 focus:border-primary-container text-on-surface font-timer-mono text-[20px] leading-relaxed p-6 resize-none outline-none transition-colors placeholder-on-surface-variant disabled:opacity-50"
            placeholder={hasSubmitted ? "LOCKED IN." : "> TYPE YOUR SURVIVAL PLAN..."} 
            spellCheck="false"
            value={myAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={hasSubmitted}
            maxLength={300}
          ></textarea>
          <div className="flex justify-between items-center mt-2 px-2">
            <span className="font-label-sm text-[10px] text-tertiary">
              {submittedCount}/{totalPlayers} SUBMITTED
            </span>
            <span className={`font-timer-mono text-[12px] ${myAnswer.length > 250 ? 'text-barbad' : 'text-on-surface-variant'}`}>
              {myAnswer.length}/300
            </span>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto mb-10">
          {/* Secondary Action */}
          <button 
            onClick={handleLifeline}
            disabled={lifelineUsed || hasSubmitted || lifelineLoading}
            className="w-full sm:w-auto px-6 py-3 bg-surface-container-high text-on-surface-variant border border-outline-variant rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>phone</span>
            {lifelineLoading ? 'Calling...' : (lifelineUsed ? 'Mummy Called' : 'Call Mummy')}
          </button>
          
          {/* Primary Submit */}
          <button 
            onClick={onSubmit}
            disabled={hasSubmitted || !myAnswer.trim()}
            className="w-full sm:w-auto px-12 py-4 bg-primary text-on-primary font-display text-[48px] leading-none uppercase rounded shadow-[0_0_15px_rgba(255,84,74,0.3)] hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {hasSubmitted ? 'LOCKED' : 'SUBMIT'}
            <span className="material-symbols-outlined text-[40px] font-bold" style={{ fontVariationSettings: "'FILL' 0" }}>
              {hasSubmitted ? 'lock' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </main>

      {/* Lifeline Advice Modal */}
      <AnimatePresence>
        {showLifelineModal && lifelineAdvice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
            onClick={() => setShowLifelineModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface border border-outline-variant rounded-xl p-8 max-w-sm w-full relative overflow-hidden shadow-2xl shadow-tertiary/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-tertiary opacity-50"></div>
              <div className="text-center mb-4">
                <span className="text-5xl drop-shadow-[0_0_15px_rgba(107,211,253,0.5)]">📞</span>
              </div>
              <div className="font-label-sm text-tertiary text-center mb-4 tracking-widest uppercase">
                MUMMY SAYS:
              </div>
              <p className="font-body-base text-[18px] text-on-surface leading-relaxed text-center italic mb-8">
                &ldquo;{lifelineAdvice}&rdquo;
              </p>
              <button
                className="w-full px-6 py-3 bg-surface-container-high text-on-surface-variant border border-outline-variant rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors"
                onClick={() => setShowLifelineModal(false)}
              >
                GOT IT, MUMMY
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
