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
      className="p-6 bg-surface-container border border-antim-sanskar rounded-lg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-antim-sanskar/10 to-primary/10 pointer-events-none"></div>
      
      {/* Shimmer effect */}
      <div
        className="animate-shimmer absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
      />

      <div className="font-label-sm text-label-sm text-antim-sanskar mb-2 uppercase tracking-widest relative z-10 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]">sync</span>
        PLOT TWIST
      </div>
      
      <p className="font-scenario-text text-scenario-text text-on-surface relative z-10">
        {plotTwist}
      </p>
    </motion.div>
  );
}
