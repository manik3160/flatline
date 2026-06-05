import type { CharacterType } from '@/types';

interface PlayerChipProps {
  name: string;
  character?: CharacterType;
  isHost: boolean;
  isActive?: boolean;
  score?: number;
  showScore?: boolean;
}

export function PlayerChip({
  name,
  character,
  isHost,
  isActive = true,
  score,
  showScore = false,
}: PlayerChipProps) {
  // Temporary mapping for images until we have all 4 generated.
  const imageUrls: Record<string, string> = {
    topper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2bTjcXZ77vPtByDLk626LOc4r3jNzvgPH32VUj7T5I0xzore0v34Xe7WQ6kuX5U7bU4jX-p4405nEza0BslLIILqnVa1aBgVmmS6sIcXQQPvwqPgTgnG474hc0pH0MROM3-QOoe5UdLXpHSklqLZuLZ0S7D5X2eSIQay0YFx3Z4nhuau94fRSka6NRJk2Mpt-LUEwhK1SyxFW517lVI6dz--PFdA-zKX4zmRvjhbkybXjWC2p6xPaOYooSuNPB76zdy7ET48j0k',
    jugaadu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFE7ST9b9drq63hql8aexpmG3zugN6XW8PdZlxX0vGQxlIQ9ZfKAPw7B1nSG4z99trFD3nJh-To_i79tGQ8Xri5zx5alc6OxmqfNk_neflabT6Es3Vp4IOLT0-kFrhzX-ig37chER5Ed2wgQT1yF5wrIrq4O5hHTP3kZA1A66qy9N-PBgRlsSqmptvVBwVGNrn0CB8J-oEhi_ks_vdtMvfAYMO9BMTfaApTL2ugEYPNn7IvQ_vYu_27ORSHDqGFqC5dktIhjIO4k',
    sharma_ji: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoxI-AIrP9n-A3MdpK-ZF35hZUhtBZUyFV3wMvxdeWHvCuZ6pN6KG36b82B3wKuTF8GrPxwwCHfTktwUxWa5XpwhV39QrD3lAAK36TRmzS_J-tQBwuEH-kc0Xk_dTXMlwkNfS-TNKpfn7NaG6SxLxij59GIjZORdmQ2pRAaxtXeYplzhe3SZYE_hlnPNZX2-OPIpK4YXKRUDhQXEVRKP1stV0jB2aTd9fKCERNcTbuDO2HY2y-cTUiWadlmqVSftGVG6o0CmoAY-M',
    it_uncle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXrcfufvOVYbV4h6LE6ttNelz5gik2hiskRD1iq3xGcAMtwm41sOZ9QmKdgUv13X_I5-qxF2i1qlDCAD_LQt1CYkonts1zny0crTJrfv90xQHF8D6yLznnffg3Dx8SXEYPbO8QARc1SRDM7yNcDPW16DCzzoHA-RMteEZYbbuk8chTnXAloGlGOL5mxB1OPZuCQdR2xJcHmQxzk3fNtddsGxpyf5G9qXc-xM0SRSMhklNVT-hMaUSAWo7__8Y43q6Ee5sAwbkNtFQ',
  };

  const getBorderColor = () => {
    if (isHost) return 'border-primary';
    return 'border-outline-variant';
  };

  return (
    <div className={`bg-surface-container border ${getBorderColor()} rounded-lg p-3 flex items-center gap-4 relative overflow-hidden group ${isActive ? '' : 'opacity-60'}`}>
      {isHost && (
        <>
          <div className="absolute inset-0 bg-primary opacity-5 group-hover:opacity-10 transition-opacity"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
        </>
      )}
      {!isHost && isActive && (
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
      )}
      
      {/* Character Image */}
      <div className="w-16 h-16 rounded-md bg-surface-container-highest border border-outline-variant overflow-hidden flex-shrink-0 relative flex items-center justify-center">
        {character ? (
          <img
            src={imageUrls[character]}
            alt={character}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <span className="material-symbols-outlined text-outline-variant text-3xl">person</span>
        )}
      </div>

      {/* Name and Status */}
      <div className="flex-grow flex flex-col justify-center">
        <div className="flex items-center gap-2">
          {isActive ? (
            <span className="font-body-base text-body-base text-on-surface font-semibold max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </span>
          ) : (
            <span className="font-body-base text-body-base text-on-surface-variant italic">Waiting...</span>
          )}
          {isHost && isActive && (
            <span className="bg-primary text-on-primary font-label-sm text-[10px] px-2 py-0.5 rounded-sm uppercase font-bold tracking-wider">Host</span>
          )}
        </div>
        
        {isActive && (
          <span className={`font-timer-mono text-[14px] ${isHost ? 'text-on-surface-variant' : 'text-tertiary'} mt-1 flex items-center justify-between`}>
            <span>Status: Ready</span>
            {showScore && score !== undefined && (
              <span className="text-jugaad font-bold ml-2">Score: {score}</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
