/**
 * Loads block and item data from seed JSON files.
 * In the future, this will be replaced by Supabase queries.
 */
import vocabSeed from '@/data/seed/vocab-blocks.json';
import grammarSeed from '@/data/seed/grammar-blocks.json';
import vocabIntSeed from '@/data/seed/vocab-blocks-intermediate.json';
import grammarIntSeed from '@/data/seed/grammar-blocks-intermediate.json';
import vocabAdvSeed from '@/data/seed/vocab-blocks-advanced.json';
import grammarAdvSeed from '@/data/seed/grammar-blocks-advanced.json';
import { DifficultyLevel, ExerciseData, ExerciseType } from '@/types/database';

interface SeedItem {
  type: string;
  content_pt: string;
  content_en: string;
  hint: string | null;
  difficulty: number;
  grammar_rule?: string;
  exercises: {
    type: string;
    options?: string[];
    correct_answer: string;
    scrambled_words?: string[];
    incorrect_sentence?: string;
  }[];
}

interface SeedBlock {
  name: string;
  type: string;
  order: number;
  level?: string;
  intro_card: {
    title: string;
    explanation: string;
    examples: string[];
  } | null;
  unlock_after: string | null;
  items: SeedItem[];
}

export interface LoadedItem {
  id: string;
  blockName: string;
  type: string;
  content_pt: string;
  content_en: string;
  hint: string | null;
  difficulty: 1 | 2 | 3;
  grammar_rule?: string;
  exercises: ExerciseData[];
}

export interface LoadedBlock {
  id: string;
  name: string;
  type: string;
  order: number;
  level: DifficultyLevel;
  intro_card: {
    title: string;
    explanation: string;
    examples: string[];
  } | null;
  items: LoadedItem[];
}

const allSeeds: SeedBlock[] = [
  ...vocabSeed, ...grammarSeed,
  ...vocabIntSeed, ...grammarIntSeed,
  ...vocabAdvSeed, ...grammarAdvSeed,
] as SeedBlock[];

// Map block names to numeric IDs matching the blocks page
const blockIdMap: Record<string, string> = {
  'Bathroom': '1', 'Kitchen': '2', 'Workplace': '3',
  'Daily Routine': '4', 'Shopping': '5', 'Health & Body': '6',
  'Getting Around': '7', 'Food & Eating Out': '8',
  'Feelings & Opinions': '9', 'Tech & Online': '10',
  'Slang & Idioms': '21', 'Foundations': '11', 'Daily Habits': '12', 'Right Now': '13',
  'Looking Back': '14', "What's Next": '15', 'Describing Things': '16',
  'People & Possession': '17', 'Places & Quantities': '18',
  'Abilities & Rules': '19', 'Advanced Structures': '20',
  // Intermediate
  'Business & Meetings': '22', 'Travel & Airport': '23', 'Entertainment & Media': '24',
  'Present Perfect': '25', 'Conditionals': '26',
  // Advanced
  'Phrasal Verbs': '27', 'Formal Writing': '28',
  'Passive Voice': '29',
};

export function getBlockById(blockId: string): LoadedBlock | null {
  const blockName = Object.entries(blockIdMap).find(([, id]) => id === blockId)?.[0];
  if (!blockName) return null;

  const seed = allSeeds.find(b => b.name === blockName);
  if (!seed) return null;

  return {
    id: blockId,
    name: seed.name,
    type: seed.type,
    order: seed.order,
    level: (seed.level as DifficultyLevel) || 'beginner',
    intro_card: seed.intro_card,
    items: seed.items.map((item, i) => ({
      id: `${blockId}-${i}`,
      blockName: seed.name,
      type: item.type,
      content_pt: item.content_pt,
      content_en: item.content_en,
      hint: item.hint,
      difficulty: item.difficulty as 1 | 2 | 3,
      grammar_rule: item.grammar_rule,
      exercises: item.exercises.map(ex => ({
        type: ex.type as ExerciseType,
        options: ex.options,
        correct_answer: ex.correct_answer,
        scrambled_words: ex.scrambled_words,
        error_sentence: ex.incorrect_sentence,
      })),
    })),
  };
}

export function getAllBlockIds(): string[] {
  return Object.values(blockIdMap);
}

export function getBlocksByLevel(level: DifficultyLevel): LoadedBlock[] {
  return allSeeds
    .filter(seed => (seed.level || 'beginner') === level)
    .map(seed => {
      const blockId = blockIdMap[seed.name];
      if (!blockId) return null;
      return getBlockById(blockId);
    })
    .filter((b): b is LoadedBlock => b !== null);
}
