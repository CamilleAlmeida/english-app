import { ReviewState } from '@/types/database';

/**
 * Spaced Repetition Engine
 *
 * States: NOVA → 24H → 7D → 21D → DONE
 * On correct answer: advance to next state
 * On wrong answer: reset to 24H
 */

const STATE_ORDER: ReviewState[] = ['NOVA', '24H', '7D', '21D', 'DONE'];

const INTERVALS_MS: Record<ReviewState, number> = {
  NOVA: 0,
  '24H': 24 * 60 * 60 * 1000,       // 1 day
  '7D': 7 * 24 * 60 * 60 * 1000,     // 7 days
  '21D': 21 * 24 * 60 * 60 * 1000,   // 21 days
  DONE: Infinity,
};

export function getNextState(currentState: ReviewState, isCorrect: boolean): ReviewState {
  if (!isCorrect) {
    return '24H'; // Error always resets to 24H
  }

  const currentIndex = STATE_ORDER.indexOf(currentState);
  const nextIndex = Math.min(currentIndex + 1, STATE_ORDER.length - 1);
  return STATE_ORDER[nextIndex];
}

export function getNextReviewDate(state: ReviewState): Date {
  if (state === 'DONE') {
    return new Date(8640000000000000); // Max date
  }

  const now = new Date();
  const intervalMs = INTERVALS_MS[state];
  return new Date(now.getTime() + intervalMs);
}

export function isDueForReview(nextReviewAt: string): boolean {
  return new Date(nextReviewAt) <= new Date();
}

/**
 * Heuristic for error classification
 * < 3 seconds = likely ATTENTION (knew it but rushed)
 * > 10 seconds = likely CONTENT (didn't know)
 * 3-10 seconds = ambiguous, let user decide
 */
export function suggestErrorType(responseTimeMs: number): 'ATTENTION' | 'CONTENT' | null {
  if (responseTimeMs < 3000) return 'ATTENTION';
  if (responseTimeMs > 10000) return 'CONTENT';
  return null; // Let user classify
}

export function getReviewCountForToday(
  progressItems: { state: ReviewState; next_review_at: string }[]
): number {
  const now = new Date();
  return progressItems.filter(
    (p) => p.state !== 'DONE' && new Date(p.next_review_at) <= now
  ).length;
}
