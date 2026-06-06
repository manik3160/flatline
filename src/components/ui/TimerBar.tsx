'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSecondsRemaining } from '@/lib/utils';

interface TimerBarProps {
  deadline: number | null;
  totalSeconds: number;
  onExpire: () => void;
}

export function TimerBar({ deadline, totalSeconds, onExpire }: TimerBarProps) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (!deadline) return;

    const update = () => {
      const secs = getSecondsRemaining(deadline);
      setRemaining(Math.max(0, secs));
      if (secs <= 0) {
        onExpire();
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [deadline, onExpire]);

  const pct = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0;
  const isUrgent = remaining <= 15;
  const isCritical = remaining <= 10;

  const barColor = isCritical
    ? 'var(--color-inverse-primary)'
    : isUrgent
      ? 'var(--color-barbad)'
      : remaining <= totalSeconds * 0.5
        ? '#eab308'
        : 'var(--color-bach-gaya)';

  return (
    <div className="w-full">
      {/* Timer Number */}
      <motion.div
        className={`font-timer-mono text-[2rem] font-semibold text-center mb-2 ${
          isCritical ? 'text-primary-container' : 'text-on-surface'
        }`}
        animate={isCritical ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
        transition={isCritical ? { duration: 0.5, repeat: Infinity } : {}}
        style={{
          textShadow: isCritical ? '0 0 15px rgba(255,84,74,0.6)' : 'none',
        }}
      >
        {remaining}s
      </motion.div>

      {/* Bar */}
      <div className="w-full h-[6px] bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/30">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: barColor,
            boxShadow: isCritical ? `0 0 12px ${barColor}` : `0 0 4px ${barColor}40`,
          }}
          transition={{ width: { duration: 1, ease: 'linear' } }}
        />
      </div>
    </div>
  );
}
