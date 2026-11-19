'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBottom from '@/components/ui/NavBottom';
import { useAuth } from '@/contexts/AuthContext';
import { STATE_LABELS, STATE_BG } from '@/lib/review-state-ui';
import type { BlockType } from '@/types/database';
import { getBlockIdentity, topicTileStyle } from '@/lib/block-identity';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ui/ProgressBar';
import { getAllProgress, getBlockProgress, getProgressStats, ItemProgress, resetAllProgress } from '@/lib/progress-store';
import { getAllBlockIds, getBlockById } from '@/lib/seed-loader';
import { ReviewState } from '@/types/database';
import { resetStreak } from '@/lib/streak-store';
import {
  BarChart3, PenLine, CheckCircle2, RefreshCw, XCircle,
  Target, Timer, Trash2, type LucideIcon, LogOut } from 'lucide-react';

interface BlockStat {
  id: string;
  name: string;
  type: BlockType;
  totalItems: number;
  studied: number;
  done: number;
  inReview: number;
  withErrors: number;
}

interface SimResult {
  date: string;
  score: number;
  total: number;
  elapsed: number;
}


export default function DashboardPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push('/login');
    router.refresh();
  }
  const [stats, setStats] = useState({ learned: 0, inReview: 0, withErrors: 0, pendingReviews: 0 });
  const [blockStats, setBlockStats] = useState<BlockStat[]>([]);
  const [stateCounts, setStateCounts] = useState<Record<ReviewState, number>>({
    NOVA: 0, '24H': 0, '7D': 0, '21D': 0, DONE: 0,
  });
  const [totalItems, setTotalItems] = useState(0);
  const [totalStudied, setTotalStudied] = useState(0);
  const [simHistory, setSimHistory] = useState<SimResult[]>([]);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    setStats(getProgressStats());
    const allProgress = getAllProgress();
    const counts: Record<ReviewState, number> = { NOVA: 0, '24H': 0, '7D': 0, '21D': 0, DONE: 0 };
    allProgress.forEach((p) => { counts[p.state]++; });

    const ids = getAllBlockIds();
    let total = 0;
    let studied = 0;
    const bStats: BlockStat[] = [];

    for (const id of ids) {
      const block = getBlockById(id);
      if (!block) continue;
      const progress = getBlockProgress(id);
      const blockTotal = block.items.length;
      const blockStudied = progress.length;
      const blockDone = progress.filter((p) => p.state === 'DONE').length;
      const blockInReview = progress.filter((p) => p.state !== 'DONE' && p.state !== 'NOVA').length;
      const blockErrors = progress.filter((p) => p.timesWrong > 0 && p.state !== 'DONE').length;

      total += blockTotal;
      studied += blockStudied;
      counts.NOVA += blockTotal - blockStudied;

      bStats.push({
        id,
        name: block.name,
        type: block.type as BlockType,
        totalItems: blockTotal,
        studied: blockStudied,
        done: blockDone,
        inReview: blockInReview,
        withErrors: blockErrors,
      });
    }

    setStateCounts(counts);
    setTotalItems(total);
    setTotalStudied(studied);
    setBlockStats(bStats);

    try {
      const raw = localStorage.getItem('english-app-sim-history');
      if (raw) setSimHistory(JSON.parse(raw));
    } catch {}
  }, []);

  function handleReset() {
    resetAllProgress();
    resetStreak();
    try {
      localStorage.removeItem('english-app-sim-history');
    } catch {}
    setShowReset(false);
    window.location.reload();
  }

  const overallPct = totalItems > 0 ? Math.round((stateCounts.DONE / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-bg pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="flex items-center gap-2">
          <BarChart3 size={24} className="text-primary" />
          <h1 className="text-2xl font-semibold font-display">Painel</h1>
        </div>
        <p className="text-fg-muted mt-1 text-sm">Seu progresso geral de aprendizado</p>

        {/* ---- Overall progress ---- */}
        <div className="mt-6 rounded-[var(--radius-lg)] bg-surface p-5 shadow-ds-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold font-display">Progresso geral</h2>
            <span className="text-2xl font-bold text-success">{overallPct}%</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={overallPct} color="green" size="md" />
          </div>
          <p className="mt-2 text-xs text-fg-muted">
            {stateCounts.DONE} de {totalItems} itens aprendidos
          </p>
        </div>

        {/* ---- State distribution ---- */}
        <div className="mt-4 rounded-[var(--radius-lg)] bg-surface p-5 shadow-ds-sm">
          <h2 className="font-semibold font-display">Distribuição por estado</h2>
          <div className="mt-3 flex flex-col gap-2">
            {(['NOVA', '24H', '7D', '21D', 'DONE'] as ReviewState[]).map((state) => {
              const count = stateCounts[state];
              const pct = totalItems > 0 ? Math.round((count / totalItems) * 100) : 0;
              return (
                <div key={state} className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${STATE_BG[state]}`} />
                  <span className="text-sm w-20">{STATE_LABELS[state]}</span>
                  <div className="flex-1 bg-surface-2 rounded-full h-2 overflow-hidden">
                    <div className={`${STATE_BG[state]} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-fg-muted w-12 text-right">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Quick stats ---- */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <QuickStat label="Estudados" value={totalStudied} Icon={PenLine} color="text-primary" />
          <QuickStat label="Aprendidos" value={stateCounts.DONE} Icon={CheckCircle2} color="text-success" />
          <QuickStat label="Em revisão" value={stats.inReview} Icon={RefreshCw} color="text-info" />
          <QuickStat label="Com erro" value={stats.withErrors} Icon={XCircle} color="text-danger" />
        </div>

        {/* ---- Per-block progress ---- */}
        <div className="mt-6">
          <h2 className="font-semibold font-display">Progresso por bloco</h2>
          <div className="mt-3 flex flex-col gap-2">
            {blockStats.map((bs) => {
              const pct = bs.totalItems > 0 ? Math.round((bs.done / bs.totalItems) * 100) : 0;
              const { Icon: BlockIcon, topic } = getBlockIdentity(bs.name, bs.type);
              return (
                <Link key={bs.id} href={`/study/${bs.id}`} className="rounded-[var(--radius-lg)] bg-surface p-3 shadow-ds-sm block">
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 flex-none items-center justify-center rounded-[var(--radius-sm)] border"
                        style={topicTileStyle(topic)}
                      >
                        <BlockIcon size={15} strokeWidth={1.9} />
                      </span>
                      <span className="truncate text-sm font-medium">{bs.name}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: pct === 100 ? 'var(--color-success)' : pct > 0 ? 'var(--color-primary)' : 'var(--color-fg-muted)' }}>
                      {pct}%
                    </span>
                  </div>
                  <div className="mt-1">
                    <ProgressBar value={pct} color={pct === 100 ? 'green' : 'blue'} size="sm" />
                  </div>
                  <div className="mt-1 flex gap-3 text-[10px] text-fg-muted">
                    <span className="flex items-center gap-0.5"><CheckCircle2 size={10} /> {bs.done}/{bs.totalItems}</span>
                    <span className="flex items-center gap-0.5"><RefreshCw size={10} /> {bs.inReview}</span>
                    {bs.withErrors > 0 && <span className="flex items-center gap-0.5"><XCircle size={10} /> {bs.withErrors}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ---- Simulation history ---- */}
        <div className="mt-6">
          <h2 className="font-semibold font-display">Histórico de simulados</h2>
          {simHistory.length === 0 ? (
            <div className="mt-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-ds-sm text-center">
              <p className="text-fg-muted text-sm">Nenhum simulado realizado ainda.</p>
              <Link href="/simulation" className="text-primary text-sm font-medium mt-1 inline-flex items-center gap-1">
                <Target size={14} /> Fazer simulado
              </Link>
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-2">
              {simHistory.slice().reverse().map((sim, i) => {
                const pct = sim.total > 0 ? Math.round((sim.score / sim.total) * 100) : 0;
                const date = new Date(sim.date);
                const formatted = `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
                const mins = Math.floor(sim.elapsed / 60);
                const secs = sim.elapsed % 60;
                return (
                  <div key={i} className="rounded-[var(--radius-lg)] bg-surface p-3 shadow-ds-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-fg-muted">{formatted}</span>
                      <span className="text-sm font-bold" style={{ color: pct >= 80 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                        {pct}%
                      </span>
                    </div>
                    <div className="mt-1 flex gap-3 text-xs text-fg-muted">
                      <span>{sim.score}/{sim.total} corretas</span>
                      <span className="flex items-center gap-0.5"><Timer size={12} /> {mins}m{secs.toString().padStart(2, '0')}s</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ---- Settings ---- */}
        <div className="mt-6">
          <h2 className="font-semibold font-display">Configurações</h2>
          <div className="mt-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-ds-sm">
            {!showReset ? (
              <button
                onClick={() => setShowReset(true)}
                className="w-full rounded-[var(--radius-pill)] border border-danger py-2.5 text-sm font-medium text-danger flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Resetar todo o progresso
              </button>
            ) : (
              <div>
                <p className="text-sm text-danger font-medium">Tem certeza?</p>
                <p className="text-xs text-fg-muted mt-1">
                  Isso apagará todo o progresso de estudo e histórico de simulados. Essa ação não pode ser desfeita.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-[var(--radius-pill)] bg-danger py-2.5 text-sm font-medium text-primary-fg"
                  >
                    Sim, resetar
                  </button>
                  <button
                    onClick={() => setShowReset(false)}
                    className="flex-1 rounded-[var(--radius-pill)] border border-border py-2.5 text-sm font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => { void handleLogout(); }}
          className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-border bg-surface py-3 text-sm font-medium text-fg-muted transition-colors hover:text-danger"
        >
          <LogOut size={17} /> Sair da conta
        </button>

        <div className="h-8" />
      </div>
      <NavBottom />
    </div>
  );
}

function QuickStat({ label, value, Icon, color }: { label: string; value: number; Icon: LucideIcon; color: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface p-4 text-center shadow-ds-sm">
      <Icon size={22} className={`${color} mx-auto mb-1`} />
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  );
}
