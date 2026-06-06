import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Flatline — AI Survival Party Game';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #080808, #2e1b18)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#fedbd6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="300" height="150" viewBox="0 0 512 256" style={{ marginBottom: '20px' }}>
            <path d="M 0 128 L 160 128 L 200 40 L 260 216 L 310 128 L 512 128" fill="none" stroke="#ffb4ab" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <h1
          style={{
            fontSize: '140px',
            fontWeight: '900',
            margin: '0',
            lineHeight: 1,
            color: '#ffb4ab',
            letterSpacing: '0.05em',
          }}
        >
          FLATLINE
        </h1>
        <p
          style={{
            fontSize: '48px',
            color: '#fedbd6',
            opacity: 0.8,
            marginTop: '20px',
          }}
        >
          Survive the chaos. Or don't.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
