'use client';

import { motion } from 'framer-motion';

interface EkgLineProps {
  width?: number | string;
  height?: number;
  color?: string;
  animationDuration?: number;
  loop?: boolean;
  className?: string;
}

/**
 * Animated SVG EKG line that draws across the screen
 * The line: draws → normal EKG spike pattern → flatlines → repeats
 */
export function EkgLine({
  width = '100%',
  height = 60,
  color = 'var(--red-flatline)',
  animationDuration = 3,
  loop = true,
  className = '',
}: EkgLineProps) {
  // EKG-style path: flat → spike up → spike down → flat (typical heartbeat pattern)
  const ekgPath =
    'M 0,30 L 60,30 L 70,30 L 80,10 L 90,50 L 100,5 L 110,55 L 120,25 L 130,30 L 200,30 L 210,30 L 220,12 L 230,48 L 240,8 L 250,52 L 260,28 L 270,30 L 340,30 L 350,30 L 360,14 L 370,46 L 380,6 L 390,54 L 400,26 L 410,30 L 500,30';

  const pathLength = 1200;

  return (
    <div className={className} style={{ width, height, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 500 60"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Background glow line */}
        <motion.path
          d={ekgPath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.15}
          filter="blur(4px)"
          strokeDasharray={pathLength}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: animationDuration,
            ease: 'linear',
            repeat: loop ? Infinity : 0,
            repeatDelay: 0.5,
          }}
        />
        {/* Main line */}
        <motion.path
          d={ekgPath}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: animationDuration,
            ease: 'linear',
            repeat: loop ? Infinity : 0,
            repeatDelay: 0.5,
          }}
        />
        {/* Bright dot at the end of the drawn line */}
        <motion.circle
          cx="0"
          cy="30"
          r="3"
          fill={color}
          filter={`drop-shadow(0 0 6px ${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: animationDuration,
            ease: 'linear',
            repeat: loop ? Infinity : 0,
            repeatDelay: 0.5,
            times: [0, 0.05, 0.9, 1],
          }}
        >
          <animateMotion
            dur={`${animationDuration}s`}
            repeatCount={loop ? 'indefinite' : '1'}
            path={ekgPath}
          />
        </motion.circle>
      </svg>
    </div>
  );
}
