/**
 * Progress Store — persists item-level spaced repetition state in localStorage.
 * Will be replaced by Supabase when backend is connected.
 */
import { ReviewState, ErrorType } from '@/types/database';
import { getNextState, getNextReviewDate } from './spaced-repetition';

const STORAGE_KEY = 'english-app-progress';

export interface ItemProgress {
  itemId: string;
  blockId: string;
  state: ReviewState;
  nextReviewAt: string; // ISO date
  timesSeen: number;
  timesCorrect: number;
  timesWrong: number;
  lastErrorType: ErrorType | null;
  updatedAt: string;
}

type ProgressMap = Record<string, ItemProgress>;

// --- Read / Write to localStorage ---

function loadAll(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: ProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// --- Public API ---

export function getItemProgress(itemId: string): ItemProgress | null {
  const all = loadAll();
  return all[itemId] ?? null;
}

export function getAllProgress(): ItemProgress[] {
  return Object.values(loadAll());
}

export function getBlockProgress(blockId: string): ItemProgress[] {
  return getAllProgress().filter((p) => p.blockId === blockId);
}

/**
 * Record the result of an exercise for an item.
 * Advances or resets the spaced repetition state.
 */
export function recordAnswer(
  itemId: string,
  blockId: string,
  isCorrect: boolean,
  errorType?: ErrorType
): ItemProgress {
  const all = loadAll();
  const existing = all[itemId];

  const currentState: ReviewState = existing?.state ?? 'NOVA';
  const newState = getNextState(currentState, isCorrect);
  const nextReview = getNextReviewDate(newState);

  const updated: ItemProgress = {
    itemId,
    blockId,
    state: newState,
    nextReviewAt: nextReview.toISOString(),
    timesSeen: (existing?.timesSeen ?? 0) + 1,
    timesCorrect: (existing?.timesCorrect ?? 0) + (isCorrect ? 1 : 0),
    timesWrong: (existing?.timesWrong ?? 0) + (isCorrect ? 0 : 1),
    lastErrorType: isCorrect ? (existing?.lastErrorType ?? null) : (errorType ?? null),
    updatedAt: new Date().toISOString(),
  };

  all[itemId] = updated;
  saveAll(all);
  return updated;
}

/**
 * Get items that are due for review right now.
 */
export function getDueItems(): ItemProgress[] {
  const now = new Date();
  return getAllProgress().filter(
    (p) => p.state !== 'DONE' && p.state !== 'NOVA' && new Date(p.nextReviewAt) <= now
  );
}

/**
 * Count items in DONE state for a specific block.
 */
export function getCompletedCount(blockId: string, totalItems: number): number {
  const blockProgress = getBlockProgress(blockId);
  return blockProgress.filter((p) => p.state === 'DONE').length;
}

/**
 * Summary stats across all progress.
 */
export function getProgressStats() {
  const all = getAllProgress();
  const now = new Date();

  return {
    learned: all.filter((p) => p.state === 'DONE').length,
    inReview: all.filter((p) => p.state !== 'DONE' && p.state !== 'NOVA').length,
    withErrors: all.filter((p) => p.timesWrong > 0 && p.state !== 'DONE').length,
    pendingReviews: all.filter(
      (p) => p.state !== 'DONE' && p.state !== 'NOVA' && new Date(p.nextReviewAt) <= now
    ).length,
  };
}

/**
 * Reset all progress (for testing).
 */
export function resetAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
