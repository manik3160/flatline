'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterCard } from '@/components/ui/CharacterCard';
import { CHARACTER_LIST } from '@/lib/game/characters';
import { getSessionId } from '@/lib/utils';
import type { CharacterType } from '@/types';
import { useGameStore } from '@/store/gameStore';

export default function HomePage() {
  const router = useRouter();
  const setIdentity = useGameStore((s) => s.setIdentity);
  const setRoom = useGameStore((s) => s.setRoom);

  const [name, setName] = useState('');
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const handleCreateRoom = async () => {
    if (!name.trim()) {
      setError('Enter your name to create a room!');
      return;
    }
    if (!character) {
      setError('Pick a patient profile first!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = { 
        playerName: name.trim(), 
        character, 
        category: 'mixed', 
        totalRounds: 5, 
        sessionId 
      };

      const res = await fetch('/api/room/create', {
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

  const handleJoinRoom = async () => {
    if (!name.trim()) {
      setError('Enter your name to join!');
      return;
    }
    if (!character) {
      setError('Pick a patient profile first!');
      return;
    }
    if (!roomCode.trim()) {
      setError('Enter the room code!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = { 
        playerName: name.trim(), 
        character, 
        roomCode: roomCode.trim().toUpperCase(), 
        sessionId 
      };

      const res = await fetch('/api/room/join', {
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
    <div className="flex flex-col items-center justify-start pt-8 md:pt-16 px-gutter md:px-margin-desktop pb-32 min-h-screen relative overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-void opacity-80 z-10 mix-blend-multiply"></div>
        {/* We can use a generic hospital background if we have one, otherwise fallback to the provided URL */}
        <img alt="Hospital Corridor Background" className="w-full h-full object-cover object-center opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSmUCotgR_bneeSLpFyEeOrs0ozK_lBF7kEZFrOF9gQ6arkhDtfDa_lDsLv5svntybnMLCapgcN9VPacEQtdaYW4yhJpqozcrZ4rjbCy4l11nZS1mag4mLVzaBCMv0KcTeIvheA7RHPkhG6bFnuctJ2UYcdXRU6hmquAE3lnFsbM0L4Kdj1HVm7Yg_X4A2nYOqh8Fz6PSFL9Rkm52VMBHeI1OlT_lgF_8eZHRm59wrHxMfPWLTU12r4-cxa4u8Tilm1V6zFOH1xaQ"/>
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start w-full">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8 text-center max-w-3xl mx-auto w-full"
        >
          <div className="font-display text-display-xl text-primary tracking-tighter uppercase drop-shadow-2xl" style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', lineHeight: 1 }}>FLATLINE</div>
          <h2 className="font-scenario-text text-scenario-text text-primary italic opacity-90 mt-2">Survive the chaos. Or don&apos;t.</h2>
        </motion.header>

        {/* EKG Separator */}
        <div className="w-full max-w-3xl my-8 opacity-60">
          <div className="ekg-line"></div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-error-container text-on-error-container border border-error px-6 py-3 rounded-lg mb-6 text-center w-full max-w-md font-body-base font-semibold shadow-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name Input */}
        <div className="w-full max-w-md mb-8">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block text-center mb-3">Your Name</label>
          <div className="relative">
             <input
               className="bg-surface-container-lowest border-b-2 border-border-default text-center font-display text-[2rem] text-primary focus:outline-none focus:border-primary placeholder-on-surface-variant bg-transparent w-full py-2 tracking-widest transition-colors"
               placeholder="ENTER NAME"
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value.toUpperCase())}
               maxLength={15}
             />
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mb-12">
          {/* Create Room Card */}
          <button 
            onClick={handleCreateRoom}
            disabled={loading}
            className="group relative bg-surface border border-border-default rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-glow-active hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary-container opacity-0 group-hover:opacity-5 transition-opacity"></div>
            {loading && !roomCode ? (
              <span className="material-symbols-outlined text-primary mb-4 animate-spin" style={{ fontSize: '64px' }}>refresh</span>
            ) : (
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '64px' }}>add_circle</span>
            )}
            <h3 className="font-display text-[3rem] leading-none text-on-surface tracking-wide uppercase mt-2">Create Room</h3>
            <p className="font-timer-mono text-label-sm text-on-surface-variant mt-3">HOST A NEW WARD</p>
          </button>

          {/* Join Room Card */}
          <div className="group relative bg-surface border border-border-default rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 focus-within:border-glow-active focus-within:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-primary-container opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <button 
              onClick={handleJoinRoom}
              disabled={loading}
              className="flex flex-col items-center w-full"
            >
              {loading && roomCode ? (
                <span className="material-symbols-outlined text-primary mb-4 animate-spin" style={{ fontSize: '64px' }}>refresh</span>
              ) : (
                <span className="material-symbols-outlined text-primary mb-4 hover:scale-110 transition-transform" style={{ fontSize: '64px' }}>login</span>
              )}
              <h3 className="font-display text-[3rem] leading-none text-on-surface tracking-wide uppercase mt-2">Join Room</h3>
            </button>
            <div className="w-full mt-5 flex justify-center relative z-20">
              <input 
                className="bg-void border-b border-border-default text-center font-timer-mono text-timer-mono text-primary focus:outline-none focus:border-primary placeholder-on-surface-variant bg-transparent w-full max-w-[200px] uppercase py-2" 
                placeholder="ENTER CODE" 
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={5}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
              />
            </div>
          </div>
        </div>

        {/* Character Selection Bottom Row */}
        <div className="w-full max-w-5xl mt-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Select Patient Profile</h3>
            <div className="h-px bg-border-default flex-grow ml-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {CHARACTER_LIST.map((c) => (
              <CharacterCard
                key={c.type}
                character={c}
                selected={character === c.type}
                onSelect={() => setCharacter(c.type)}
                disabled={loading}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
