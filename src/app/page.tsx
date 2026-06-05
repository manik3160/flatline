'use client';

import { EkgLine } from '@/components/ui/EkgLine';

export default function HomePage() {
  return (
    <div className="game-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', gap: '24px' }}>
      {/* EKG Background Line */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', opacity: 0.15 }}>
        <EkgLine height={80} animationDuration={4} />
      </div>

      {/* Logo */}
      <h1
        className="font-display"
        style={{
          fontSize: 'clamp(4rem, 15vw, 7rem)',
          color: 'var(--red-flatline)',
          lineHeight: 1,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        FLATLINE
      </h1>

      {/* Tagline */}
      <p
        className="font-serif"
        style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Survive the chaos. Or don&apos;t.
      </p>

      {/* EKG Line under tagline */}
      <div style={{ position: 'relative', zIndex: 1, width: '200px' }}>
        <EkgLine height={30} animationDuration={2} />
      </div>

      {/* Foundation ready message */}
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-mono)',
          position: 'relative',
          zIndex: 1,
          marginTop: '40px',
        }}
      >
        [ foundation initialized ]
      </p>
    </div>
  );
}
