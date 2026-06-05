import type { CharacterType } from '@/types';

interface PlayerChipProps {
  name: string;
  character: CharacterType;
  isHost: boolean;
  isActive?: boolean;
  score?: number;
  showScore?: boolean;
}

const CHARACTER_EMOJIS: Record<CharacterType, string> = {
  topper: '🎓',
  jugaadu: '🔧',
  sharma_ji: '📚',
  it_uncle: '💻',
};

export function PlayerChip({
  name,
  character,
  isHost,
  isActive = true,
  score,
  showScore = false,
}: PlayerChipProps) {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        opacity: isActive ? 1 : 0.4,
      }}
    >
      {/* Character Emoji */}
      <span style={{ fontSize: '1.4rem' }}>{CHARACTER_EMOJIS[character]}</span>

      {/* Name + badges */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </span>
          {isHost && (
            <span
              className="font-mono"
              style={{
                fontSize: '0.6rem',
                padding: '2px 6px',
                background: 'var(--red-soft)',
                color: 'var(--red-flatline)',
                borderRadius: '4px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              HOST
            </span>
          )}
        </div>
      </div>

      {/* Score */}
      {showScore && score !== undefined && (
        <div
          className="font-mono"
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--gold-jugaad)',
          }}
        >
          {score}
        </div>
      )}
    </div>
  );
}
