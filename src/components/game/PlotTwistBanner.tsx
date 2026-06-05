'use client';

import { motion } from 'framer-motion';

interface PlotTwistBannerProps {
  plotTwist: string;
}

export function PlotTwistBanner({ plotTwist }: PlotTwistBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(255, 45, 45, 0.15))',
        border: '1px solid var(--purple-antim)',
        borderRadius: '8px',
        padding: '14px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shimmer effect */}
      <div
        className="animate-shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
      />

      <div
        className="font-mono"
        style={{
          fontSize: '0.65rem',
          color: 'var(--purple-antim)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '6px',
        }}
      >
        🔄 PLOT TWIST
      </div>
      <p
        className="font-serif"
        style={{
          fontSize: '0.95rem',
          color: 'var(--text-primary)',
          lineHeight: 1.5,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {plotTwist}
      </p>
    </motion.div>
  );
}
