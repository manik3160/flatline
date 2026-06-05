'use client';

import { motion } from 'framer-motion';
import { RoomCodeDisplay } from '@/components/ui/RoomCodeDisplay';
import { PlayerChip } from '@/components/ui/PlayerChip';
import { EkgLine } from '@/components/ui/EkgLine';
import { useGameStore } from '@/store/gameStore';
import type { ScenarioCategory } from '@/types';

const CATEGORIES: { value: ScenarioCategory; label: string; emoji: string }[] = [
  { value: 'mixed', label: 'Random Mix', emoji: '🎲' },
  { value: 'family_pressure', label: 'Family Pressure', emoji: '👨‍👩‍👧' },
  { value: 'college_life', label: 'College Life', emoji: '🎓' },
  { value: 'indian_streets', label: 'Indian Streets', emoji: '🛺' },
  { value: 'monsoon_madness', label: 'Monsoon Madness', emoji: '🌧️' },
  { value: 'festival_chaos', label: 'Festival Chaos', emoji: '🎆' },
  { value: 'startup_it_life', label: 'Startup/IT Life', emoji: '💻' },
  { value: 'shaadi_season', label: 'Shaadi Season', emoji: '💍' },
];

interface LobbyScreenProps {
  onStartGame: () => void;
  onUpdateSettings: (category: ScenarioCategory, rounds: number) => void;
}

export function LobbyScreen({ onStartGame, onUpdateSettings }: LobbyScreenProps) {
  const { roomCode, players, isHost, category, totalRounds } = useGameStore();

  const activePlayers = players.filter((p) => p.is_active);
  const canStart = activePlayers.length >= 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '20px' }}>
      {/* Room Code */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RoomCodeDisplay code={roomCode || ''} />
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            marginTop: '8px',
          }}
        >
          Share this code with friends
        </p>
      </motion.div>

      {/* EKG Separator */}
      <div style={{ width: '120px', margin: '0 auto' }}>
        <EkgLine height={20} animationDuration={2} />
      </div>

      {/* Players List */}
      <div>
        <div
          className="font-mono"
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginBottom: '10px',
            letterSpacing: '0.1em',
          }}
        >
          Players ({activePlayers.length}/8)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activePlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <PlayerChip
                name={player.name}
                character={player.character}
                isHost={player.is_host}
                isActive={player.is_active}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Host Controls */}
      {isHost ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          {/* Category Select */}
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Category
            </label>
            <select
              className="input"
              value={category}
              onChange={(e) =>
                onUpdateSettings(e.target.value as ScenarioCategory, totalRounds)
              }
              style={{ cursor: 'pointer' }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rounds */}
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Rounds
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[3, 5, 7].map((n) => (
                <button
                  key={n}
                  onClick={() => onUpdateSettings(category, n)}
                  className="btn"
                  style={{
                    flex: 1,
                    background:
                      totalRounds === n
                        ? 'var(--red-flatline)'
                        : 'var(--bg-surface)',
                    color:
                      totalRounds === n ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${totalRounds === n ? 'var(--red-flatline)' : 'var(--border)'}`,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            className="btn btn-primary"
            onClick={onStartGame}
            disabled={!canStart}
            id="start-game-button"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1.2rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.12em',
              marginTop: '8px',
            }}
          >
            {canStart ? 'START GAME' : `NEED ${2 - activePlayers.length} MORE PLAYER${activePlayers.length === 0 ? 'S' : ''}`}
          </button>
        </motion.div>
      ) : (
        /* Guest waiting */
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <EkgLine height={30} animationDuration={2.5} />
          <p
            className="font-mono"
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginTop: '12px',
            }}
          >
            Waiting for host to start...
          </p>
        </div>
      )}
    </div>
  );
}
