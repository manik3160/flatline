import { create } from 'zustand';
import type {
  GamePhase,
  ScenarioCategory,
  CharacterType,
  PlayerRow,
  VerdictResult,
  RoomRow,
} from '@/types';

interface GameStore {
  // Identity
  sessionId: string;
  playerId: string | null;
  playerName: string | null;
  character: CharacterType | null;
  isHost: boolean;

  // Room
  roomCode: string | null;
  roomId: string | null;
  category: ScenarioCategory;
  totalRounds: number;
  currentRound: number;
  roundDuration: number;

  // Players
  players: PlayerRow[];

  // Game phase
  phase: GamePhase;
  scenario: string | null;
  plotTwist: string | null;
  plotTwistRevealed: boolean;
  answerDeadline: number | null;
  plotTwistDeadline: number | null;

  // Current round
  myAnswer: string;
  hasSubmitted: boolean;
  submittedPlayerIds: string[];
  lifelineUsed: boolean;
  lifelineAdvice: string | null;

  // Verdicts
  verdictResults: VerdictResult[];
  sharmaJiAnswer: string | null;

  // Round ID
  currentRoundId: string | null;

  // Actions
  setPhase: (phase: GamePhase) => void;
  setMyAnswer: (text: string) => void;
  syncRoomData: (roomRow: Partial<RoomRow>) => void;
  setPlayers: (players: PlayerRow[]) => void;
  addPlayer: (player: PlayerRow) => void;
  updatePlayer: (player: Partial<PlayerRow> & { id: string }) => void;
  addSubmitted: (playerId: string) => void;
  setVerdicts: (results: VerdictResult[], sharmaJi: string) => void;
  markLifelineUsed: (advice: string) => void;
  setScenario: (scenario: string, plotTwist: string, roundId: string) => void;
  setPlotTwistRevealed: (revealed: boolean) => void;
  setIdentity: (data: {
    sessionId: string;
    playerId: string;
    playerName: string;
    character: CharacterType;
    isHost: boolean;
  }) => void;
  setRoom: (data: {
    roomCode: string;
    roomId: string;
    category: ScenarioCategory;
    totalRounds: number;
  }) => void;
  setRoundDuration: (duration: number) => void;
  setHasSubmitted: (submitted: boolean) => void;
  resetRound: () => void;
  reset: () => void;
}

const initialState = {
  sessionId: '',
  playerId: null as string | null,
  playerName: null as string | null,
  character: null as CharacterType | null,
  isHost: false,
  roomCode: null as string | null,
  roomId: null as string | null,
  category: 'mixed' as ScenarioCategory,
  totalRounds: 5,
  currentRound: 0,
  roundDuration: 75,
  players: [] as PlayerRow[],
  phase: 'LOBBY' as GamePhase,
  scenario: null as string | null,
  plotTwist: null as string | null,
  plotTwistRevealed: false,
  answerDeadline: null as number | null,
  plotTwistDeadline: null as number | null,
  myAnswer: '',
  hasSubmitted: false,
  submittedPlayerIds: [] as string[],
  lifelineUsed: false,
  lifelineAdvice: null as string | null,
  verdictResults: [] as VerdictResult[],
  sharmaJiAnswer: null as string | null,
  currentRoundId: null as string | null,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setPhase: (phase) => set({ phase }),

  setMyAnswer: (text) => set({ myAnswer: text }),

  syncRoomData: (roomRow) =>
    set((state) => ({
      currentRound: roomRow.current_round ?? state.currentRound,
      category: (roomRow.category as ScenarioCategory) ?? state.category,
      totalRounds: roomRow.total_rounds ?? state.totalRounds,
      answerDeadline: roomRow.answer_deadline
        ? new Date(roomRow.answer_deadline).getTime()
        : state.answerDeadline,
      plotTwistDeadline: roomRow.plot_twist_deadline
        ? new Date(roomRow.plot_twist_deadline).getTime()
        : state.plotTwistDeadline,
    })),

  setPlayers: (players) => set({ players }),

  addPlayer: (player) =>
    set((state) => ({
      players: state.players.some((p) => p.id === player.id)
        ? state.players
        : [...state.players, player],
    })),

  updatePlayer: (player) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === player.id ? { ...p, ...player } : p
      ),
    })),

  addSubmitted: (playerId) =>
    set((state) => ({
      submittedPlayerIds: state.submittedPlayerIds.includes(playerId)
        ? state.submittedPlayerIds
        : [...state.submittedPlayerIds, playerId],
    })),

  setVerdicts: (results, sharmaJi) =>
    set({ verdictResults: results, sharmaJiAnswer: sharmaJi }),

  markLifelineUsed: (advice) =>
    set({ lifelineUsed: true, lifelineAdvice: advice }),

  setScenario: (scenario, plotTwist, roundId) =>
    set({ scenario, plotTwist, currentRoundId: roundId, plotTwistRevealed: false }),

  setPlotTwistRevealed: (revealed) => set({ plotTwistRevealed: revealed }),

  setIdentity: (data) => set(data),

  setRoom: (data) => set(data),

  setRoundDuration: (duration) => set({ roundDuration: duration }),

  setHasSubmitted: (submitted) => set({ hasSubmitted: submitted }),

  resetRound: () =>
    set({
      myAnswer: '',
      hasSubmitted: false,
      submittedPlayerIds: [],
      lifelineAdvice: null,
      verdictResults: [],
      sharmaJiAnswer: null,
      plotTwistRevealed: false,
      scenario: null,
      plotTwist: null,
      currentRoundId: null,
    }),

  reset: () => set(initialState),
}));
