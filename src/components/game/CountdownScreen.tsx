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

  const isSurvive = index === COUNTS.length - 1;

  return (
    <div className="fixed inset-0 bg-void flex items-center justify-center z-50 overflow-hidden">
      {/* Background pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isSurvive
            ? 'radial-gradient(circle at center, rgba(255,215,0,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(255,84,74,0.08) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Concentric rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={`ring-${index}-${ring}`}
          className="absolute rounded-full border"
          style={{
            borderColor: isSurvive ? 'rgba(255,215,0,0.1)' : 'rgba(255,84,74,0.1)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ 
            width: 300 + ring * 100, 
            height: 300 + ring * 100, 
            opacity: 0 
          }}
          transition={{ 
            duration: 1, 
            delay: ring * 0.15,
            ease: 'easeOut',
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ scale: 2.5, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0.3, opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display relative z-10"
          style={{
            fontSize: !isSurvive ? 'clamp(8rem, 30vw, 14rem)' : 'clamp(3rem, 12vw, 6rem)',
            color: !isSurvive ? 'var(--color-primary-container)' : 'var(--color-jugaad)',
            textAlign: 'center',
            lineHeight: 1,
            textShadow: !isSurvive 
              ? '0 0 40px rgba(255,84,74,0.6), 0 0 80px rgba(255,84,74,0.3)' 
              : '0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.3)',
          }}
        >
          {COUNTS[index]}
        </motion.div>
      </AnimatePresence>

      {/* Screen flash effect */}
      <motion.div
        key={`flash-${index}`}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: !isSurvive
            ? 'radial-gradient(circle, rgba(255,45,45,0.2) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(255,215,0,0.25) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
