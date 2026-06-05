'use client';

import { motion } from 'framer-motion';
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

  const getBorderColor = () => {
    if (!selected) return 'border-surface';
    if (character.type === 'topper') return 'border-red-flatline';
    if (character.type === 'jugaadu') return 'border-jugaad';
    if (character.type === 'sharma_ji') return 'border-jugaad';
    if (character.type === 'it_uncle') return 'border-primary';
    return 'border-primary';
  };

  const getTextColor = () => {
    if (!selected) return 'text-on-surface';
    if (character.type === 'jugaadu') return 'text-jugaad';
    if (character.type === 'topper') return 'text-red-flatline';
    if (character.type === 'sharma_ji') return 'text-jugaad';
    if (character.type === 'it_uncle') return 'text-primary';
    return 'text-primary';
  };

  return (
    <motion.button
      onClick={onSelect}
      disabled={disabled}
      className={`relative group cursor-pointer flex flex-col items-center w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <div 
        className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 ${getBorderColor()} bg-elevated overflow-visible relative transition-colors duration-300 ${selected ? 'border-glow' : ''}`}
        style={{ transition: 'all 0.3s ease' }}
      >
        <img
          src={imageUrls[character.type]}
          alt={character.name}
          className="w-full h-full object-cover rounded-full object-top transform scale-110 -translate-y-2 sm:-translate-y-4"
        />
      </div>
      <div 
        className={`mt-4 bg-surface border border-border-default px-3 py-1 rounded-full transition-colors ${selected ? getBorderColor() : ''}`}
      >
        <span className={`font-label-sm text-label-sm uppercase tracking-widest ${getTextColor()}`}>
          {character.name}
        </span>
      </div>
    </motion.button>
  );
}
