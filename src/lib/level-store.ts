/**
 * Manages the user's selected difficulty level in localStorage.
 */
import { DifficultyLevel } from '@/types/database';

const LEVEL_KEY = 'english-app-level';
const TEST_DONE_KEY = 'english-app-level-test-done';

export function getUserLevel(): DifficultyLevel {
  try {
    const stored = localStorage.getItem(LEVEL_KEY);
    if (stored === 'beginner' || stored === 'intermediate' || stored === 'advanced') {
      return stored;
    }
  } catch {}
  return 'beginner';
}

export function setUserLevel(level: DifficultyLevel): void {
  try {
    localStorage.setItem(LEVEL_KEY, level);
  } catch {}
}

export function isLevelTestDone(): boolean {
  try {
    return localStorage.getItem(TEST_DONE_KEY) === 'true';
  } catch {}
  return false;
}

export function markLevelTestDone(): void {
  try {
    localStorage.setItem(TEST_DONE_KEY, 'true');
  } catch {}
}
