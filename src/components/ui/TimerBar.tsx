'use client';

import { useEffect, useState } from 'react';
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
    ? 'var(--red-flatline)'
    : isUrgent
      ? 'var(--orange-barbad)'
      : remaining <= totalSeconds * 0.5
        ? '#eab308'
        : 'var(--green-bach)';

  return (
    <div style={{ width: '100%' }}>
      {/* Timer Number */}
      <div
        className="font-mono"
        style={{
          fontSize: '2rem',
          fontWeight: 600,
          textAlign: 'center',
          color: isCritical ? 'var(--red-flatline)' : 'var(--text-primary)',
          animation: isCritical ? 'timer-flash 0.5s infinite' : 'none',
          marginBottom: '8px',
        }}
      >
        {remaining}s
      </div>

      {/* Bar */}
      <div
        style={{
          width: '100%',
          height: '4px',
          background: 'var(--bg-surface)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: barColor,
            borderRadius: '2px',
            transition: 'width 1s linear, background 0.3s ease',
            boxShadow: isCritical ? `0 0 8px ${barColor}` : 'none',
          }}
        />
      </div>
    </div>
  );
}
