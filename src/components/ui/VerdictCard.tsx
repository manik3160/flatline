'use client';

import { motion } from 'framer-motion';
import type { VerdictTier } from '@/types';

interface VerdictCardProps {
  playerName: string;
  character: string;
  verdict: VerdictTier;
  narration: string;
  roastText?: string;
  isMyVerdict: boolean;
}

const VERDICT_CONFIG: Record<VerdictTier, { label: string; colorClass: string; borderClass: string; bgClass: string; shadowClass: string }> = {
  JUGAAD: { 
    label: 'JUGAAD', 
    colorClass: 'text-jugaad', 
    borderClass: 'border-jugaad',
    bgClass: 'bg-jugaad',
    shadowClass: 'shadow-[0_0_20px_rgba(255,215,0,0.4),_inset_0_0_10px_rgba(255,215,0,0.2)]'
  },
  BACH_GAYA: { 
    label: 'BACH GAYA', 
    colorClass: 'text-bach-gaya', 
    borderClass: 'border-bach-gaya',
    bgClass: 'bg-bach-gaya',
    shadowClass: 'shadow-[0_0_20px_rgba(34,197,94,0.4),_inset_0_0_10px_rgba(34,197,94,0.2)]'
  },
  BARBAD: { 
    label: 'BARBAD', 
    colorClass: 'text-barbad', 
    borderClass: 'border-barbad',
    bgClass: 'bg-barbad',
    shadowClass: 'shadow-[0_0_20px_rgba(249,115,22,0.4),_inset_0_0_10px_rgba(249,115,22,0.2)]'
  },
  ANTIM_SANSKAR: { 
    label: 'ANTIM SANSKAR', 
    colorClass: 'text-antim-sanskar', 
    borderClass: 'border-antim-sanskar',
    bgClass: 'bg-antim-sanskar',
    shadowClass: 'shadow-[0_0_30px_rgba(168,85,247,0.3),_inset_0_0_20px_rgba(168,85,247,0.2)]'
  },
};

const CHARACTER_IMAGES: Record<string, string> = {
  topper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2bTjcXZ77vPtByDLk626LOc4r3jNzvgPH32VUj7T5I0xzore0v34Xe7WQ6kuX5U7bU4jX-p4405nEza0BslLIILqnVa1aBgVmmS6sIcXQQPvwqPgTgnG474hc0pH0MROM3-QOoe5UdLXpHSklqLZuLZ0S7D5X2eSIQay0YFx3Z4nhuau94fRSka6NRJk2Mpt-LUEwhK1SyxFW517lVI6dz--PFdA-zKX4zmRvjhbkybXjWC2p6xPaOYooSuNPB76zdy7ET48j0k',
  jugaadu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFE7ST9b9drq63hql8aexpmG3zugN6XW8PdZlxX0vGQxlIQ9ZfKAPw7B1nSG4z99trFD3nJh-To_i79tGQ8Xri5zx5alc6OxmqfNk_neflabT6Es3Vp4IOLT0-kFrhzX-ig37chER5Ed2wgQT1yF5wrIrq4O5hHTP3kZA1A66qy9N-PBgRlsSqmptvVBwVGNrn0CB8J-oEhi_ks_vdtMvfAYMO9BMTfaApTL2ugEYPNn7IvQ_vYu_27ORSHDqGFqC5dktIhjIO4k',
  sharma_ji: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoxI-AIrP9n-A3MdpK-ZF35hZUhtBZUyFV3wMvxdeWHvCuZ6pN6KG36b82B3wKuTF8GrPxwwCHfTktwUxWa5XpwhV39QrD3lAAK36TRmzS_J-tQBwuEH-kc0Xk_dTXMlwkNfS-TNKpfn7NaG6SxLxij59GIjZORdmQ2pRAaxtXeYplzhe3SZYE_hlnPNZX2-OPIpK4YXKRUDhQXEVRKP1stV0jB2aTd9fKCERNcTbuDO2HY2y-cTUiWadlmqVSftGVG6o0CmoAY-M',
  it_uncle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXrcfufvOVYbV4h6LE6ttNelz5gik2hiskRD1iq3xGcAMtwm41sOZ9QmKdgUv13X_I5-qxF2i1qlDCAD_LQt1CYkonts1zny0crTJrfv90xQHF8D6yLznnffg3Dx8SXEYPbO8QARc1SRDM7yNcDPW16DCzzoHA-RMteEZYbbuk8chTnXAloGlGOL5mxB1OPZuCQdR2xJcHmQxzk3fNtddsGxpyf5G9qXc-xM0SRSMhklNVT-hMaUSAWo7__8Y43q6Ee5sAwbkNtFQ',
};

export function VerdictCard({
  playerName,
  character,
  verdict,
  narration,
  roastText,
  isMyVerdict,
}: VerdictCardProps) {
  const config = VERDICT_CONFIG[verdict];
  const isAntimSanskar = verdict === 'ANTIM_SANSKAR';

  if (isAntimSanskar) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        className={`relative w-full border-[3px] ${config.borderClass} ${config.shadowClass} rounded-xl flex flex-col items-center py-10 px-6 z-10 bg-void/80 backdrop-blur-sm overflow-hidden mb-6`}
      >
        {/* Top: Verdict Reveal */}
        <div className="z-20 text-center w-full mb-6">
          <div className="font-label-sm text-on-surface-variant tracking-widest uppercase mb-2 opacity-80">
            {playerName} {isMyVerdict && '(YOU)'}
          </div>
          <h1 className={`font-verdict-lg text-5xl md:text-7xl ${config.colorClass} uppercase animate-pulse`} style={{ textShadow: '0px 4px 0px rgba(168,85,247,0.4), 0px 8px 0px rgba(168,85,247,0.1)' }}>
            {config.label}
          </h1>
        </div>

        {/* Center: Character Illustration */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 z-10 pointer-events-none mb-8">
          <img 
            alt={character} 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] grayscale opacity-80" 
            src={CHARACTER_IMAGES[character] || CHARACTER_IMAGES.topper} 
          />
        </div>

        {/* Bottom Center: Roast Box */}
        <div className="z-20 w-full max-w-2xl relative mt-4">
          <div className="bg-[#1a0a1a] border border-antim-sanskar/40 p-6 relative z-10 shadow-lg backdrop-blur-md" style={{ clipPath: 'polygon(0% 2%, 2% 0%, 98% 1%, 100% 3%, 99% 97%, 97% 100%, 3% 98%, 0% 99%)' }}>
            <p className="font-scenario-text text-scenario-text text-[#E9D5FF] italic text-center leading-relaxed">
              "{roastText || narration}"
            </p>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 z-20">
            <span className={`font-label-sm text-label-sm ${config.colorClass} uppercase tracking-widest bg-void inline-block px-2`}>
              RIP
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
      className={`relative w-full border-[3px] ${config.borderClass} bg-surface-container-lowest p-8 flex flex-col items-center justify-center ${config.shadowClass} mb-6`}
    >
      {/* Corner Decorations */}
      <div className={`absolute top-0 left-0 w-4 h-4 ${config.bgClass} transform -translate-x-1/2 -translate-y-1/2 rotate-45`}></div>
      <div className={`absolute top-0 right-0 w-4 h-4 ${config.bgClass} transform translate-x-1/2 -translate-y-1/2 rotate-45`}></div>
      <div className={`absolute bottom-0 left-0 w-4 h-4 ${config.bgClass} transform -translate-x-1/2 translate-y-1/2 rotate-45`}></div>
      <div className={`absolute bottom-0 right-0 w-4 h-4 ${config.bgClass} transform translate-x-1/2 translate-y-1/2 rotate-45`}></div>
      
      {/* Player Info */}
      <div className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase mb-4 opacity-80">
        {playerName} {isMyVerdict && '(YOU)'}
      </div>

      {/* Verdict Title */}
      <h1 className={`font-display text-5xl md:text-7xl leading-none ${config.colorClass} mb-8 uppercase tracking-tighter`} style={{ textShadow: `0 0 15px var(--tw-colors-${config.colorClass.split('-')[1]})` }}>
        {config.label}
      </h1>

      {/* Character Illustration Container */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 -mt-6 z-20">
        <div className={`absolute inset-0 ${config.bgClass} opacity-20 rounded-full blur-xl`}></div>
        <img 
          alt={character} 
          className="w-full h-full object-cover rounded-full border-4 border-void relative z-10" 
          src={CHARACTER_IMAGES[character] || CHARACTER_IMAGES.topper}
        />
      </div>

      {/* Narration Text */}
      <p className="font-scenario-text text-scenario-text text-center italic text-on-surface max-w-2xl leading-relaxed">
        "{narration}"
      </p>
    </motion.div>
  );
}
