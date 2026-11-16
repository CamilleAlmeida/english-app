// ============================================
// Database Types — English Spaced Repetition App
// ============================================

export type BlockType = 'VOCAB' | 'GRAMMAR';
export type ItemType = 'WORD' | 'PHRASE' | 'SENTENCE';
export type ReviewState = 'NOVA' | '24H' | '7D' | '21D' | 'DONE';
export type ErrorType = 'CONTENT' | 'ATTENTION';
export type SessionType = 'DAILY' | 'SIMULATION';
export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'FILL_GAP'
  | 'ORDER_SENTENCE'
  | 'CORRECT_ERROR'
  | 'TRANSLATE'
  | 'COMPLETE_DIALOGUE';

// --- Database tables ---

export interface User {
  id: string;
  email: string;
  created_at: string;
  streak_days: number;
}

export interface Block {
  id: string;
  name: string;
  type: BlockType;
  order: number;
  intro_card: string | null;
  unlock_after: string | null;
}

export interface Item {
  id: string;
  block_id: string;
  type: ItemType;
  content_pt: string;
  content_en: string;
  hint: string | null;
  difficulty: 1 | 2 | 3;
  exercises: ExerciseData[];
}

export interface ExerciseData {
  type: ExerciseType;
  options?: string[];
  correct_answer: string;
  error_sentence?: string; // for CORRECT_ERROR type
  scrambled_words?: string[]; // for ORDER_SENTENCE type
  dialogue_prompt?: string; // for COMPLETE_DIALOGUE type
}

export interface UserProgress {
  id: string;
  user_id: string;
  item_id: string;
  state: ReviewState;
  next_review_at: string;
  times_seen: number;
  times_correct: number;
  times_wrong: number;
  last_error_type: ErrorType | null;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  type: SessionType;
  started_at: string;
  finished_at: string | null;
  total_items: number;
  correct_count: number;
  wrong_count: number;
}

export interface ErrorLog {
  id: string;
  session_id: string;
  item_id: string;
  user_answer: string;
  correct_answer: string;
  error_type: ErrorType;
  response_time_ms: number;
  created_at: string;
}

// --- Joined types for UI ---

export interface BlockWithProgress extends Block {
  total_items: number;
  completed_items: number;
  unlocked: boolean;
}

export interface ItemWithProgress extends Item {
  progress: UserProgress | null;
}

export interface DashboardStats {
  total_learned: number;
  total_in_review: number;
  total_with_errors: number;
  streak_days: number;
  accuracy_vocab: number;
  accuracy_coherence: number;
  accuracy_structure: number;
  content_error_ratio: number;
  attention_error_ratio: number;
  worst_items: { item: Item; error_count: number }[];
}
