// ─── Scenario Categories ───
export type ScenarioCategory =
  | 'family_pressure'
  | 'college_life'
  | 'indian_streets'
  | 'monsoon_madness'
  | 'festival_chaos'
  | 'startup_it_life'
  | 'shaadi_season'
  | 'mixed';

// ─── Game Phases ───
export type GamePhase =
  | 'LOBBY'
  | 'COUNTDOWN'
  | 'SCENARIO'
  | 'ANSWERING'
  | 'PLOT_TWIST'
  | 'SUBMITTED'
  | 'JUDGING'
  | 'VERDICT_REVEAL'
  | 'SHARMA_JI'
  | 'ROUND_SCORES'
  | 'GAME_OVER';

// ─── Characters ───
export type CharacterType = 'topper' | 'jugaadu' | 'sharma_ji' | 'it_uncle';

export interface CharacterDef {
  type: CharacterType;
  name: string;
  emoji: string;
  ability: string;
  description: string;
}

// ─── Verdict Tiers ───
export type VerdictTier = 'JUGAAD' | 'BACH_GAYA' | 'BARBAD' | 'ANTIM_SANSKAR';

export interface VerdictResult {
  playerId: string;
  playerName: string;
  character: CharacterType;
  verdict: VerdictTier;
  points: number;
  narration: string;
  roastText?: string;
}

// ─── Database Row Types ───
export interface RoomRow {
  id: string;
  code: string;
  host_session_id: string;
  status: 'lobby' | 'playing' | 'finished';
  category: ScenarioCategory;
  total_rounds: number;
  current_round: number;
  answer_deadline: string | null;
  plot_twist_deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerRow {
  id: string;
  room_id: string;
  session_id: string;
  name: string;
  character: CharacterType;
  score: number;
  is_host: boolean;
  lifeline_used: boolean;
  is_active: boolean;
  created_at: string;
}

export interface RoundRow {
  id: string;
  room_id: string;
  round_number: number;
  category: string;
  scenario: string;
  plot_twist: string;
  sharma_ji_answer: string | null;
  created_at: string;
}

export interface AnswerRow {
  id: string;
  round_id: string;
  player_id: string;
  answer_text: string;
  verdict: VerdictTier | null;
  points_awarded: number;
  narration: string | null;
  roast_text: string | null;
  submitted_at: string;
}

// ─── Broadcast Events ───
export type BroadcastEvent =
  | { event: 'PHASE_CHANGE'; payload: { phase: GamePhase; roomData: RoomRow } }
  | { event: 'PLOT_TWIST_REVEAL'; payload: { plotTwist: string } }
  | { event: 'PLAYER_SUBMITTED'; payload: { playerId: string; name: string } }
  | { event: 'SHARMA_JI_PEEK'; payload: { targetPlayerId: string; answerPreview: string } }
  | { event: 'LIFELINE_USED'; payload: { playerId: string; adviceText: string } }
  | { event: 'VERDICT_REVEAL'; payload: { answers: VerdictResult[]; sharmaJiAnswer: string } }
  | { event: 'NEXT_ROUND'; payload: { roundNumber: number } }
  | { event: 'GAME_OVER'; payload: { finalScores: PlayerScore[] } };

export interface PlayerScore {
  playerId: string;
  playerName: string;
  character: CharacterType;
  score: number;
  rank: number;
}

// ─── API Request/Response Types ───
export interface GenerateScenarioRequest {
  category: ScenarioCategory;
  roomCode: string;
  roundNumber: number;
  playersCount: number;
}

export interface GenerateScenarioResponse {
  scenario: string;
  plotTwist: string;
  category: string;
}

export interface JudgeRequest {
  roundId: string;
  scenario: string;
  plotTwist: string;
  answers: Array<{
    playerId: string;
    playerName: string;
    character: string;
    answerText: string;
    usedLifeline: boolean;
  }>;
}

export interface JudgeResponse {
  results: Array<{
    playerId: string;
    verdict: VerdictTier;
    points: number;
    narration: string;
    roastText?: string;
  }>;
  sharmaJiAnswer: string;
}

export interface LifelineRequest {
  scenario: string;
  plotTwist: string;
  playerName: string;
}

export interface LifelineResponse {
  advice: string;
}

// ─── Presence ───
export interface PresenceState {
  playerId: string;
  name: string;
  character: string;
  isHost: boolean;
  online_at: string;
}
