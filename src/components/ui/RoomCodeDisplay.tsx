'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface RoomCodeDisplayProps {
  code: string;
}

export function RoomCodeDisplay({ code }: RoomCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Room Code */}
      <div
        className="font-mono"
        style={{
          fontSize: 'clamp(2.5rem, 10vw, 4rem)',
          fontWeight: 600,
          letterSpacing: '0.3em',
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}
      >
        {code}
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="btn btn-ghost"
        style={{
          fontSize: '0.8rem',
          padding: '8px 16px',
          gap: '6px',
        }}
      >
        {copied ? (
          <>
            <Check size={14} style={{ color: 'var(--green-bach)' }} />
            <span style={{ color: 'var(--green-bach)' }}>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Copy Room Code</span>
          </>
        )}
      </button>
    </div>
  );
}
