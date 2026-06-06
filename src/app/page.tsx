'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CharacterCard } from '@/components/ui/CharacterCard';
import { EkgLine } from '@/components/ui/EkgLine';
import { CHARACTER_LIST } from '@/lib/game/characters';
import { getSessionId } from '@/lib/utils';
import type { CharacterType } from '@/types';
import { useGameStore } from '@/store/gameStore';

// Stagger animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const characterVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HomePage() {
  const router = useRouter();
  const setIdentity = useGameStore((s) => s.setIdentity);
  const setRoom = useGameStore((s) => s.setRoom);

  const [name, setName] = useState('');
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const sessionId = getSessionId();
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
      const sessionId = getSessionId();
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
    <div className="flex flex-col items-center justify-start min-h-[100dvh] relative overflow-x-hidden w-full">
      {/* Ambient Effects */}
      <div className="scan-line" />
      <div className="vignette" />
      <div className="noise-overlay" />
      
      {/* Floating particles */}
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-void opacity-80 z-10 mix-blend-multiply"></div>
        <img alt="Hospital Corridor Background" className="w-full h-full object-cover object-center opacity-30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSmUCotgR_bneeSLpFyEeOrs0ozK_lBF7kEZFrOF9gQ6arkhDtfDa_lDsLv5svntybnMLCapgcN9VPacEQtdaYW4yhJpqozcrZ4rjbCy4l11nZS1mag4mLVzaBCMv0KcTeIvheA7RHPkhG6bFnuctJ2UYcdXRU6hmquAE3lnFsbM0L4Kdj1HVm7Yg_X4A2nYOqh8Fz6PSFL9Rkm52VMBHeI1OlT_lgF_8eZHRm59wrHxMfPWLTU12r4-cxa4u8Tilm1V6zFOH1xaQ"/>
      </div>

      {/* Main Content Canvas */}
      <motion.main 
        className="relative z-10 flex-grow flex flex-col items-center justify-start w-full pt-12 md:pt-20 px-4 md:px-12 pb-32 gap-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.header 
          variants={itemVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto w-full shrink-0"
        >
          <motion.div 
            className="font-display title-shimmer tracking-tighter uppercase drop-shadow-2xl select-none" 
            style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', lineHeight: 0.9 }}
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,84,74,0.3)',
                '0 0 40px rgba(255,84,74,0.5)',
                '0 0 20px rgba(255,84,74,0.3)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            FLATLINE
          </motion.div>
          <motion.h2 
            className="font-scenario-text text-scenario-text text-primary italic opacity-80 mt-3"
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 0.8, letterSpacing: '0.05em' }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          >
            Survive the chaos. Or don&apos;t.
          </motion.h2>
        </motion.header>

        {/* Animated EKG Line */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-3xl shrink-0"
        >
          <EkgLine 
            color="var(--color-primary)" 
            animationDuration={3} 
            height={40}
          />
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-error-container/80 backdrop-blur-md text-on-error-container border border-error/40 px-6 py-3 rounded-xl text-center w-full max-w-md font-body-base font-semibold shadow-lg shadow-error/10 shrink-0 mx-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name Input */}
        <motion.div variants={itemVariants} className="w-full max-w-md shrink-0">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block text-center mb-4 opacity-70">Your Name</label>
          <div className="relative input-underline">
             <input
               className="bg-transparent border-b-2 border-outline-variant text-center font-display text-[2rem] text-primary focus:outline-none placeholder-on-surface-variant/40 w-full py-3 tracking-widest transition-all duration-300 input-glow"
               placeholder="ENTER NAME"
               type="text"
               value={name}
               onChange={(e) => {
                 setName(e.target.value.toUpperCase());
                 if (error === 'Enter your name to create a room!' || error === 'Enter your name to join!') {
                   setError('');
                 }
               }}
               maxLength={15}
             />
          </div>
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl shrink-0"
        >
          {/* Create Room Card */}
          <motion.button 
            type="button"
            onClick={handleCreateRoom}
            disabled={loading}
            className="glass-card group relative p-8 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/0 via-transparent to-primary/0 group-hover:from-primary-container/10 group-hover:to-primary/5 transition-all duration-500" />
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-container/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {loading && !roomCode ? (
              <motion.span 
                className="material-symbols-outlined text-primary mb-4"
                style={{ fontSize: '56px' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >refresh</motion.span>
            ) : (
              <motion.span 
                className="material-symbols-outlined text-primary mb-4 relative z-10"
                style={{ fontSize: '56px', fontVariationSettings: "'FILL' 1" }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >add_circle</motion.span>
            )}
            <h3 className="font-display text-[2.5rem] md:text-[3rem] leading-none text-on-surface tracking-wide uppercase mt-2 relative z-10 glow-text-primary">Create Room</h3>
            <p className="font-timer-mono text-label-sm text-on-surface-variant mt-3 uppercase tracking-widest relative z-10 opacity-60">Host a new ward</p>
          </motion.button>

          {/* Join Room Card */}
          <motion.div 
            className="glass-card group relative p-8 flex flex-col items-center justify-center text-center overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Hover gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary/0 via-transparent to-tertiary/0 group-hover:from-tertiary/5 group-hover:to-tertiary/5 transition-all duration-500" />
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-tertiary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.button 
              type="button"
              onClick={handleJoinRoom}
              disabled={loading}
              className="flex flex-col items-center w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              {loading && roomCode ? (
                <motion.span 
                  className="material-symbols-outlined text-tertiary mb-4"
                  style={{ fontSize: '56px' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >refresh</motion.span>
              ) : (
                <motion.span 
                  className="material-symbols-outlined text-tertiary mb-4 relative z-10"
                  style={{ fontSize: '56px', fontVariationSettings: "'FILL' 1" }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >login</motion.span>
              )}
              <h3 className="font-display text-[2.5rem] md:text-[3rem] leading-none text-on-surface tracking-wide uppercase mt-2 relative z-10">Join Room</h3>
            </motion.button>
            <div className="w-full mt-5 flex flex-col items-center relative z-20">
              <span className="font-timer-mono text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-1">Enter Code</span>
              <input 
                className="bg-transparent border-b-2 border-outline-variant text-center font-timer-mono text-[1.5rem] text-tertiary focus:outline-none focus:border-tertiary placeholder-on-surface-variant/40 w-full max-w-[200px] uppercase py-2 transition-all duration-300 tracking-widest" 
                placeholder="_ _ _ _ _" 
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={5}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Character Selection */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-5xl shrink-0"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
              Select Patient Profile
            </h3>
            <div className="h-px bg-gradient-to-r from-outline-variant to-transparent flex-grow ml-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {CHARACTER_LIST.map((c, i) => (
              <motion.div
                key={c.type}
                custom={i}
                variants={characterVariants}
                initial="hidden"
                animate="visible"
              >
                <CharacterCard
                  character={c}
                  selected={character === c.type}
                  onSelect={() => {
                    setCharacter(c.type);
                    if (error === 'Pick a patient profile first!') {
                      setError('');
                    }
                  }}
                  disabled={loading}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
