/**
 * Supabase Store — persists progress, streaks and sim history in Supabase.
 * Falls back to localStorage when user is not authenticated.
 */
import { createClient } from '@/lib/supabase/client';
import type { ItemProgress } from './progress-store';
import * as localProgress from './progress-store';
import * as localStreak from './streak-store';

const supabase = createClient();

// ─── Helper ───────────────────────────────────────────────────

async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ─── Progress ─────────────────────────────────────────────────

export async function getBlockProgressSupabase(blockId: string): Promise<ItemProgress[]> {
  const user = await getUser();
  if (!user) return localProgress.getBlockProgress(blockId);

  const { data } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('block_id', blockId);

  if (!data || data.length === 0) return localProgress.getBlockProgress(blockId);

  return data.map(mapDbToProgress);
}

export async function getAllProgressSupabase(): Promise<ItemProgress[]> {
  const user = await getUser();
  if (!user) return localProgress.getAllProgress();

  const { data } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id);

  if (!data) return localProgress.getAllProgress();
  return data.map(mapDbToProgress);
}

export async function recordAnswerSupabase(
  itemId: string,
  blockId: string,
  isCorrect: boolean,
  errorType?: 'CONTENT' | 'ATTENTION'
): Promise<ItemProgress> {
  const user = await getUser();

  // Always update localStorage as cache
  const localResult = localProgress.recordAnswer(itemId, blockId, isCorrect, errorType);

  if (!user) return localResult;

  // Upsert to Supabase
  await supabase
    .from('progress')
    .upsert({
      user_id: user.id,
      item_id: localResult.itemId,
      block_id: localResult.blockId,
      state: localResult.state,
      next_review_at: localResult.nextReviewAt,
      times_seen: localResult.timesSeen,
      times_correct: localResult.timesCorrect,
      times_wrong: localResult.timesWrong,
      last_error_type: localResult.lastErrorType,
      updated_at: localResult.updatedAt,
    }, {
      onConflict: 'user_id,item_id',
    });

  return localResult;
}

export async function getDueItemsSupabase(): Promise<ItemProgress[]> {
  const user = await getUser();
  if (!user) return localProgress.getDueItems();

  const { data } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id)
    .not('state', 'in', '("DONE","NOVA")')
    .lte('next_review_at', new Date().toISOString());

  if (!data) return localProgress.getDueItems();
  return data.map(mapDbToProgress);
}

export async function getProgressStatsSupabase() {
  const user = await getUser();
  if (!user) return localProgress.getProgressStats();

  const all = await getAllProgressSupabase();
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

export async function getCompletedCountSupabase(blockId: string): Promise<number> {
  const user = await getUser();
  if (!user) return localProgress.getCompletedCount(blockId, 0);

  const { count } = await supabase
    .from('progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('block_id', blockId)
    .eq('state', 'DONE');

  return count ?? 0;
}

// ─── Streaks ──────────────────────────────────────────────────

export async function recordStudyDaySupabase(): Promise<void> {
  const user = await getUser();
  localStreak.recordStudyDay();
  if (!user) return;

  const today = new Date().toISOString().split('T')[0];

  // Get current profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_streak, longest_streak, last_study_date')
    .eq('id', user.id)
    .single();

  if (!profile) return;

  if (profile.last_study_date === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak: number;
  if (profile.last_study_date === yesterdayStr) {
    newStreak = (profile.current_streak ?? 0) + 1;
  } else {
    newStreak = 1;
  }

  await supabase
    .from('profiles')
    .update({
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, profile.longest_streak ?? 0),
      last_study_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);
}

export async function getStreakInfoSupabase(): Promise<{
  current: number;
  longest: number;
  studiedToday: boolean;
}> {
  const user = await getUser();
  if (!user) return localStreak.getStreakInfo();

  const { data: profile } = await supabase
    .from('profiles')
    .select('current_streak, longest_streak, last_study_date')
    .eq('id', user.id)
    .single();

  if (!profile) return localStreak.getStreakInfo();

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const studiedToday = profile.last_study_date === today;

  if (!studiedToday && profile.last_study_date !== yesterdayStr) {
    return { current: 0, longest: profile.longest_streak ?? 0, studiedToday: false };
  }

  return {
    current: profile.current_streak ?? 0,
    longest: profile.longest_streak ?? 0,
    studiedToday,
  };
}

// ─── Simulation History ───────────────────────────────────────

export interface SimResult {
  score: number;
  total: number;
  elapsedSeconds: number;
  blocksUsed: string[];
  createdAt: string;
}

export async function saveSimResultSupabase(result: Omit<SimResult, 'createdAt'>): Promise<void> {
  const user = await getUser();

  // Always save to localStorage
  try {
    const key = 'english-app-sim-history';
    const raw = localStorage.getItem(key);
    const history: SimResult[] = raw ? JSON.parse(raw) : [];
    history.push({ ...result, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(history));
  } catch {}

  if (!user) return;

  await supabase.from('sim_history').insert({
    user_id: user.id,
    score: result.score,
    total: result.total,
    elapsed_seconds: result.elapsedSeconds,
    blocks_used: result.blocksUsed,
  });
}

export async function getSimHistorySupabase(): Promise<SimResult[]> {
  const user = await getUser();

  if (!user) {
    try {
      const raw = localStorage.getItem('english-app-sim-history');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  const { data } = await supabase
    .from('sim_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (!data) return [];

  return data.map((row) => ({
    score: row.score,
    total: row.total,
    elapsedSeconds: row.elapsed_seconds,
    blocksUsed: row.blocks_used,
    createdAt: row.created_at,
  }));
}

// ─── Sync localStorage → Supabase (on first login) ───────────

export async function syncLocalToSupabase(): Promise<void> {
  const user = await getUser();
  if (!user) return;

  // Sync progress
  const localData = localProgress.getAllProgress();
  if (localData.length > 0) {
    // Check if user already has data in Supabase
    const { count } = await supabase
      .from('progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count === 0) {
      // No remote data — upload local
      const rows = localData.map((p) => ({
        user_id: user.id,
        item_id: p.itemId,
        block_id: p.blockId,
        state: p.state,
        next_review_at: p.nextReviewAt,
        times_seen: p.timesSeen,
        times_correct: p.timesCorrect,
        times_wrong: p.timesWrong,
        last_error_type: p.lastErrorType,
        updated_at: p.updatedAt,
      }));

      await supabase.from('progress').upsert(rows, { onConflict: 'user_id,item_id' });
    }
  }

  // Sync streak
  const streakInfo = localStreak.getStreakInfo();
  if (streakInfo.current > 0) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_streak')
      .eq('id', user.id)
      .single();

    if (profile && (profile.current_streak ?? 0) === 0) {
      const today = new Date().toISOString().split('T')[0];
      await supabase
        .from('profiles')
        .update({
          current_streak: streakInfo.current,
          longest_streak: streakInfo.longest,
          last_study_date: streakInfo.studiedToday ? today : null,
        })
        .eq('id', user.id);
    }
  }
}

// ─── Helpers ──────────────────────────────────────────────────

function mapDbToProgress(row: Record<string, unknown>): ItemProgress {
  return {
    itemId: row.item_id as string,
    blockId: row.block_id as string,
    state: row.state as ItemProgress['state'],
    nextReviewAt: row.next_review_at as string,
    timesSeen: row.times_seen as number,
    timesCorrect: row.times_correct as number,
    timesWrong: row.times_wrong as number,
    lastErrorType: (row.last_error_type as ItemProgress['lastErrorType']) ?? null,
    updatedAt: row.updated_at as string,
  };
}
