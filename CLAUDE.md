# FLATLINE — AI Survival Party Game (Desi Edition)
> Complete build specification for Claude Code. Read this entire file before writing a single line of code.

---

## 1. PROJECT VISION

**Flatline** is a real-time multiplayer AI party game for Indian GenZ friend groups — web + mobile PWA. Players are dropped into chaotic desi scenarios ("your professor just caught you using ChatGPT for the assignment you submitted 10 minutes ago") and must type a survival response in 75 seconds. A Hinglish-speaking AI judges every answer simultaneously and delivers dramatic verdicts. The game has a medical/EKG flatline aesthetic — dark, tense, with color explosions on verdicts.

**Core differentiator vs Death by AI (deathbyai.gg):**
- Scenarios are deeply Indian/desi — culturally native, not translated
- AI narrator speaks authentic Hinglish (not Google Translate Hindi)
- Plot twist mechanic drops mid-round — scenario changes 30s in
- Sharma Ji Ka Beta reveal after every round (perfect answer comparison)
- 4-tier verdict system with escalating roast levels
- Character abilities (passive, meaningful)

**Target audience:** Indian GenZ, 18–25, playing in friend groups, hostel rooms, Discord calls.

**Platforms:** Web (desktop/tablet) + PWA (installable on Android/iOS home screen). ONE codebase — Next.js 15.

**Monetization:** Free forever. No ads, no paywalls. Growth via WhatsApp sharing of verdict cards.

---

## 2. TECH STACK

### Exact packages to install

```bash
# Core
npx create-next-app@latest flatline --typescript --tailwind --app --src-dir

# Supabase (realtime + DB)
npm install @supabase/supabase-js @supabase/ssr

# AI — Gemini 2.0 Flash (FREE tier: 1500 req/day — sufficient for party game)
npm install @ai-sdk/google ai
# Alternative if switching to OpenAI GPT-4o-mini (paid but cheap):
# npm install @ai-sdk/openai ai

# State management
npm install zustand

# Animations
npm install framer-motion

# UI components
npm install @radix-ui/react-dialog @radix-ui/react-progress lucide-react

# Shareable card generation (verdict card PNG for WhatsApp)
npm install satori @resvg/resvg-js

# PWA
npm install next-pwa

# Utilities
npm install nanoid clsx tailwind-merge
npm install --save-dev @types/node
```

### Why these choices
- **Next.js 15 App Router** — web + PWA in one codebase. API routes handle AI calls (keeps API keys server-side). Server components for static screens.
- **Supabase Realtime** — Broadcast + Presence channels replace Socket.IO entirely. Free tier is generous. You already have a Supabase account from DraftVidhi.
- **Gemini 2.0 Flash** — completely free, extremely fast (low latency matters for game judging), handles Hinglish naturally. Vercel AI SDK wraps it so swapping to OpenAI is 2 lines.
- **Zustand** — lightweight client state for game phase, players list, timer. No Redux overhead.
- **Framer Motion** — verdict reveal animations are the emotional peak of the game. Needs proper animation library.
- **Satori** — generates verdict card PNG server-side (React → SVG → PNG). WhatsApp + Instagram shareable.
- **next-pwa** — wraps Next.js with service worker. Installable on Android home screen. Works offline for non-game screens.

---

## 3. DESIGN SYSTEM

### Aesthetic direction: "ICU Panic"
Medical EKG flatline as the base metaphor — dark, high-stakes, clinical. But when verdicts drop, the UI explodes with color. Think: dark hospital monitor meets Bollywood drama. NOT generic purple-gradient gaming UI.

### Color palette (CSS variables in globals.css)
```css
:root {
  --bg-void: #080808;          /* near-black, main background */
  --bg-surface: #111111;       /* card surfaces */
  --bg-elevated: #1a1a1a;      /* modals, elevated elements */
  --border: #242424;           /* default borders */
  --border-glow: #ff2d2d33;    /* red glow borders */

  --red-flatline: #ff2d2d;     /* primary accent — the EKG line */
  --red-soft: #ff2d2d1a;       /* red tint backgrounds */
  --gold-jugaad: #ffd700;      /* JUGAAD verdict — highest honor */
  --green-bach: #22c55e;       /* BACH GAYA verdict */
  --orange-barbad: #f97316;    /* BARBAD verdict */
  --purple-antim: #a855f7;     /* ANTIM SANSKAR verdict — chaos */

  --text-primary: #f5f5f5;
  --text-secondary: #888888;
  --text-muted: #444444;

  /* Verdict glow colors */
  --glow-jugaad: 0 0 40px #ffd70066;
  --glow-bach: 0 0 40px #22c55e44;
  --glow-barbad: 0 0 40px #f9731644;
  --glow-antim: 0 0 60px #a855f766, 0 0 120px #a855f733;
}
```

### Typography
```css
/* Display font — dramatic, unique, Indian drama energy */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=Geist+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

--font-display: 'Bebas Neue', cursive;      /* Verdict text, timers, score numbers */
--font-serif: 'DM Serif Display', serif;    /* Scenario text — dramatic reading moment */
--font-mono: 'Geist Mono', monospace;       /* Room codes, EKG elements, countdowns */
--font-body: 'Plus Jakarta Sans', sans-serif; /* UI, labels, player names */
```

### EKG line animation (must appear on waiting/loading states)
```css
/* SVG path that draws and flatlines — use in loading states */
@keyframes ekg-draw {
  0% { stroke-dashoffset: 1000; }
  60% { stroke-dashoffset: 0; }
  80% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0.3; }
}
```

### Key UI rules
- Background always `--bg-void`. Never white. Never light mode.
- Red flatline accent used SPARINGLY — timer bar, active states, logo. Over-using it kills impact.
- Cards have `border: 1px solid var(--border)` with subtle `backdrop-filter: blur(8px)`.
- Verdict reveals use full-screen color flash then settle to verdict card.
- Mobile-first. Max width 430px for game screens (phone viewport). Desktop centers with side decoration (EKG pattern).
- All text in `--text-primary`. Secondary info in `--text-secondary`.
- NO rounded-full pill buttons. Use `border-radius: 6px` for buttons. Sharp, clinical.

---

## 4. GAME DESIGN SPECIFICATION

### 4.1 Characters (player picks one on joining)

| Character | Avatar Emoji | Passive Ability |
|-----------|-------------|-----------------|
| **The Topper** | 🎓 | Once per game: after the AI judges but BEFORE verdict displays, can resubmit one answer. AI re-judges. |
| **The Jugaadu** | 🔧 | All verdict tiers +1 tier (BARBAD→BACH GAYA, BACH GAYA→JUGAAD). Can never get ANTIM SANSKAR. |
| **Sharma Ji Ka Beta** | 📚 | Can read ONE other player's submitted answer before the timer ends. But the AI holds their own answers to a harsher standard (+20% harder judging prompt). |
| **The IT Uncle** | 💻 | Immune to "Startup/IT Life" category scenarios — if drawn, their scenario is rerolled from a different category. |

Character abilities are managed client-side logic + server-side ability flag in the judging API call. The Topper ability triggers a second `/api/judge` call. Sharma Ji Ka Beta's peek is a Supabase Realtime broadcast (only to their socket, encrypted by player ID).

### 4.2 Scenario Categories (host picks before game)

```typescript
type ScenarioCategory =
  | 'family_pressure'   // "Your naani just found your dating app..."
  | 'college_life'      // "Your professor called you out mid-class..."
  | 'indian_streets'    // "You're on a scooter, no helmet, cop ahead..."
  | 'monsoon_madness'   // "Mumbai rains, knee-deep water, 3% battery..."
  | 'festival_chaos'    // "Holi powder in your eyes, crowd pushing..."
  | 'startup_it_life'   // "Your startup's server crashed 5 min before investor demo..."
  | 'shaadi_season'     // "Relative is asking salary at the wedding in front of everyone..."
  | 'mixed'             // Random — AI picks any category each round
```

Default: `mixed`. Host can lock to a specific category for the whole game.

### 4.3 Verdict Tiers

| Tier | Points | Color | Meaning |
|------|--------|-------|---------|
| **JUGAAD** 🔥 | 3 pts | Gold | Survived with desi genius. Creative, resourceful, very Indian. |
| **BACH GAYA** 😅 | 1 pt | Green | Survived. Barely. Not impressive but alive. |
| **BARBAD** 💀 | 0 pts | Orange | Perished. The plan was bad. |
| **ANTIM SANSKAR** ☠️ | 0 pts | Purple | Perished so catastrophically the AI writes a 3-sentence roast about their specific answer, ending with what Sharma Ji Ka Beta would have done instead. |

### 4.4 Game States (exact enum)

```typescript
type GamePhase =
  | 'LOBBY'           // Players joining, host configuring
  | 'COUNTDOWN'       // 3-2-1 before scenario reveals (3 seconds)
  | 'SCENARIO'        // Scenario displayed, players reading (5 seconds, no input yet)
  | 'ANSWERING'       // 75s timer, players typing. Plot twist fires at 30s remaining.
  | 'PLOT_TWIST'      // Visual: plot twist banner overlays, text changes. 3s animation.
  | 'SUBMITTED'       // All answers in (or timer hit 0). "AI is judging..." loading.
  | 'JUDGING'         // API call in progress. EKG animation plays. 3-8 seconds.
  | 'VERDICT_REVEAL'  // Verdicts revealed one player at a time with animation.
  | 'SHARMA_JI'       // Show Sharma Ji Ka Beta's "perfect answer". Host taps to advance.
  | 'ROUND_SCORES'    // Scoreboard after round. Host taps "Next Round."
  | 'GAME_OVER'       // Final scores. Shareable cards generated. Play again option.
```

### 4.5 Round Timer Architecture

**CRITICAL — no timer drift across devices:**

When game enters `ANSWERING` phase, the host client calls Supabase to update the room row:
```sql
UPDATE rooms SET
  answer_deadline = NOW() + INTERVAL '75 seconds',
  plot_twist_deadline = NOW() + INTERVAL '45 seconds'  -- 30s into the timer
WHERE code = $1
```

All clients (including host) compute `Math.ceil((answer_deadline - Date.now()) / 1000)` every second via `setInterval`. This is server-timestamp-based — no drift. No "host is the timer source" fragility.

Plot twist fires when `Date.now() >= plot_twist_deadline`. The plot twist text was already generated alongside the scenario (one AI call returns both). Client just reveals it at the right timestamp.

Timer auto-submits empty string if player hasn't typed anything — player gets BARBAD by default for empty answer.

### 4.6 Special Mechanics

#### Plot Twist
Generated alongside scenario in the same AI call. Stored in `rounds.plot_twist`. Revealed client-side when `Date.now() >= plot_twist_deadline`. The plot twist MODIFIES the scenario (doesn't replace it). Example:
- Scenario: "You're in an exam hall with a blank answer sheet. 10 minutes left."
- Plot Twist: "🔄 TWIST: The invigilator just stepped out. And your friend across the aisle is waving their paper at you."
Players can update their submitted answers after the twist (the input becomes editable again briefly for 20 seconds).

#### Sharma Ji Ka Beta
After every VERDICT_REVEAL phase, AI reveals what "Sharma Ji Ka Beta" would have done — the theoretically perfect Hinglish answer to the scenario + plot twist. Displayed as a character card with his smug avatar. Players see this before scoreboard. It's informational/comedic — no gameplay effect except the `Sharma Ji Ka Beta` character who is judged against this standard.

#### Call Mummy (lifeline)
Each player gets ONE use per game. Available during ANSWERING phase. Player taps "📞 Call Mummy." A modal pops: the AI generates a short "mom's advice" response in dramatic Hinglish. This is a hint framed as overprotective mom advice. Using it gives a +0.5 tier boost on AI judging (baked into the judging prompt: "this player called their mummy for advice, be 10% more lenient"). 

Tracked in player's Zustand state and in `players.lifeline_used` (boolean in DB).

---

## 5. DATABASE SCHEMA

Run this SQL in Supabase SQL editor to initialize:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rooms
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code CHAR(5) UNIQUE NOT NULL,          -- e.g. "AB3K9"
  host_session_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'lobby',  -- lobby | playing | finished
  category TEXT NOT NULL DEFAULT 'mixed',
  total_rounds INT NOT NULL DEFAULT 5,
  current_round INT NOT NULL DEFAULT 0,
  answer_deadline TIMESTAMPTZ,
  plot_twist_deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Players
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,              -- localStorage UUID, ties player to browser
  name TEXT NOT NULL,
  character TEXT NOT NULL,              -- topper | jugaadu | sharma_ji | it_uncle
  score INT NOT NULL DEFAULT 0,
  is_host BOOLEAN NOT NULL DEFAULT FALSE,
  lifeline_used BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rounds
CREATE TABLE rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  round_number INT NOT NULL,
  category TEXT NOT NULL,
  scenario TEXT NOT NULL,
  plot_twist TEXT NOT NULL,
  sharma_ji_answer TEXT,                -- filled after judging
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Answers
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  round_id UUID REFERENCES rounds(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL DEFAULT '',
  verdict TEXT,                          -- JUGAAD | BACH_GAYA | BARBAD | ANTIM_SANSKAR
  points_awarded INT NOT NULL DEFAULT 0,
  narration TEXT,                        -- AI's Hinglish narration of the verdict
  roast_text TEXT,                       -- Only for ANTIM_SANSKAR
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(round_id, player_id)
);

-- Row Level Security (important — players can only read their own room)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Policies: allow all reads/writes via anon key (game uses no auth)
CREATE POLICY "Allow all" ON rooms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON players FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON rounds FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON answers FOR ALL USING (true) WITH CHECK (true);

-- Realtime: enable for rooms and players (game state sync)
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE players;
ALTER PUBLICATION supabase_realtime ADD TABLE answers;
```

---

## 6. SUPABASE REALTIME ARCHITECTURE

Use **Broadcast** (ephemeral events) + **Presence** (who's online) + **Postgres Changes** (DB state sync).

### Channel naming
One channel per room: `room:${roomCode}` — all players subscribe to this on joining.

### Event types (Broadcast)

```typescript
// All events use this structure
type BroadcastEvent =
  | { event: 'PHASE_CHANGE'; payload: { phase: GamePhase; roomData: RoomRow } }
  | { event: 'PLOT_TWIST_REVEAL'; payload: { plotTwist: string } }
  | { event: 'PLAYER_SUBMITTED'; payload: { playerId: string; name: string } }
  | { event: 'SHARMA_JI_PEEK'; payload: { targetPlayerId: string; answerPreview: string } } // encrypted
  | { event: 'LIFELINE_USED'; payload: { playerId: string; adviceText: string } }
  | { event: 'VERDICT_REVEAL'; payload: { answers: AnswerWithPlayer[]; sharmaJiAnswer: string } }
  | { event: 'NEXT_ROUND'; payload: { roundNumber: number } }
  | { event: 'GAME_OVER'; payload: { finalScores: PlayerScore[] } }
```

### Presence (who's in the room)
```typescript
// On joining, track presence
channel.track({
  playerId: string,
  name: string,
  character: string,
  isHost: boolean,
  online_at: new Date().toISOString()
})

// Listen for joins/leaves
channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState()
  // update players list in Zustand
})
```

### Postgres Changes (DB sync)
```typescript
// Subscribe to rooms table for game phase changes
supabase
  .channel('room-db-changes')
  .on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `code=eq.${roomCode}` },
    (payload) => {
      // Sync timer deadlines, status, current_round to all clients
      useGameStore.getState().syncRoomData(payload.new)
    }
  )
  .subscribe()
```

---

## 7. FILE STRUCTURE

```
flatline/
├── CLAUDE.md                         ← this file
├── next.config.ts                    ← PWA config here
├── public/
│   ├── manifest.json                 ← PWA manifest
│   ├── icons/                        ← PWA icons (192, 512)
│   └── ekg-pattern.svg               ← EKG decorative pattern for desktop sidebar
├── src/
│   ├── app/
│   │   ├── layout.tsx                ← Root layout: fonts, global CSS, Supabase provider
│   │   ├── globals.css               ← Design system CSS variables + base styles
│   │   ├── page.tsx                  ← Home screen (create/join room)
│   │   ├── room/
│   │   │   └── [code]/
│   │   │       └── page.tsx          ← Main game screen (all phases render here)
│   │   └── api/
│   │       ├── generate-scenario/
│   │       │   └── route.ts          ← POST: generates scenario + plot twist via AI
│   │       ├── judge/
│   │       │   └── route.ts          ← POST: judges all answers, returns verdicts
│   │       ├── lifeline/
│   │       │   └── route.ts          ← POST: generates Call Mummy advice
│   │       └── verdict-card/
│   │           └── route.ts          ← GET: generates PNG card via Satori
│   ├── components/
│   │   ├── game/
│   │   │   ├── LobbyScreen.tsx       ← Player list, character select, host settings
│   │   │   ├── CountdownScreen.tsx   ← 3-2-1 animated countdown
│   │   │   ├── ScenarioScreen.tsx    ← Scenario reveal (5s read-only)
│   │   │   ├── AnsweringScreen.tsx   ← Timer + textarea + submit + lifeline button
│   │   │   ├── PlotTwistBanner.tsx   ← Full-screen overlay when twist fires
│   │   │   ├── JudgingScreen.tsx     ← EKG animation + "AI is deciding your fate..."
│   │   │   ├── VerdictReveal.tsx     ← Animated verdict cards, one player at a time
│   │   │   ├── SharmaJiReveal.tsx    ← Sharma Ji Ka Beta card
│   │   │   ├── RoundScores.tsx       ← Scoreboard between rounds
│   │   │   └── GameOver.tsx          ← Final scores + share button
│   │   ├── ui/
│   │   │   ├── EkgLine.tsx           ← Animated SVG EKG component
│   │   │   ├── VerdictCard.tsx       ← Individual verdict display card
│   │   │   ├── PlayerChip.tsx        ← Player avatar + name chip
│   │   │   ├── TimerBar.tsx          ← Red progress bar, turns urgent at <15s
│   │   │   ├── RoomCodeDisplay.tsx   ← Large monospace room code
│   │   │   └── CharacterCard.tsx     ← Character selection card
│   │   └── providers/
│   │       └── SupabaseProvider.tsx  ← Supabase client context
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             ← Browser Supabase client (singleton)
│   │   │   ├── server.ts             ← Server Supabase client (for API routes)
│   │   │   └── realtime.ts           ← Channel setup, broadcast helpers
│   │   ├── ai/
│   │   │   ├── prompts.ts            ← ALL AI prompts (see Section 9)
│   │   │   └── client.ts             ← Vercel AI SDK setup (Gemini/OpenAI)
│   │   ├── game/
│   │   │   ├── roomCode.ts           ← Generate unique 5-char alphanumeric codes
│   │   │   ├── scoring.ts            ← Verdict → points logic + character modifiers
│   │   │   └── characters.ts         ← Character definitions + ability logic
│   │   └── utils.ts                  ← cn(), formatTime(), sessionId helpers
│   ├── store/
│   │   └── gameStore.ts              ← Zustand store (see Section 10)
│   └── types/
│       └── index.ts                  ← All TypeScript types
```

---

## 8. API ROUTES (detailed spec)

### POST /api/generate-scenario

**Request:**
```typescript
{
  category: ScenarioCategory,
  roomCode: string,
  roundNumber: number,
  playersCount: number
}
```

**Response:**
```typescript
{
  scenario: string,        // 2-3 sentences max, vivid and desi
  plotTwist: string,       // 1 sentence that modifies the scenario
  category: string         // which category was actually used
}
```

**Logic:**
1. Call Gemini with the `SCENARIO_GENERATION_PROMPT` (see Section 9).
2. Parse JSON response.
3. Insert into `rounds` table.
4. Broadcast `PHASE_CHANGE` with phase `SCENARIO`.
5. Update `rooms.status = 'playing'`, `rooms.current_round = roundNumber`.
6. Return scenario + plotTwist.

### POST /api/judge

**Request:**
```typescript
{
  roundId: string,
  scenario: string,
  plotTwist: string,
  answers: Array<{
    playerId: string,
    playerName: string,
    character: string,
    answerText: string,
    usedLifeline: boolean
  }>
}
```

**Response:**
```typescript
{
  results: Array<{
    playerId: string,
    verdict: 'JUGAAD' | 'BACH_GAYA' | 'BARBAD' | 'ANTIM_SANSKAR',
    points: number,
    narration: string,        // 1-2 sentences Hinglish
    roastText?: string        // only for ANTIM_SANSKAR — 3 sentence roast
  }>,
  sharmaJiAnswer: string      // Sharma Ji Ka Beta's perfect answer
}
```

**Logic:**
1. Call Gemini with `JUDGING_PROMPT` (all answers in one call — batch judging).
2. Apply character modifiers: Jugaadu gets +1 tier, Sharma Ji Ka Beta gets harsher judging.
3. Apply lifeline modifier: +10% leniency in judging prompt.
4. Update `answers` table for each player.
5. Update `players.score += points` for each player.
6. Update `rounds.sharma_ji_answer`.
7. Broadcast `VERDICT_REVEAL` with full results.

### POST /api/lifeline

**Request:**
```typescript
{ scenario: string, plotTwist: string, playerName: string }
```

**Response:**
```typescript
{ advice: string }  // Mom's dramatic Hinglish advice, 2-3 sentences
```

### GET /api/verdict-card

**Query params:** `playerId`, `roundId`

**Response:** PNG image (via Satori + resvg)

**Card design:**
- Dark background with EKG line decoration
- Player name + character emoji
- Verdict tier (big, colored)
- AI narration text
- "FLATLINE" logo bottom right
- Aspect ratio 9:16 (Instagram story) AND 1:1 (WhatsApp DP)
- Return both via `?format=story` and `?format=square`

---

## 9. AI PROMPT ENGINEERING ⚡ (MOST IMPORTANT SECTION)

This is the soul of the game. Read every word. These prompts define Flatline's personality.

### 9.1 AI Client Setup (src/lib/ai/client.ts)

```typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google'

// PRIMARY: Gemini 2.0 Flash — FREE tier
export const ai = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY!,
})
export const model = ai('gemini-2.0-flash')

// To switch to OpenAI (paid, minimal change):
// import { createOpenAI } from '@ai-sdk/openai'
// export const ai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! })
// export const model = ai('gpt-4o-mini')
```

### 9.2 Scenario Generation Prompt

```typescript
// src/lib/ai/prompts.ts

export const SCENARIO_SYSTEM_PROMPT = `
You are the AI game master for FLATLINE — a survival party game for Indian GenZ.
Your personality: wickedly creative, culturally sharp, speaks in English with natural Hinglish flair.
You KNOW Indian culture deeply — family pressure, hostel life, Mumbai rains, desi weddings, CBSE trauma, IT jobs, chai breaks.

Your job: Generate impossible but hilariously relatable survival scenarios that put players in chaotic desi situations.
The scenarios must feel INSTANTLY RECOGNIZABLE to any Indian 18-25 year old.

SCENARIO RULES:
- 2-3 sentences maximum
- Present tense, second person ("You are..." / "You're...")
- Specific detail makes it funny — not "stuck in traffic" but "stuck in traffic on a flyover, 42°C, AC stopped, boss calling every 3 minutes"
- Never generic Western scenarios (no "zombie apocalypse", no "sinking ship")
- Always grounded in real Indian life — the mundane made terrifying
- End with a clear survival challenge implicit in the scenario

PLOT TWIST RULES:
- 1 sentence that COMPLICATES the scenario (doesn't replace it)
- Fires 30 seconds after scenario starts
- Must feel like genuine bad luck — something very Indian
- Examples: "Bijli chali gayi.", "Your rickshaw driver just recognized you from a meme.", "Sharma Ji Ka Beta just walked in."

OUTPUT FORMAT: Respond ONLY with valid JSON, no markdown, no explanation:
{
  "scenario": "...",
  "plotTwist": "..."
}
`

export function buildScenarioUserPrompt(category: string, roundNumber: number): string {
  const categoryContext: Record<string, string> = {
    family_pressure: 'Family situations — parents, relatives, rishtas, report cards, phone checks, emotional blackmail',
    college_life: 'College/university — professors, exams, attendance, hostels, assignments, college politics',
    indian_streets: 'Indian streets and transport — autos, buses, traffic, petrol pumps, road rage, cops',
    monsoon_madness: 'Indian monsoon chaos — Mumbai floods, power cuts, waterlogged roads, phones dying',
    festival_chaos: 'Indian festivals — Holi, Diwali, weddings, navratri crowds, prasad obligations',
    startup_it_life: 'Startup/IT culture — standups, deadlines, server crashes, Jira tickets, toxic managers',
    shaadi_season: 'Wedding season — relative interrogations, baraat chaos, DJ demands, shaadi food disasters',
    mixed: 'Any of the above — pick the most unexpectedly funny category for round ' + roundNumber,
  }

  return `Category: ${categoryContext[category] || categoryContext.mixed}
Round: ${roundNumber}

Generate a scenario and plot twist. Make it specific, relatable, and genuinely difficult to survive. The funnier the situation, the better.`
}
```

### 9.3 Judging Prompt (THE MOST CRITICAL PROMPT)

```typescript
export const JUDGING_SYSTEM_PROMPT = `
You are FLATLINE's AI judge — ruthless, hilarious, deeply desi. You speak Hinglish naturally.
Your job: Judge each player's survival plan against a chaotic Indian scenario and deliver verdicts.

VERDICT TIERS (assign ONE per player):
- JUGAAD: The answer shows genuine desi resourcefulness. Creative, uses available Indian resources cleverly. Survives with style.
- BACH_GAYA: The plan would technically work but barely. Not impressive. Survives by luck or minimum effort.
- BARBAD: The plan fails. Bad logic, impractical, ignores the obvious. Perished.
- ANTIM_SANSKAR: The plan is so catastrophically wrong it's almost impressive. Reserved for truly terrible answers, blank answers, or answers that make things actively worse.

JUDGING RULES:
1. Judge the QUALITY of the survival plan, not grammar or language (Hindi, English, Hinglish all fine)
2. Give credit for genuine creativity and desi jugaad thinking
3. Be harsh but fair — don't give JUGAAD for generic answers
4. ANTIM_SANSKAR is rare — only for genuinely terrible/blank/nonsensical plans
5. Consider the specific constraints of the Indian scenario (limited resources, Indian context)
6. For players who used the "Call Mummy" lifeline: be 10% more lenient in judging
7. For "Sharma Ji Ka Beta" character players: be 15% harsher (higher standard expected)

NARRATION STYLE:
- 1-2 sentences per verdict, Hinglish, conversational
- JUGAAD narration: impressed, slightly surprised, energetic ("Bhai, ek dum solid! Who thought of this?")
- BACH_GAYA narration: dry, slightly underwhelmed ("Theek hai... survived but barely. Jugaad nahi yeh toh.")
- BARBAD narration: disappointed, slightly roasting ("Yaar... this was the plan? RIP.")
- ANTIM_SANSKAR narration: full roast mode. 3 sentences. Specific to THEIR answer. End with what Sharma Ji Ka Beta did instead.

SHARMA JI KA BETA — generate the theoretically perfect answer after judging everyone.
This is what the "ideal Indian student" (overachiever, never makes mistakes) would have done.
Make it annoyingly correct and specific. Slight smugness in tone is intentional.

OUTPUT FORMAT: Respond ONLY with valid JSON, no markdown:
{
  "results": [
    {
      "playerId": "...",
      "verdict": "JUGAAD" | "BACH_GAYA" | "BARBAD" | "ANTIM_SANSKAR",
      "narration": "...",
      "roastText": "..." // Only include for ANTIM_SANSKAR
    }
  ],
  "sharmaJiAnswer": "..."
}
`

export function buildJudgingUserPrompt(
  scenario: string,
  plotTwist: string,
  answers: Array<{ playerId: string; playerName: string; character: string; answerText: string; usedLifeline: boolean }>
): string {
  const answersBlock = answers.map(a => `
Player ID: ${a.playerId}
Player Name: ${a.playerName}
Character: ${a.character} ${a.character === 'sharma_ji' ? '(JUDGE HARSHER — 15% stricter standard)' : ''}
Used Lifeline: ${a.usedLifeline ? 'YES — be 10% more lenient' : 'NO'}
Their Answer: "${a.answerText || '[NO ANSWER — automatic ANTIM_SANSKAR]'}"
`).join('\n---\n')

  return `SCENARIO: ${scenario}

PLOT TWIST (that happened mid-round): ${plotTwist}

PLAYER ANSWERS TO JUDGE:
${answersBlock}

Judge each player. Generate Sharma Ji Ka Beta's perfect answer for this exact scenario + plot twist combination.`
}
```

### 9.4 Call Mummy Prompt

```typescript
export const LIFELINE_SYSTEM_PROMPT = `
You are the player's Indian mom. Dramatic, loving, slightly guilt-tripping.
You're giving survival advice but framing everything through the lens of:
- "Log kya kahenge?" (What will people say?)
- Mentioning relatives unnecessarily
- Ending with something about food or rest

Speak in Hinglish — warm, slightly panicked, very desi mom energy.
Keep it to 2-3 sentences. The advice should actually be USEFUL but wrapped in mom drama.
`

export function buildLifelinePrompt(scenario: string, plotTwist: string): string {
  return `Your child is in this situation:
${scenario}
And then: ${plotTwist}

Give them survival advice as their Indian mom. Useful advice, mom tone, 2-3 sentences.`
}
```

---

## 10. ZUSTAND STORE (src/store/gameStore.ts)

```typescript
import { create } from 'zustand'

interface GameStore {
  // Identity
  sessionId: string          // localStorage UUID — persists across refreshes
  playerId: string | null
  playerName: string | null
  character: string | null
  isHost: boolean

  // Room
  roomCode: string | null
  roomId: string | null
  category: ScenarioCategory
  totalRounds: number
  currentRound: number

  // Players
  players: PlayerRow[]

  // Game phase
  phase: GamePhase
  scenario: string | null
  plotTwist: string | null
  answerDeadline: number | null    // Unix timestamp
  plotTwistDeadline: number | null // Unix timestamp

  // Current round
  myAnswer: string
  hasSubmitted: boolean
  submittedPlayerIds: string[]
  lifelineUsed: boolean
  lifelineAdvice: string | null

  // Verdicts
  verdictResults: VerdictResult[]
  sharmaJiAnswer: string | null

  // Actions
  setPhase: (phase: GamePhase) => void
  setMyAnswer: (text: string) => void
  syncRoomData: (roomRow: RoomRow) => void
  addSubmitted: (playerId: string) => void
  setVerdicts: (results: VerdictResult[], sharmaJi: string) => void
  markLifelineUsed: (advice: string) => void
  reset: () => void
}
```

---

## 11. UI SCREENS — DETAILED SPEC

### Screen: Home (app/page.tsx)
- Full viewport dark background with animated EKG line across the middle
- "FLATLINE" in `--font-display` Bebas Neue, huge, red, with subtle pulse animation
- Tagline: "Survive the chaos. Or don't." in italic DM Serif Display
- Two cards side by side (mobile: stacked):
  - CREATE ROOM: name input → character select → category select → "CREATE"
  - JOIN ROOM: name input → character select → 5-char code input → "JOIN"
- On submit: validate → API call → redirect to `/room/[code]`
- Character select: 2x2 grid of `CharacterCard` components. Click to select (one at a time). Show ability on hover/tap.

### Screen: Lobby (/room/[code])
- Room code displayed large in monospace (RoomCodeDisplay component)
- "Share this code with friends" with copy button
- Player list: each player shows name, character emoji, "HOST" badge if host
- Host sees: category selector, rounds selector (3/5/7), "START GAME" button
- Guests see: "Waiting for host to start..." with EKG animation
- Min players to start: 2. Show error if host tries to start with 1.
- Real-time updates via Supabase Presence.

### Screen: Countdown
- Full screen. Numbers 3 → 2 → 1 → "SURVIVE" in massive Bebas Neue
- Each number: scale from 2x → 1x with red flash
- 1 second per count. Framer Motion `AnimatePresence`.

### Screen: Scenario (5s read-only)
- Scenario text in DM Serif Display, centered, large, dramatic
- "ROUND X of Y" badge top left
- Category badge top right (Family Pressure, etc.)
- Bottom: "Reading time... answering starts in X" countdown
- No input yet. Just read.

### Screen: Answering
- Top: timer bar (full width, red, depletes). Turns orange at 20s, flashes red at 10s.
- Timer number in Geist Mono, large.
- Scenario text (smaller, above input) — stays visible
- Plot twist banner (hidden initially): purple/red animated banner that slides in at 30s mark
- Large textarea: "Type your survival plan..." placeholder
- Character count: 300 max
- SUBMIT button (disabled after submitting, shows "✓ Locked In")
- Bottom left: "📞 Call Mummy" button (grayed out if used)
- Players submitted counter: "3/6 answered" shown when at least 2 have submitted

### Screen: Judging
- "AI is deciding your fate..." centered
- Full-screen EKG animation (the line draws, then flatlines, then draws again)
- Rotating text beneath: desi loading messages cycle every 1.5s:
  - "Consulting Sharma Ji Ka Beta..."
  - "Checking if your jugaad actually works..."
  - "Your mom was informed..."
  - "Calculating survival probability..."
  - "AI peeking at your kundali..."
- This screen lasts however long the /api/judge call takes (3-8 seconds)

### Screen: Verdict Reveal
- Reveal players ONE AT A TIME with 1.5s gap between each
- Each reveal: full-screen color flash (verdict color) → verdict card slides in from bottom
- VerdictCard shows: player name, character emoji, verdict tier (big, bold), AI narration
- ANTIM_SANSKAR reveals: play the roast text line by line with 0.5s delay between sentences
- After all revealed: "SHARMA JI KA BETA WOULD HAVE..." card shows
- Host: "Next Round →" button. Guests: "Waiting for host..."

### Screen: Game Over
- "FLATLINE COMPLETE" heading
- Final podium: 1st/2nd/3rd with Framer Motion entry animations
- Full player list with scores
- Share button per player: "Share My Results" → calls /api/verdict-card → downloads PNG
- Host: "Play Again" button (resets room to lobby, keeps players)

---

## 12. COMPONENT SPECS

### EkgLine.tsx
```typescript
// Animated SVG EKG that draws across the screen
// Props: width, height, color, animationDuration, loop (bool)
// Use on: home screen (decorative), judging screen (full-screen), loading states
// The line should: draw → normal EKG spike pattern → flatline → repeat
// Color: --red-flatline by default, accepts any color prop
```

### TimerBar.tsx
```typescript
// Props: totalSeconds, deadline (Unix timestamp)
// Derives remaining seconds from deadline vs Date.now() — no drift
// Color transitions: green(100%) → yellow(50%) → orange(20%) → red(10%, flashing)
// useEffect + setInterval(1000) to update
// Calls onExpire() callback when time hits 0
```

### VerdictCard.tsx
```typescript
// Props: playerName, character, verdict, narration, roastText?, isMyVerdict
// Uses verdict color from design system
// isMyVerdict: adds extra glow, slight scale-up
// Framer Motion: enter from bottom, spring animation
```

### CharacterCard.tsx
```typescript
// Props: character (one of 4), selected (bool), onSelect ()=>void
// Shows: emoji, name, ability description
// Selected state: gold border + glow
// Tooltip/expand on mobile tap: shows full ability description
```

---

## 13. PWA CONFIGURATION

### next.config.ts
```typescript
import withPWA from 'next-pwa'

const config = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

export default config({
  // your existing next config
})
```

### public/manifest.json
```json
{
  "name": "Flatline",
  "short_name": "Flatline",
  "description": "AI survival party game — desi edition",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#080808",
  "theme_color": "#ff2d2d",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "orientation": "portrait"
}
```

---

## 14. ENVIRONMENT VARIABLES

Create `.env.local` with these (all required):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# AI — pick one
GOOGLE_AI_API_KEY=AIza...          # Gemini 2.0 Flash (free)
# OPENAI_API_KEY=sk-...            # GPT-4o-mini (paid alternative)

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000   # change to prod URL on deploy
```

**Getting free Gemini API key:**
1. Go to https://aistudio.google.com/app/apikey
2. Create API key — it's free, no credit card
3. Free tier: 1,500 requests/day, 1M tokens/min — more than enough

---

## 15. IMPLEMENTATION ORDER

Build in this exact order. Each step is deployable:

### Step 1 — Foundation (Day 1)
- [ ] `create-next-app` with all packages
- [ ] Design system in `globals.css` (all CSS variables, fonts, base styles)
- [ ] `EkgLine` component (you'll use it everywhere)
- [ ] Supabase project setup + SQL schema
- [ ] `sessionId` utility (generates and persists UUID in localStorage)
- [ ] Environment variables

### Step 2 — Home + Lobby (Day 1-2)
- [ ] Home screen UI (create/join forms, character select, EKG background)
- [ ] `CharacterCard` component
- [ ] `POST /api/room/create` — creates room in DB, returns code
- [ ] `POST /api/room/join` — validates code, adds player to DB
- [ ] `/room/[code]` page — lobby screen
- [ ] Supabase Presence setup — real-time player list
- [ ] `RoomCodeDisplay` component
- [ ] Host controls (category, rounds, start button)

### Step 3 — Scenario Generation (Day 2)
- [ ] `POST /api/generate-scenario` with full AI prompts
- [ ] `CountdownScreen` component
- [ ] `ScenarioScreen` component
- [ ] Timer architecture in `rooms` table (answer_deadline, plot_twist_deadline)
- [ ] Broadcast PHASE_CHANGE events

### Step 4 — Answering + Judging (Day 3)
- [ ] `AnsweringScreen` — timer bar, textarea, submit
- [ ] `TimerBar` component (deadline-based, no drift)
- [ ] `PlotTwistBanner` — fires at plot_twist_deadline
- [ ] Player submitted tracking (Broadcast + Zustand)
- [ ] `POST /api/lifeline` — Call Mummy
- [ ] `POST /api/judge` — full judging with all prompts
- [ ] `JudgingScreen` — EKG animation + desi loading messages

### Step 5 — Verdict + Game Over (Day 4)
- [ ] `VerdictReveal` — animated one-by-one reveals
- [ ] `VerdictCard` component — all 4 verdict tiers styled
- [ ] ANTIM_SANSKAR roast display (typewriter effect)
- [ ] `SharmaJiReveal` component
- [ ] `RoundScores` — scoreboard with Framer Motion entry
- [ ] `GameOver` — final podium + play again
- [ ] Scoring logic with character modifiers

### Step 6 — Shareable Card + PWA (Day 5)
- [ ] `GET /api/verdict-card` — Satori PNG generation
- [ ] Share button → download PNG → WhatsApp/Instagram
- [ ] PWA manifest + icons
- [ ] `next-pwa` config
- [ ] Mobile viewport testing on actual Android/iPhone

### Step 7 — Polish + Deploy (Day 6)
- [ ] Framer Motion animations on all verdict reveals
- [ ] Error handling (room not found, AI timeout, player disconnected)
- [ ] Loading states everywhere
- [ ] Vercel deployment
- [ ] Test with real friends on phones
- [ ] Fix anything that feels laggy or broken on mobile

---

## 16. KEY RULES FOR CLAUDE CODE

1. **Never expose API keys client-side.** All AI calls go through `/api/*` routes (server-side). The Supabase anon key is fine client-side — that's its purpose.

2. **Never use `any` in TypeScript.** All types defined in `src/types/index.ts`.

3. **Timer ALWAYS uses server timestamps** — never `setTimeout` countdown from a fixed number. Always `Math.ceil((deadline - Date.now()) / 1000)`.

4. **Supabase channel cleanup** — always `return () => channel.unsubscribe()` in useEffect cleanup.

5. **AI responses ALWAYS validated** — wrap Gemini output in try/catch, validate JSON structure before using. If AI returns malformed JSON: retry once, then return a safe default verdict.

6. **Mobile-first CSS** — all game screens max-width 430px centered. Desktop gets decorative EKG pattern sidebars, not a wider layout.

7. **No auth** — players are identified by `sessionId` (UUID in localStorage). If they refresh during a game, they rejoin with same sessionId and reconnect to their existing player record.

8. **Graceful disconnect handling** — if a player disconnects during ANSWERING phase, their answer is auto-submitted as empty (BARBAD verdict) after a 10-second grace period. The game should never hard-block waiting for a disconnected player.

9. **The AI prompts are sacred** — do not simplify or shorten the prompts in `src/lib/ai/prompts.ts`. The Hinglish personality and judging nuance are the entire product.

10. **Framer Motion on verdicts only** — don't animate everything. Reserve motion for verdict reveals and countdown. Over-animation kills performance on mid-range Android phones (the actual target device).

---

## 17. WHAT MAKES FLATLINE GOOD (DESIGN PHILOSOPHY)

The EKG flatline aesthetic isn't just visual — it's the game's emotional arc. Every round: tension builds (answering), the line goes flat (judging, everyone holds their breath), then BOOM — verdicts explode the screen with color. That rhythm needs to be felt in the animations and timing.

The AI narration is the memory people share. "Bhai AI ne mujhe bola ki ANTIM SANSKAR hai" is the WhatsApp forward. Build the judging prompt like it's the most important feature (it is).

The game should feel fast. No phase should feel like waiting. Even the judging screen (which is real network latency) should feel active thanks to the EKG animation and rotating loading messages.

Ship v1 with 5 rounds, 4 characters, 2 categories. Test with real friends. Add more in v2.
```

---

*This document is the complete specification for Flatline. Start with Step 1 in Section 15 and work sequentially. Every decision you need is in this file.*