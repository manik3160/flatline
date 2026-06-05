'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerBar } from '@/components/ui/TimerBar';
import { PlotTwistBanner } from '@/components/game/PlotTwistBanner';
import { Phone } from 'lucide-react';

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

  const handleExpire = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '12px', minHeight: '100dvh', paddingBottom: '20px' }}>
      {/* Round Badge */}
      <div
        className="font-mono"
        style={{
          fontSize: '0.65rem',
          color: 'var(--red-flatline)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textAlign: 'center',
        }}
      >
        Round {roundNumber}/{totalRounds}
      </div>

      {/* Timer */}
      <TimerBar
        deadline={answerDeadline}
        totalSeconds={75}
        onExpire={handleExpire}
      />

      {/* Scenario */}
      <div
        className="card"
        style={{ padding: '14px', borderColor: 'var(--border)' }}
      >
        <p
          className="font-serif"
          style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}
        >
          {scenario}
        </p>
      </div>

      {/* Plot Twist */}
      <AnimatePresence>
        {showPlotTwist && (
          <PlotTwistBanner plotTwist={plotTwist} />
        )}
      </AnimatePresence>

      {/* Answer Area */}
      <div style={{ flex: 1 }}>
        <textarea
          className="input"
          placeholder="Type your survival plan..."
          value={myAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          maxLength={300}
          disabled={hasSubmitted}
          style={{
            minHeight: '140px',
            opacity: hasSubmitted ? 0.5 : 1,
          }}
          id="answer-textarea"
        />
        <div
          className="font-mono"
          style={{
            fontSize: '0.65rem',
            color: myAnswer.length > 250 ? 'var(--orange-barbad)' : 'var(--text-muted)',
            textAlign: 'right',
            marginTop: '4px',
          }}
        >
          {myAnswer.length}/300
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={hasSubmitted || !myAnswer.trim()}
        id="submit-answer-button"
        style={{
          width: '100%',
          padding: '14px',
          fontSize: '1rem',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.1em',
        }}
      >
        {hasSubmitted ? '✓ LOCKED IN' : 'SUBMIT'}
      </button>

      {/* Bottom Row: Lifeline + Submission Counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          className="btn btn-ghost"
          onClick={handleLifeline}
          disabled={lifelineUsed || hasSubmitted || lifelineLoading}
          style={{
            fontSize: '0.8rem',
            padding: '8px 12px',
            opacity: lifelineUsed ? 0.3 : 1,
          }}
        >
          <Phone size={14} />
          {lifelineUsed ? 'Used' : 'Call Mummy'}
        </button>

        {submittedCount >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono"
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}
          >
            {submittedCount}/{totalPlayers} answered
          </motion.div>
        )}
      </div>

      {/* Lifeline Advice Modal */}
      <AnimatePresence>
        {showLifelineModal && lifelineAdvice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '20px',
            }}
            onClick={() => setShowLifelineModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="card-elevated"
              style={{
                padding: '24px',
                maxWidth: '380px',
                width: '100%',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '2.5rem' }}>📞</span>
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: '1.2rem',
                  color: 'var(--gold-jugaad)',
                  textAlign: 'center',
                  marginBottom: '12px',
                }}
              >
                MUMMY SAYS:
              </div>
              <p
                className="font-serif"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{lifelineAdvice}&rdquo;
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => setShowLifelineModal(false)}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  fontSize: '0.85rem',
                }}
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
