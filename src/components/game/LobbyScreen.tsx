'use client';

import { motion } from 'framer-motion';
import { PlayerChip } from '@/components/ui/PlayerChip';
import { useGameStore } from '@/store/gameStore';
import type { ScenarioCategory } from '@/types';
import { useState } from 'react';

const CATEGORIES: { value: ScenarioCategory; label: string; }[] = [
  { value: 'mixed', label: 'Random Mix' },
  { value: 'family_pressure', label: 'Family Pressure' },
  { value: 'college_life', label: 'College Life' },
  { value: 'indian_streets', label: 'Indian Streets' },
  { value: 'monsoon_madness', label: 'Monsoon Madness' },
  { value: 'festival_chaos', label: 'Festival Chaos' },
  { value: 'startup_it_life', label: 'Startup/IT Life' },
  { value: 'shaadi_season', label: 'Shaadi Season' },
];

interface LobbyScreenProps {
  onStartGame: () => void;
  onUpdateSettings: (category: ScenarioCategory, rounds: number) => void;
}

export function LobbyScreen({ onStartGame, onUpdateSettings }: LobbyScreenProps) {
  const { roomCode, players, isHost, category, totalRounds, playerName, character } = useGameStore();

  const activePlayers = players.filter((p) => p.is_active);
  const canStart = activePlayers.length >= 2;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for character images (fallback if needed)
  const imageUrls: Record<string, string> = {
    topper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2bTjcXZ77vPtByDLk626LOc4r3jNzvgPH32VUj7T5I0xzore0v34Xe7WQ6kuX5U7bU4jX-p4405nEza0BslLIILqnVa1aBgVmmS6sIcXQQPvwqPgTgnG474hc0pH0MROM3-QOoe5UdLXpHSklqLZuLZ0S7D5X2eSIQay0YFx3Z4nhuau94fRSka6NRJk2Mpt-LUEwhK1SyxFW517lVI6dz--PFdA-zKX4zmRvjhbkybXjWC2p6xPaOYooSuNPB76zdy7ET48j0k',
    jugaadu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFE7ST9b9drq63hql8aexpmG3zugN6XW8PdZlxX0vGQxlIQ9ZfKAPw7B1nSG4z99trFD3nJh-To_i79tGQ8Xri5zx5alc6OxmqfNk_neflabT6Es3Vp4IOLT0-kFrhzX-ig37chER5Ed2wgQT1yF5wrIrq4O5hHTP3kZA1A66qy9N-PBgRlsSqmptvVBwVGNrn0CB8J-oEhi_ks_vdtMvfAYMO9BMTfaApTL2ugEYPNn7IvQ_vYu_27ORSHDqGFqC5dktIhjIO4k',
    sharma_ji: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoxI-AIrP9n-A3MdpK-ZF35hZUhtBZUyFV3wMvxdeWHvCuZ6pN6KG36b82B3wKuTF8GrPxwwCHfTktwUxWa5XpwhV39QrD3lAAK36TRmzS_J-tQBwuEH-kc0Xk_dTXMlwkNfS-TNKpfn7NaG6SxLxij59GIjZORdmQ2pRAaxtXeYplzhe3SZYE_hlnPNZX2-OPIpK4YXKRUDhQXEVRKP1stV0jB2aTd9fKCERNcTbuDO2HY2y-cTUiWadlmqVSftGVG6o0CmoAY-M',
    it_uncle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXrcfufvOVYbV4h6LE6ttNelz5gik2hiskRD1iq3xGcAMtwm41sOZ9QmKdgUv13X_I5-qxF2i1qlDCAD_LQt1CYkonts1zny0crTJrfv90xQHF8D6yLznnffg3Dx8SXEYPbO8QARc1SRDM7yNcDPW16DCzzoHA-RMteEZYbbuk8chTnXAloGlGOL5mxB1OPZuCQdR2xJcHmQxzk3fNtddsGxpyf5G9qXc-xM0SRSMhklNVT-hMaUSAWo7__8Y43q6Ee5sAwbkNtFQ',
  };

  return (
    <div className="flex flex-col items-center pt-16 pb-24 md:pb-8 w-full min-h-screen relative overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-2 border-b border-outline-variant bg-void">
        <div className="font-display text-display-xl text-primary tracking-tighter uppercase" style={{ fontSize: '48px', lineHeight: 1 }}>FLATLINE</div>
        <div className="flex gap-4">
          <button className="text-primary hover:text-primary-container transition-colors p-2 rounded-full">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="text-primary hover:text-primary-container transition-colors p-2 rounded-full">
            <span className="material-symbols-outlined">emergency</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl px-gutter flex-grow flex flex-col gap-margin-desktop mt-8 md:pl-64">
        {/* Room Code Section */}
        <section className="flex flex-col items-center gap-4 w-full">
          <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">Room Code</div>
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-primary opacity-5 blur-xl rounded-lg"></div>
            <div className="relative border-2 border-dashed border-primary rounded-lg p-6 bg-surface-container-lowest flex flex-col items-center justify-center gap-2 border-glow">
              <h1 className="font-timer-mono text-timer-mono text-primary tracking-[0.2em]">{roomCode}</h1>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase hover:text-primary-container transition-colors mt-2 bg-surface-container-highest px-4 py-2 rounded-full"
              >
                <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
                {copied ? 'Copied!' : 'Share with friends'}
              </button>
            </div>
          </div>
          <div className="w-full max-w-2xl mt-4">
            <div className="ekg-line w-full"></div>
          </div>
        </section>

        {/* Player List Section */}
        <section className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-outline-variant pb-2">
            <h2 className="font-display text-[48px] leading-none text-on-surface tracking-wide">PLAYERS</h2>
            <span className="font-timer-mono text-[16px] text-tertiary">{activePlayers.length}/8</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePlayers.map((player) => (
              <PlayerChip
                key={player.id}
                name={player.name}
                character={player.character}
                isHost={player.is_host}
                isActive={player.is_active}
              />
            ))}
            {/* Fill empty slots visually to show 8 slots max, maybe just 1 waiting slot for visual clue */}
            {activePlayers.length < 8 && (
              <div className="bg-surface-container border border-outline-variant rounded-lg p-3 flex items-center gap-4 relative overflow-hidden group opacity-60">
                <div className="w-16 h-16 rounded-md bg-surface-container-highest border border-outline-variant overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline-variant text-3xl">person</span>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <span className="font-body-base text-body-base text-on-surface-variant italic">Waiting...</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Host Settings Section OR Guest Waiting */}
        {isHost ? (
          <section className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-tertiary opacity-50"></div>
            <h3 className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Lobby Settings (Host Only)
            </h3>
            
            {/* Category Selector */}
            <div className="flex flex-col gap-3">
              <label className="font-body-base text-[14px] text-on-surface-variant">Select Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => onUpdateSettings(c.value, totalRounds)}
                    className={
                      category === c.value
                        ? "bg-primary text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-full font-bold uppercase transition-colors"
                        : "bg-surface border border-outline-variant text-on-surface-variant font-label-sm text-label-sm px-4 py-2 rounded-full uppercase hover:border-primary hover:text-primary transition-colors"
                    }
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rounds Selector */}
            <div className="flex flex-col gap-3">
              <label className="font-body-base text-[14px] text-on-surface-variant">Number of Rounds</label>
              <div className="flex gap-2">
                {[3, 5, 7].map((n) => (
                  <button
                    key={n}
                    onClick={() => onUpdateSettings(category, n)}
                    className={
                      totalRounds === n
                        ? "bg-surface-container-highest border-2 border-primary text-primary font-timer-mono text-[20px] w-12 h-12 rounded flex items-center justify-center border-glow"
                        : "bg-surface border border-outline-variant text-on-surface-variant font-timer-mono text-[20px] w-12 h-12 rounded flex items-center justify-center hover:border-primary transition-colors"
                    }
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={onStartGame}
              disabled={!canStart}
              className="btn-red-flatline w-full py-4 rounded-lg font-display text-[48px] tracking-wider mt-4 relative overflow-hidden flex justify-center items-center gap-3 leading-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[#c00012]"
            >
              <span>{canStart ? 'START GAME' : 'WAITING...'}</span>
              <span className="material-symbols-outlined text-4xl">play_arrow</span>
            </button>
          </section>
        ) : (
          <section className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-6 relative overflow-hidden min-h-[200px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-tertiary opacity-50"></div>
            <div className="w-1/2 max-w-[200px]">
              <div className="ekg-line w-full"></div>
            </div>
            <p className="font-timer-mono text-tertiary uppercase tracking-widest text-center mt-4">
              WAITING FOR HOST...
            </p>
          </section>
        )}
      </main>

      {/* SideNavBar - Mobile Bottom */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-4 h-20 border-t border-outline-variant bg-void">
        <button className="flex flex-col items-center justify-center text-tertiary bg-surface-container-highest border-t-2 border-tertiary rounded-t-lg p-2 w-16">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
          <span className="font-label-sm text-[10px] mt-1 uppercase">Lobby</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">monitoring</span>
          <span className="font-label-sm text-[10px] mt-1 uppercase">Stats</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-sm text-[10px] mt-1 uppercase">Archive</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-sm text-[10px] mt-1 uppercase">Exit</span>
        </button>
      </nav>

      {/* SideNavBar - Desktop Left */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full z-40 pt-16 flex-col bg-surface-container-lowest border-r border-outline-variant w-64">
        {/* Header */}
        <div className="p-6 border-b border-outline-variant flex flex-col gap-4">
          <div className="w-16 h-16 rounded bg-surface-container-highest border border-outline-variant overflow-hidden flex items-center justify-center">
            {character ? (
               <img src={imageUrls[character]} alt="Me" className="w-full h-full object-cover object-top" />
            ) : (
               <span className="material-symbols-outlined text-outline-variant text-3xl">person</span>
            )}
          </div>
          <div>
            <div className="font-body-base text-body-base text-on-surface font-bold uppercase max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{playerName || 'PLAYER_01'}</div>
            <div className="font-timer-mono text-[12px] text-tertiary">Vitals: Stable</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col py-4 gap-2 flex-grow">
          <div className="flex items-center gap-4 py-3 text-tertiary font-bold border-l-4 border-tertiary pl-4 bg-surface-container-highest transition-all cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            <span className="font-label-sm text-label-sm uppercase">Lobby</span>
          </div>
          <div className="flex items-center gap-4 py-3 text-on-surface-variant pl-4 hover:bg-surface-container-high hover:text-tertiary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">monitoring</span>
            <span className="font-label-sm text-label-sm uppercase">Stats</span>
          </div>
          <div className="flex items-center gap-4 py-3 text-on-surface-variant pl-4 hover:bg-surface-container-high hover:text-tertiary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">history</span>
            <span className="font-label-sm text-label-sm uppercase">Archive</span>
          </div>
          <div className="flex items-center gap-4 py-3 text-on-surface-variant pl-4 hover:bg-surface-container-high hover:text-tertiary transition-colors mt-auto cursor-pointer">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-sm text-label-sm uppercase">Exit</span>
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 border-t border-outline-variant">
          <button className="w-full bg-surface border border-outline-variant text-on-surface py-2 rounded font-label-sm text-label-sm uppercase hover:border-tertiary hover:text-tertiary transition-colors tracking-widest">
            {roomCode ? `WARD: ${roomCode}` : 'JOIN WARD'}
          </button>
        </div>
      </nav>
    </div>
  );
}
