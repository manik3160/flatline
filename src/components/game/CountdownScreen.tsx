'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COUNTS = ['3', '2', '1', 'SURVIVE'];

export function CountdownScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < COUNTS.length - 1) {
      const timer = setTimeout(() => setIndex((i) => i + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        position: 'relative',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="font-display"
          style={{
            fontSize: index < 3 ? 'clamp(6rem, 25vw, 12rem)' : 'clamp(3rem, 12vw, 6rem)',
            color: index < 3 ? 'var(--red-flatline)' : 'var(--gold-jugaad)',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          {COUNTS[index]}
        </motion.div>
      </AnimatePresence>

      {/* Flash effect */}
      <motion.div
        key={`flash-${index}`}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: index < 3
            ? 'radial-gradient(circle, rgba(255,45,45,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
