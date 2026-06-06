'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlayerChip } from '@/components/ui/PlayerChip';
import { EkgLine } from '@/components/ui/EkgLine';
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
  const router = useRouter();
  const { roomCode, players, isHost, category, totalRounds, playerName, character, reset } = useGameStore();

  const activePlayers = players.filter((p) => p.is_active);
  const canStart = activePlayers.length >= 2;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExit = () => {
    if (confirm('Are you sure you want to leave the ward?')) {
      reset();
      router.push('/');
    }
  };

  // Helper for character images (fallback if needed)
  const imageUrls: Record<string, string> = {
    topper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2bTjcXZ77vPtByDLk626LOc4r3jNzvgPH32VUj7T5I0xzore0v34Xe7WQ6kuX5U7bU4jX-p4405nEza0BslLIILqnVa1aBgVmmS6sIcXQQPvwqPgTgnG474hc0pH0MROM3-QOoe5UdLXpHSklqLZuLZ0S7D5X2eSIQay0YFx3Z4nhuau94fRSka6NRJk2Mpt-LUEwhK1SyxFW517lVI6dz--PFdA-zKX4zmRvjhbkybXjWC2p6xPaOYooSuNPB76zdy7ET48j0k',
    jugaadu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFE7ST9b9drq63hql8aexpmG3zugN6XW8PdZlxX0vGQxlIQ9ZfKAPw7B1nSG4z99trFD3nJh-To_i79tGQ8Xri5zx5alc6OxmqfNk_neflabT6Es3Vp4IOLT0-kFrhzX-ig37chER5Ed2wgQT1yF5wrIrq4O5hHTP3kZA1A66qy9N-PBgRlsSqmptvVBwVGNrn0CB8J-oEhi_ks_vdtMvfAYMO9BMTfaApTL2ugEYPNn7IvQ_vYu_27ORSHDqGFqC5dktIhjIO4k',
    sharma_ji: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoxI-AIrP9n-A3MdpK-ZF35hZUhtBZUyFV3wMvxdeWHvCuZ6pN6KG36b82B3wKuTF8GrPxwwCHfTktwUxWa5XpwhV39QrD3lAAK36TRmzS_J-tQBwuEH-kc0Xk_dTXMlwkNfS-TNKpfn7NaG6SxLxij59GIjZORdmQ2pRAaxtXeYplzhe3SZYE_hlnPNZX2-OPIpK4YXKRUDhQXEVRKP1stV0jB2aTd9fKCERNcTbuDO2HY2y-cTUiWadlmqVSftGVG6o0CmoAY-M',
    it_uncle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXrcfufvOVYbV4h6LE6ttNelz5gik2hiskRD1iq3xGcAMtwm41sOZ9QmKdgUv13X_I5-qxF2i1qlDCAD_LQt1CYkonts1zny0crTJrfv90xQHF8D6yLznnffg3Dx8SXEYPbO8QARc1SRDM7yNcDPW16DCzzoHA-RMteEZYbbuk8chTnXAloGlGOL5mxB1OPZuCQdR2xJcHmQxzk3fNtddsGxpyf5G9qXc-xM0SRSMhklNVT-hMaUSAWo7__8Y43q6Ee5sAwbkNtFQ',
  };

  return (
    <div className="flex flex-col items-center pt-16 pb-32 md:pb-12 w-full min-h-[100dvh] relative overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-2 border-b border-outline-variant bg-void">
        <div className="font-display text-display-xl text-primary tracking-tighter uppercase" style={{ fontSize: '48px', lineHeight: 1 }}>FLATLINE</div>
        <div className="flex gap-4">
          <button onClick={() => alert('Settings coming soon!')} className="text-primary hover:text-primary-container transition-colors p-2 rounded-full">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button onClick={() => alert('Emergency actions coming soon!')} className="text-primary hover:text-primary-container transition-colors p-2 rounded-full">
            <span className="material-symbols-outlined">emergency</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="w-full max-w-5xl flex-grow flex flex-col items-center justify-start shrink-0 mt-8 md:pl-72"
        style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', rowGap: '4rem' }}
      >
        {/* Room Code Section */}
        <section className="flex flex-col items-center gap-6 w-full max-w-2xl shrink-0">
          <div className="text-on-surface-variant font-label-sm text-[12px] uppercase tracking-widest opacity-80">Room Code</div>
          <div className="relative w-full">
            <div className="absolute inset-0 bg-primary opacity-10 blur-2xl rounded-2xl"></div>
            <div className="relative border border-primary/40 rounded-2xl p-8 bg-surface-container/40 backdrop-blur-md flex flex-col items-center justify-center gap-6 shadow-[0_0_30px_rgba(255,84,74,0.1)]">
              <h1 className="font-display text-[5rem] md:text-[7rem] leading-none text-primary tracking-widest title-shimmer drop-shadow-lg">{roomCode}</h1>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-primary font-label-sm text-[12px] uppercase hover:text-primary-container transition-colors bg-primary/10 border border-primary/20 px-6 py-3 rounded-full hover:bg-primary/20"
              >
                <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
                {copied ? 'Copied to Clipboard!' : 'Share with friends'}
              </button>
            </div>
          </div>
          <div className="w-full mt-6">
            <EkgLine color="var(--color-primary)" animationDuration={3} height={40} />
          </div>
        </section>

        {/* Player List Section */}
        <section className="w-full max-w-3xl flex flex-col shrink-0" style={{ gap: '2rem' }}>
          <div className="flex justify-between items-end border-b border-outline-variant/50 pb-4">
            <h2 className="font-display text-[3rem] md:text-[4rem] leading-none text-on-surface tracking-wide drop-shadow-md">PLAYERS</h2>
            <span className="font-timer-mono text-[1.5rem] text-tertiary mb-2">{activePlayers.length}/8</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="bg-surface-container/30 border-2 border-dashed border-outline-variant/30 rounded-xl p-3 flex items-center gap-4 relative overflow-hidden group opacity-50">
                <div className="w-16 h-16 rounded-md bg-surface-container-highest border border-outline-variant/50 overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline-variant/50 text-3xl">person</span>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <span className="font-timer-mono text-[14px] text-on-surface-variant/70 uppercase tracking-widest">Waiting for player...</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Host Settings Section OR Guest Waiting */}
        {isHost ? (
          <section className="w-full max-w-3xl glass-card border border-tertiary/20 rounded-2xl flex flex-col relative overflow-hidden shrink-0 shadow-[0_0_40px_rgba(107,211,253,0.05)] mt-4" style={{ padding: '2rem', gap: '2rem' }}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tertiary/50 to-transparent"></div>
            <h3 className="font-label-sm text-[14px] text-tertiary uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Lobby Settings (Host Only)
            </h3>
            
            {/* Category Selector */}
            <div className="flex flex-col" style={{ gap: '1rem' }}>
              <label className="font-timer-mono text-[12px] text-on-surface-variant/60 uppercase tracking-widest">Select Category</label>
              <div className="flex flex-wrap" style={{ gap: '0.75rem' }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => onUpdateSettings(c.value, totalRounds)}
                    className={
                      category === c.value
                        ? "bg-tertiary/20 border border-tertiary text-tertiary font-label-sm text-[12px] rounded-full font-bold uppercase transition-all shadow-[0_0_15px_rgba(107,211,253,0.2)]"
                        : "bg-surface-container/50 border border-outline-variant/50 text-on-surface-variant font-label-sm text-[12px] rounded-full uppercase hover:border-tertiary/50 hover:text-tertiary transition-colors"
                    }
                    style={{ padding: '0.625rem 1.25rem' }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rounds Selector */}
            <div className="flex flex-col" style={{ gap: '1rem' }}>
              <label className="font-timer-mono text-[12px] text-on-surface-variant/60 uppercase tracking-widest">Number of Rounds</label>
              <div className="flex gap-4">
                {[3, 5, 7].map((n) => (
                  <button
                    key={n}
                    onClick={() => onUpdateSettings(category, n)}
                    className={
                      totalRounds === n
                        ? "bg-tertiary/20 border border-tertiary text-tertiary font-timer-mono text-[24px] w-14 h-14 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(107,211,253,0.2)]"
                        : "bg-surface-container/50 border border-outline-variant/50 text-on-surface-variant font-timer-mono text-[24px] w-14 h-14 rounded-xl flex items-center justify-center hover:border-tertiary/50 hover:text-tertiary transition-colors"
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
              className="mt-6 w-full py-5 rounded-xl font-display text-[3rem] md:text-[4rem] tracking-widest relative overflow-hidden flex justify-center items-center gap-4 leading-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-primary/20 border-2 border-primary text-primary hover:bg-primary/30 hover:shadow-[0_0_30px_rgba(255,84,74,0.3)]"
            >
              <span className="relative z-10 title-shimmer drop-shadow-md">{canStart ? 'START GAME' : 'WAITING...'}</span>
              {canStart && <span className="material-symbols-outlined text-5xl relative z-10">play_arrow</span>}
            </button>
          </section>
        ) : (
          <section className="w-full max-w-3xl glass-card border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shrink-0 mt-4" style={{ padding: '3rem', gap: '2rem' }}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tertiary/50 to-transparent"></div>
            <div className="w-full max-w-md">
              <EkgLine color="var(--color-tertiary)" animationDuration={2} height={50} />
            </div>
            <p className="font-timer-mono text-[1.5rem] text-tertiary uppercase tracking-widest text-center">
              WAITING FOR HOST TO START...
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
        <button onClick={() => alert('Stats coming soon!')} className="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">monitoring</span>
          <span className="font-label-sm text-[10px] mt-1 uppercase">Stats</span>
        </button>
        <button onClick={() => alert('Archive coming soon!')} className="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-sm text-[10px] mt-1 uppercase">Archive</span>
        </button>
        <button onClick={handleExit} className="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-sm text-[10px] mt-1 uppercase">Exit</span>
        </button>
      </nav>

      {/* SideNavBar - Desktop Left */}
      <nav 
        className="hidden md:flex fixed left-0 top-0 h-full z-40 flex-col bg-surface-container-lowest border-r border-outline-variant w-64"
        style={{ paddingTop: '5.5rem' }}
      >
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
          <div onClick={() => alert('Stats coming soon!')} className="flex items-center gap-4 py-3 text-on-surface-variant pl-4 hover:bg-surface-container-high hover:text-tertiary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">monitoring</span>
            <span className="font-label-sm text-label-sm uppercase">Stats</span>
          </div>
          <div onClick={() => alert('Archive coming soon!')} className="flex items-center gap-4 py-3 text-on-surface-variant pl-4 hover:bg-surface-container-high hover:text-tertiary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">history</span>
            <span className="font-label-sm text-label-sm uppercase">Archive</span>
          </div>
          <div onClick={handleExit} className="flex items-center gap-4 py-3 text-on-surface-variant pl-4 hover:bg-surface-container-high hover:text-tertiary transition-colors mt-auto cursor-pointer">
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
