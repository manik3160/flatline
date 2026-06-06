'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { CharacterDef } from '@/types';

interface CharacterCardProps {
  character: CharacterDef;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function CharacterCard({ character, selected, onSelect, disabled }: CharacterCardProps) {
  // Temporary mapping for images until we have all 4 generated.
  const imageUrls: Record<string, string> = {
    topper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2bTjcXZ77vPtByDLk626LOc4r3jNzvgPH32VUj7T5I0xzore0v34Xe7WQ6kuX5U7bU4jX-p4405nEza0BslLIILqnVa1aBgVmmS6sIcXQQPvwqPgTgnG474hc0pH0MROM3-QOoe5UdLXpHSklqLZuLZ0S7D5X2eSIQay0YFx3Z4nhuau94fRSka6NRJk2Mpt-LUEwhK1SyxFW517lVI6dz--PFdA-zKX4zmRvjhbkybXjWC2p6xPaOYooSuNPB76zdy7ET48j0k',
    jugaadu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFE7ST9b9drq63hql8aexpmG3zugN6XW8PdZlxX0vGQxlIQ9ZfKAPw7B1nSG4z99trFD3nJh-To_i79tGQ8Xri5zx5alc6OxmqfNk_neflabT6Es3Vp4IOLT0-kFrhzX-ig37chER5Ed2wgQT1yF5wrIrq4O5hHTP3kZA1A66qy9N-PBgRlsSqmptvVBwVGNrn0CB8J-oEhi_ks_vdtMvfAYMO9BMTfaApTL2ugEYPNn7IvQ_vYu_27ORSHDqGFqC5dktIhjIO4k',
    sharma_ji: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoxI-AIrP9n-A3MdpK-ZF35hZUhtBZUyFV3wMvxdeWHvCuZ6pN6KG36b82B3wKuTF8GrPxwwCHfTktwUxWa5XpwhV39QrD3lAAK36TRmzS_J-tQBwuEH-kc0Xk_dTXMlwkNfS-TNKpfn7NaG6SxLxij59GIjZORdmQ2pRAaxtXeYplzhe3SZYE_hlnPNZX2-OPIpK4YXKRUDhQXEVRKP1stV0jB2aTd9fKCERNcTbuDO2HY2y-cTUiWadlmqVSftGVG6o0CmoAY-M',
    it_uncle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXrcfufvOVYbV4h6LE6ttNelz5gik2hiskRD1iq3xGcAMtwm41sOZ9QmKdgUv13X_I5-qxF2i1qlDCAD_LQt1CYkonts1zny0crTJrfv90xQHF8D6yLznnffg3Dx8SXEYPbO8QARc1SRDM7yNcDPW16DCzzoHA-RMteEZYbbuk8chTnXAloGlGOL5mxB1OPZuCQdR2xJcHmQxzk3fNtddsGxpyf5G9qXc-xM0SRSMhklNVT-hMaUSAWo7__8Y43q6Ee5sAwbkNtFQ',
  };

  const getGlowColor = () => {
    if (character.type === 'topper') return 'rgba(192, 0, 18, 0.5)';
    if (character.type === 'jugaadu') return 'rgba(255, 215, 0, 0.5)';
    if (character.type === 'sharma_ji') return 'rgba(255, 215, 0, 0.4)';
    if (character.type === 'it_uncle') return 'rgba(107, 211, 253, 0.5)';
    return 'rgba(255, 180, 171, 0.5)';
  };

  const getBorderGradient = () => {
    if (character.type === 'topper') return 'from-[#c00012] via-[#ff544a] to-[#c00012]';
    if (character.type === 'jugaadu') return 'from-[#FFD700] via-[#FFA500] to-[#FFD700]';
    if (character.type === 'sharma_ji') return 'from-[#FFD700] via-[#DAA520] to-[#FFD700]';
    if (character.type === 'it_uncle') return 'from-[#6bd3fd] via-[#249cc4] to-[#6bd3fd]';
    return 'from-primary via-primary-container to-primary';
  };

  const getTextColor = () => {
    if (!selected) return 'text-on-surface-variant';
    if (character.type === 'jugaadu') return 'text-jugaad';
    if (character.type === 'topper') return 'text-red-flatline';
    if (character.type === 'sharma_ji') return 'text-jugaad';
    if (character.type === 'it_uncle') return 'text-tertiary';
    return 'text-primary';
  };

  return (
    <motion.button
      onClick={onSelect}
      disabled={disabled}
      className={`relative group cursor-pointer flex flex-col items-center w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!disabled ? { scale: 1.08 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Glow behind avatar */}
      <motion.div
        className="absolute top-0 w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-2xl -z-10"
        style={{ backgroundColor: getGlowColor() }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: selected ? 0.4 : 0,
          scale: selected ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Avatar container */}
      <div className="relative">
        {/* Rotating gradient border for selected state */}
        {selected && (
          <motion.div
            className={`absolute -inset-1 rounded-full bg-gradient-to-r ${getBorderGradient()} opacity-80`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.8, scale: 1, rotate: 360 }}
            transition={{ 
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotate: { duration: 6, repeat: Infinity, ease: 'linear' }
            }}
            style={{ padding: '3px' }}
          >
            <div className="w-full h-full rounded-full bg-void" />
          </motion.div>
        )}
        
        <motion.div 
          className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[3px] overflow-hidden relative z-10 transition-colors duration-300 ${
            selected 
              ? 'border-transparent' 
              : 'border-outline-variant/40 group-hover:border-outline-variant'
          }`}
          style={{
            boxShadow: selected 
              ? `0 0 20px ${getGlowColor()}, inset 0 0 20px rgba(0,0,0,0.5)` 
              : 'inset 0 0 20px rgba(0,0,0,0.3)',
          }}
          animate={{
            filter: selected ? 'grayscale(0) brightness(1.1)' : 'grayscale(0.3) brightness(0.8)',
          }}
          whileHover={{
            filter: 'grayscale(0) brightness(1)',
          }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={imageUrls[character.type]}
            alt={character.name}
            className="w-full h-full object-cover rounded-full object-top transform scale-110 -translate-y-2 sm:-translate-y-4"
          />
        </motion.div>

        {/* Selection check indicator */}
        <AnimatePresenceWrapper selected={selected} />
      </div>

      {/* Name pill */}
      <motion.div 
        className={`mt-3 px-4 py-1.5 rounded-full transition-all duration-300 ${
          selected 
            ? 'glass-card-active' 
            : 'bg-surface/40 backdrop-blur-sm border border-outline-variant/30 group-hover:border-outline-variant/60'
        }`}
        animate={{
          scale: selected ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className={`font-label-sm text-label-sm uppercase tracking-widest ${getTextColor()} transition-colors duration-300`}>
          {character.name}
        </span>
      </motion.div>
      
      {/* Ability text on selection */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: selected ? 1 : 0,
          height: selected ? 'auto' : 0,
          marginTop: selected ? 8 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <span className="font-timer-mono text-[10px] text-on-surface-variant/60 uppercase tracking-wider">
          {character.ability}
        </span>
      </motion.div>
    </motion.button>
  );
}

// Small wrapper to avoid putting AnimatePresence inside conditional
function AnimatePresenceWrapper({ selected }: { selected: boolean }) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-container flex items-center justify-center z-20 shadow-lg"
          style={{ boxShadow: '0 0 10px rgba(255, 84, 74, 0.5)' }}
        >
          <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
