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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: '24px',
        padding: '20px 0',
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="font-display"
        style={{
          fontSize: '1.4rem',
          color: 'var(--gold-jugaad)',
          textAlign: 'center',
        }}
      >
        SHARMA JI KA BETA WOULD HAVE...
      </motion.div>

      {/* Character Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="card"
        style={{
          padding: '24px',
          maxWidth: '380px',
          width: '100%',
          border: '1px solid var(--gold-jugaad)33',
          boxShadow: 'var(--glow-jugaad)',
        }}
      >
        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '3rem' }}>📚</span>
          <div
            className="font-display"
            style={{
              fontSize: '1.2rem',
              color: 'var(--gold-jugaad)',
              marginTop: '4px',
            }}
          >
            SHARMA JI KA BETA
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              marginTop: '2px',
            }}
          >
            THE PERFECT ANSWER™
          </div>
        </div>

        {/* Answer */}
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
          &ldquo;{answer}&rdquo;
        </p>
      </motion.div>

      {/* Next */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ width: '100%', maxWidth: '380px' }}
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
            SCOREBOARD →
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
    </div>
  );
}
