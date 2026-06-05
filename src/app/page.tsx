'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EkgLine } from '@/components/ui/EkgLine';
import { CharacterCard } from '@/components/ui/CharacterCard';
import { CHARACTER_LIST } from '@/lib/game/characters';
import { getSessionId } from '@/lib/utils';
import type { CharacterType, ScenarioCategory } from '@/types';
import { useGameStore } from '@/store/gameStore';

type TabMode = 'create' | 'join';

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

export default function HomePage() {
  const router = useRouter();
  const setIdentity = useGameStore((s) => s.setIdentity);
  const setRoom = useGameStore((s) => s.setRoom);

  const [mode, setMode] = useState<TabMode>('create');
  const [name, setName] = useState('');
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [category, setCategory] = useState<ScenarioCategory>('mixed');
  const [totalRounds, setTotalRounds] = useState(5);
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Enter your name, yaar!');
      return;
    }
    if (!character) {
      setError('Pick a character!');
      return;
    }
    if (mode === 'join' && !roomCode.trim()) {
      setError('Enter the room code!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'create' ? '/api/room/create' : '/api/room/join';
      const payload =
        mode === 'create'
          ? { playerName: name.trim(), character, category, totalRounds, sessionId }
          : { playerName: name.trim(), character, roomCode: roomCode.trim().toUpperCase(), sessionId };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      // Set game store
      setIdentity({
        sessionId,
        playerId: data.player.id,
        playerName: name.trim(),
        character,
        isHost: data.player.is_host,
      });
      setRoom({
        roomCode: data.code,
        roomId: data.room.id,
        category: data.room.category,
        totalRounds: data.room.total_rounds,
      });

      router.push(`/room/${data.code}`);
    } catch {
      setError('Network error. Check your connection.');
      setLoading(false);
    }
  };

  return (
    <div className="game-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Background EKG */}
      <div style={{ position: 'fixed', top: '45%', left: 0, right: 0, opacity: 0.06, zIndex: 0, pointerEvents: 'none' }}>
        <EkgLine height={100} animationDuration={5} />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '8px', position: 'relative', zIndex: 1 }}
      >
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 6rem)',
            color: 'var(--red-flatline)',
            lineHeight: 1,
          }}
        >
          FLATLINE
        </h1>
        <p
          className="font-serif"
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
            marginTop: '4px',
          }}
        >
          Survive the chaos. Or don&apos;t.
        </p>
      </motion.div>

      {/* Small EKG separator */}
      <div style={{ margin: '16px auto', width: '150px', position: 'relative', zIndex: 1 }}>
        <EkgLine height={24} animationDuration={2} />
      </div>

      {/* Tab Selector */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          margin: '0 auto 20px',
          position: 'relative',
          zIndex: 1,
          background: 'var(--bg-surface)',
          borderRadius: '6px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          width: 'fit-content',
        }}
      >
        {(['create', 'join'] as TabMode[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setMode(tab); setError(''); }}
            className="font-display"
            style={{
              padding: '10px 28px',
              fontSize: '1.1rem',
              background: mode === tab ? 'var(--red-flatline)' : 'transparent',
              color: mode === tab ? 'white' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.06em',
            }}
          >
            {tab === 'create' ? 'CREATE' : 'JOIN'}
          </button>
        ))}
      </div>

      {/* Form */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, x: mode === 'create' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {/* Name Input */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Your Name
          </label>
          <input
            className="input"
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            id="player-name-input"
          />
        </div>

        {/* Room Code (join only) */}
        {mode === 'join' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Room Code
            </label>
            <input
              className="input font-mono"
              type="text"
              placeholder="AB3K9"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={5}
              style={{ fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.3em' }}
              id="room-code-input"
            />
          </motion.div>
        )}

        {/* Character Select */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Choose Your Character
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {CHARACTER_LIST.map((c) => (
              <CharacterCard
                key={c.type}
                character={c}
                selected={character === c.type}
                onSelect={() => setCharacter(c.type)}
              />
            ))}
          </div>
        </div>

        {/* Host Settings (create only) */}
        {mode === 'create' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {/* Category */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Scenario Category
              </label>
              <select
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value as ScenarioCategory)}
                id="category-select"
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
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Number of Rounds
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[3, 5, 7].map((n) => (
                  <button
                    key={n}
                    onClick={() => setTotalRounds(n)}
                    className="btn"
                    style={{
                      flex: 1,
                      background: totalRounds === n ? 'var(--red-flatline)' : 'var(--bg-surface)',
                      color: totalRounds === n ? 'white' : 'var(--text-secondary)',
                      border: `1px solid ${totalRounds === n ? 'var(--red-flatline)' : 'var(--border)'}`,
                      fontSize: '1.2rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                padding: '10px 14px',
                background: 'var(--red-soft)',
                border: '1px solid var(--red-flatline)',
                borderRadius: '6px',
                color: 'var(--red-flatline)',
                fontSize: '0.85rem',
                textAlign: 'center',
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          id="submit-button"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.1em',
            marginTop: '4px',
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="animate-shimmer" style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} />
              {mode === 'create' ? 'CREATING...' : 'JOINING...'}
            </span>
          ) : mode === 'create' ? (
            'CREATE ROOM'
          ) : (
            'JOIN ROOM'
          )}
        </button>
      </motion.div>

      {/* Footer */}
      <div
        className="font-mono"
        style={{
          marginTop: 'auto',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        built for hostel rooms & discord calls
      </div>
    </div>
  );
}
