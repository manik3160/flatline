'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const LOADING_MESSAGES = [
  'Consulting Sharma Ji Ka Beta...',
  'AI peeking at your kundali...',
  'Calculating survival odds...',
  'Searching for common sense...',
  'Preparing the verdict...',
  'Checking WhatsApp forwards for advice...',
  'Consulting the universe...',
];

export function JudgingScreen() {
  const players = useGameStore((s) => s.players).filter((p) => p.is_active);
  const [messageIndex, setMessageIndex] = useState(0);

  // Helper for character images
  const imageUrls: Record<string, string> = {
    topper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2bTjcXZ77vPtByDLk626LOc4r3jNzvgPH32VUj7T5I0xzore0v34Xe7WQ6kuX5U7bU4jX-p4405nEza0BslLIILqnVa1aBgVmmS6sIcXQQPvwqPgTgnG474hc0pH0MROM3-QOoe5UdLXpHSklqLZuLZ0S7D5X2eSIQay0YFx3Z4nhuau94fRSka6NRJk2Mpt-LUEwhK1SyxFW517lVI6dz--PFdA-zKX4zmRvjhbkybXjWC2p6xPaOYooSuNPB76zdy7ET48j0k',
    jugaadu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFE7ST9b9drq63hql8aexpmG3zugN6XW8PdZlxX0vGQxlIQ9ZfKAPw7B1nSG4z99trFD3nJh-To_i79tGQ8Xri5zx5alc6OxmqfNk_neflabT6Es3Vp4IOLT0-kFrhzX-ig37chER5Ed2wgQT1yF5wrIrq4O5hHTP3kZA1A66qy9N-PBgRlsSqmptvVBwVGNrn0CB8J-oEhi_ks_vdtMvfAYMO9BMTfaApTL2ugEYPNn7IvQ_vYu_27ORSHDqGFqC5dktIhjIO4k',
    sharma_ji: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoxI-AIrP9n-A3MdpK-ZF35hZUhtBZUyFV3wMvxdeWHvCuZ6pN6KG36b82B3wKuTF8GrPxwwCHfTktwUxWa5XpwhV39QrD3lAAK36TRmzS_J-tQBwuEH-kc0Xk_dTXMlwkNfS-TNKpfn7NaG6SxLxij59GIjZORdmQ2pRAaxtXeYplzhe3SZYE_hlnPNZX2-OPIpK4YXKRUDhQXEVRKP1stV0jB2aTd9fKCERNcTbuDO2HY2y-cTUiWadlmqVSftGVG6o0CmoAY-M',
    it_uncle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXrcfufvOVYbV4h6LE6ttNelz5gik2hiskRD1iq3xGcAMtwm41sOZ9QmKdgUv13X_I5-qxF2i1qlDCAD_LQt1CYkonts1zny0crTJrfv90xQHF8D6yLznnffg3Dx8SXEYPbO8QARc1SRDM7yNcDPW16DCzzoHA-RMteEZYbbuk8chTnXAloGlGOL5mxB1OPZuCQdR2xJcHmQxzk3fNtddsGxpyf5G9qXc-xM0SRSMhklNVT-hMaUSAWo7__8Y43q6Ee5sAwbkNtFQ',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-void text-on-surface min-h-screen flex flex-col font-body-base text-body-base overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(32,15,13,0.8)_0%,_rgba(8,8,8,1)_100%)]">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(94, 63, 59, 0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(94, 63, 59, 0.1) 20px)' }}></div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-gutter md:px-margin-desktop py-12 z-10 w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-[48px] text-primary mb-12 uppercase drop-shadow-[0_0_10px_rgba(255,84,74,0.8)] text-center leading-none"
        >
          AI IS JUDGING YOUR FATE
        </motion.div>

        {/* Fast EKG Line (1.8s loop) */}
        <div className="w-full max-w-2xl mb-16 opacity-40">
          <svg height="80" preserveAspectRatio="none" viewBox="0 0 1000 80" width="100%">
            <motion.path 
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              d="M0,40 L200,40 L220,10 L240,70 L260,20 L280,60 L300,40 L1000,40" 
              fill="none" 
              stroke="#ffb4ab" 
              strokeWidth="4"
              strokeDasharray="1000"
            />
          </svg>
        </div>

        {/* Character Chips */}
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center mb-16 px-4">
          {players.map((player, index) => (
            <motion.div 
              key={player.id}
              initial={{ backgroundColor: '#111111', borderColor: '#242424', color: '#e8bcb7' }}
              animate={{ backgroundColor: '#c00012', borderColor: '#ffb4ab', color: '#ffffff' }}
              transition={{ delay: 1 + index * 1.2, duration: 0.5 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container border-2 border-outline-variant flex items-center justify-center overflow-hidden shadow-lg"
            >
              {player.character ? (
                <img src={imageUrls[player.character]} alt={player.name} className="w-full h-full object-cover object-top opacity-80" />
              ) : (
                <span className="font-timer-mono text-xl md:text-2xl uppercase">{player.name.substring(0, 2)}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Rotating Desi Loading Messages */}
        <div className="h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p 
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-scenario-text text-scenario-text text-on-surface-variant text-center"
            >
              {LOADING_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
