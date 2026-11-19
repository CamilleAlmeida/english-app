const STREAK_KEY = 'english-app-streak';

interface StreakData {
  /** Datas YYYY-MM-DD em que houve estudo. Guardamos os últimos 120 dias. */
  days: string[];
  /** Mantidos por compatibilidade com dados já salvos no aparelho. */
  currentStreak?: number;
  lastStudyDate?: string;
  longestStreak?: number;
}

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getToday(): string {
  return iso(new Date());
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StreakData;
      // Migração: dados antigos só tinham lastStudyDate.
      if (!Array.isArray(parsed.days)) {
        parsed.days = parsed.lastStudyDate ? [parsed.lastStudyDate] : [];
      }
      return parsed;
    }
  } catch {}
  return { days: [] };
}

function saveStreak(data: StreakData): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {}
}

/** Chamado quando o usuário conclui uma sessão de estudo ou revisão. */
export function recordStudyDay(): void {
  const data = loadStreak();
  const today = getToday();
  if (data.days.includes(today)) return;

  data.days.push(today);
  data.days.sort();
  if (data.days.length > 120) data.days = data.days.slice(-120);
  data.lastStudyDate = today;
  saveStreak(data);
}

export interface WeekActivity {
  /** Segunda a domingo da semana corrente. */
  days: { label: string; date: string; studied: boolean; isToday: boolean; isFuture: boolean }[];
  /** Quantos dias desta semana tiveram estudo. */
  studiedThisWeek: number;
  /** Total acumulado de dias estudados — só cresce, nunca zera. */
  totalDays: number;
  studiedToday: boolean;
}

const LABELS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

/**
 * Atividade da semana corrente, de segunda a domingo.
 * Não existe "perder o progresso": um dia sem estudar fica apenas vazio.
 */
export function getWeekActivity(): WeekActivity {
  const data = loadStreak();
  const set = new Set(data.days);
  const today = new Date();
  const todayStr = iso(today);

  // Segunda-feira desta semana (getDay: 0=domingo).
  const monday = new Date(today);
  const offset = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - offset);

  const days = LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const date = iso(d);
    return {
      label,
      date,
      studied: set.has(date),
      isToday: date === todayStr,
      isFuture: date > todayStr,
    };
  });

  return {
    days,
    studiedThisWeek: days.filter((d) => d.studied).length,
    totalDays: data.days.length,
    studiedToday: set.has(todayStr),
  };
}

export function resetStreak(): void {
  try {
    localStorage.removeItem(STREAK_KEY);
  } catch {}
}

/**
 * Sequência corrente de dias, derivada de `days`.
 * Mantido porque a sincronização com o Supabase grava esse número no perfil.
 * A interface não mostra mais esse contador — ver getWeekActivity().
 */
export function getStreakInfo(): { current: number; longest: number; studiedToday: boolean } {
  const data = loadStreak();
  const set = new Set(data.days);
  const todayStr = getToday();
  const studiedToday = set.has(todayStr);

  const countBack = (from: Date): number => {
    let n = 0;
    const d = new Date(from);
    while (set.has(iso(d))) {
      n += 1;
      d.setDate(d.getDate() - 1);
    }
    return n;
  };

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const current = studiedToday ? countBack(today) : countBack(yesterday);

  // Maior sequência já registrada, varrendo o histórico.
  const sorted = [...data.days].sort();
  let longest = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const day of sorted) {
    const d = new Date(day + 'T00:00:00');
    if (prev && (d.getTime() - prev.getTime()) / 86400000 === 1) run += 1;
    else run = 1;
    if (run > longest) longest = run;
    prev = d;
  }

  return { current, longest: Math.max(longest, data.longestStreak ?? 0), studiedToday };
}
