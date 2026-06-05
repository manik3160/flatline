'use client';

import { motion } from 'framer-motion';
import type { PlayerRow } from '@/types';

interface GameOverProps {
  players: PlayerRow[];
  onPlayAgain: () => void;
}

const CHARACTER_IMAGES: Record<string, string> = {
  topper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2bTjcXZ77vPtByDLk626LOc4r3jNzvgPH32VUj7T5I0xzore0v34Xe7WQ6kuX5U7bU4jX-p4405nEza0BslLIILqnVa1aBgVmmS6sIcXQQPvwqPgTgnG474hc0pH0MROM3-QOoe5UdLXpHSklqLZuLZ0S7D5X2eSIQay0YFx3Z4nhuau94fRSka6NRJk2Mpt-LUEwhK1SyxFW517lVI6dz--PFdA-zKX4zmRvjhbkybXjWC2p6xPaOYooSuNPB76zdy7ET48j0k',
  jugaadu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFE7ST9b9drq63hql8aexpmG3zugN6XW8PdZlxX0vGQxlIQ9ZfKAPw7B1nSG4z99trFD3nJh-To_i79tGQ8Xri5zx5alc6OxmqfNk_neflabT6Es3Vp4IOLT0-kFrhzX-ig37chER5Ed2wgQT1yF5wrIrq4O5hHTP3kZA1A66qy9N-PBgRlsSqmptvVBwVGNrn0CB8J-oEhi_ks_vdtMvfAYMO9BMTfaApTL2ugEYPNn7IvQ_vYu_27ORSHDqGFqC5dktIhjIO4k',
  sharma_ji: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoxI-AIrP9n-A3MdpK-ZF35hZUhtBZUyFV3wMvxdeWHvCuZ6pN6KG36b82B3wKuTF8GrPxwwCHfTktwUxWa5XpwhV39QrD3lAAK36TRmzS_J-tQBwuEH-kc0Xk_dTXMlwkNfS-TNKpfn7NaG6SxLxij59GIjZORdmQ2pRAaxtXeYplzhe3SZYE_hlnPNZX2-OPIpK4YXKRUDhQXEVRKP1stV0jB2aTd9fKCERNcTbuDO2HY2y-cTUiWadlmqVSftGVG6o0CmoAY-M',
  it_uncle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXrcfufvOVYbV4h6LE6ttNelz5gik2hiskRD1iq3xGcAMtwm41sOZ9QmKdgUv13X_I5-qxF2i1qlDCAD_LQt1CYkonts1zny0crTJrfv90xQHF8D6yLznnffg3Dx8SXEYPbO8QARc1SRDM7yNcDPW16DCzzoHA-RMteEZYbbuk8chTnXAloGlGOL5mxB1OPZuCQdR2xJcHmQxzk3fNtddsGxpyf5G9qXc-xM0SRSMhklNVT-hMaUSAWo7__8Y43q6Ee5sAwbkNtFQ',
};

export function GameOver({ players, onPlayAgain }: GameOverProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-void text-on-surface min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Texture Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{ backgroundImage: 'radial-gradient(rgba(254, 219, 214, 0.08) 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }}
      ></div>

      {/* Main Canvas */}
      <main className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full px-gutter py-margin-mobile md:py-margin-desktop">
        
        {/* Header Section */}
        <header className="text-center mb-12 flex flex-col items-center justify-center">
          <div className="w-full h-[1px] mb-8" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255, 84, 74, 0.2) 50%, transparent 100%)' }}></div>
          <h1 className="font-display text-[48px] md:text-7xl text-jugaad uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            FINAL SCOREBOARD
          </h1>
          <div className="w-full h-[1px] mt-8" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255, 84, 74, 0.2) 50%, transparent 100%)' }}></div>
        </header>

        {/* Leaderboard List */}
        <section className="flex-1 flex flex-col gap-4 w-full max-w-3xl mx-auto">
          {sorted.map((player, index) => {
            const isWinner = index === 0;
            
            if (isWinner) {
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative bg-surface-container-low border-2 border-jugaad rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 transform md:scale-105 z-20 mb-4"
                  style={{ boxShadow: '0 0 24px rgba(255, 215, 0, 0.2), inset 0 0 12px rgba(255, 215, 0, 0.1)' }}
                >
                  <div className="absolute -top-4 -left-4 bg-jugaad text-void rounded-full p-2 shadow-lg flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                  </div>
                  <div className="font-timer-mono text-timer-mono text-jugaad w-16 text-center shrink-0">
                    01
                  </div>
                  <div className="shrink-0 relative">
                    <img 
                      alt={player.character} 
                      className="w-24 h-24 object-cover object-top rounded-full border-4 border-jugaad bg-surface shadow-[0_0_15px_rgba(255,215,0,0.4)]" 
                      src={CHARACTER_IMAGES[player.character] || CHARACTER_IMAGES.topper} 
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-scenario-text text-scenario-text text-jugaad mb-1">{player.name}</h2>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status: Immortal</p>
                  </div>
                  <div className="font-display text-5xl md:text-7xl text-primary text-center md:text-right shrink-0">
                    {player.score}
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:bg-surface-container-high transition-colors group"
              >
                <div className="font-timer-mono text-timer-mono text-on-surface-variant w-16 text-center shrink-0 group-hover:text-tertiary transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="shrink-0">
                  <img 
                    alt={player.character} 
                    className="w-16 h-16 object-cover object-top rounded-full border-2 border-outline-variant grayscale group-hover:grayscale-0 transition-all" 
                    src={CHARACTER_IMAGES[player.character] || CHARACTER_IMAGES.topper} 
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-scenario-text text-[20px] text-on-surface">{player.name}</h2>
                </div>
                <div className="font-display text-[48px] text-on-surface-variant text-center md:text-right shrink-0 leading-none">
                  {player.score}
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Footer Actions */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={onPlayAgain}
            className="bg-primary text-on-primary font-display text-3xl uppercase px-12 py-5 rounded tracking-[0.1em] hover:bg-primary-container transition-all shadow-[0_0_15px_rgba(255,84,74,0.3)] hover:shadow-[0_0_25px_rgba(255,84,74,0.6)] transform hover:-translate-y-1 w-full sm:w-auto"
          >
            PLAY AGAIN
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="border border-outline-variant text-on-surface-variant font-display text-3xl uppercase px-12 py-5 rounded tracking-[0.1em] hover:bg-surface-container-high hover:text-on-surface hover:border-outline transition-all w-full sm:w-auto"
          >
            EXIT WARD
          </button>
        </motion.footer>

      </main>
    </div>
  );
}
