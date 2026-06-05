import type { CharacterDef, CharacterType } from '@/types';

export const CHARACTERS: Record<CharacterType, CharacterDef> = {
  topper: {
    type: 'topper',
    name: 'The Topper',
    emoji: '🎓',
    ability: 'Resubmit',
    description: 'Once per game: after the AI judges but BEFORE verdict displays, can resubmit one answer. AI re-judges.',
  },
  jugaadu: {
    type: 'jugaadu',
    name: 'The Jugaadu',
    emoji: '🔧',
    ability: '+1 Tier',
    description: 'All verdict tiers +1 tier (BARBAD→BACH GAYA, BACH GAYA→JUGAAD). Can never get ANTIM SANSKAR.',
  },
  sharma_ji: {
    type: 'sharma_ji',
    name: 'Sharma Ji Ka Beta',
    emoji: '📚',
    ability: 'Peek',
    description: "Can read ONE other player's submitted answer before timer ends. But AI judges their answers 15% harsher.",
  },
  it_uncle: {
    type: 'it_uncle',
    name: 'The IT Uncle',
    emoji: '💻',
    ability: 'Reroll',
    description: 'Immune to "Startup/IT Life" category scenarios — if drawn, their scenario is rerolled from a different category.',
  },
};

export const CHARACTER_LIST: CharacterDef[] = Object.values(CHARACTERS);
