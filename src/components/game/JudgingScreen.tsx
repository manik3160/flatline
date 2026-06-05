'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EkgLine } from '@/components/ui/EkgLine';

const LOADING_MESSAGES = [
  'Consulting Sharma Ji Ka Beta...',
  'Checking if your jugaad actually works...',
  'Your mom was informed...',
  'Calculating survival probability...',
  'AI peeking at your kundali...',
  'Analyzing your desperation levels...',
  'Checking WhatsApp forwards for advice...',
  'Consulting the universe...',
];

export function JudgingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: '32px',
      }}
    >
      {/* EKG Animation */}
      <div style={{ width: '100%', maxWidth: '350px' }}>
        <EkgLine height={80} animationDuration={2.5} loop />
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-display"
        style={{
          fontSize: '1.8rem',
          color: 'var(--red-flatline)',
          textAlign: 'center',
        }}
      >
        AI IS DECIDING YOUR FATE...
      </motion.h2>

      {/* Rotating Messages */}
      <div style={{ height: '24px', position: 'relative' }}>
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="font-mono"
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            textAlign: 'center',
          }}
        >
          {LOADING_MESSAGES[messageIndex]}
        </motion.p>
      </div>
    </div>
  );
}
