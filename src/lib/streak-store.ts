const STREAK_KEY = 'english-app-streak';

interface StreakData {
  currentStreak: number;
  lastStudyDate: string; // YYYY-MM-DD
  longestStreak: number;
}

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { currentStreak: 0, lastStudyDate: '', longestStreak: 0 };
}

function saveStreak(data: StreakData): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {}
}

/** Call this whenever the user completes a study or review session */
export function recordStudyDay(): void {
  const data = loadStreak();
  const today = getToday();

  if (data.lastStudyDate === today) return; // already recorded today

  const yesterday = getYesterday();

  if (data.lastStudyDate === yesterday) {
    data.currentStreak += 1;
  } else {
    data.currentStreak = 1;
  }

  data.lastStudyDate = today;
  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }

  saveStreak(data);
}

/** Get current streak info for display */
export function getStreakInfo(): { current: number; longest: number; studiedToday: boolean } {
  const data = loadStreak();
  const today = getToday();
  const yesterday = getYesterday();

  const studiedToday = data.lastStudyDate === today;

  // If last study was before yesterday, streak is broken
  if (!studiedToday && data.lastStudyDate !== yesterday) {
    return { current: 0, longest: data.longestStreak, studiedToday: false };
  }

  return { current: data.currentStreak, longest: data.longestStreak, studiedToday };
}

export function resetStreak(): void {
  try {
    localStorage.removeItem(STREAK_KEY);
  } catch {}
}
