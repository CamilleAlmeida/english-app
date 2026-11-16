'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ExerciseData } from '@/types/database';
import { LoadedItem, LoadedBlock } from '@/lib/seed-loader';
import { isAnswerCorrect, shuffle } from '@/lib/answer-check';
import ExerciseRenderer from './ExerciseRenderer';
import ProgressBar from '@/components/ui/ProgressBar';
import { Target, Trophy, Dumbbell, BookOpen, CheckCircle2, XCircle, Lightbulb, Timer, Package, type LucideIcon } from 'lucide-react';

const TOTAL_QUESTIONS = 20;

interface QueueEntry {
  key: string;
  item: LoadedItem;
  exercise: ExerciseData;
}

type Phase = 'config' | 'running' | 'done';

function pickExercise(item: LoadedItem): ExerciseData {
  return item.exercises[Math.floor(Math.random() * item.exercises.length)];
}

/** Pick N random items spread across all blocks. */
function buildSimQueue(blocks: LoadedBlock[], count: number): QueueEntry[] {
  const allItems = blocks.flatMap((b) => b.items);
  const picked = shuffle(allItems).slice(0, count);
  return picked.map((item, i) => ({
    key: `sim-${item.id}-${i}`,
    item,
    exercise: pickExercise(item),
  }));
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface BlockScore {
  name: string;
  correct: number;
  total: number;
}

const DONE_ICONS: { min: number; Icon: LucideIcon }[] = [
  { min: 80, Icon: Trophy },
  { min: 50, Icon: Dumbbell },
  { min: 0, Icon: BookOpen },
];

function getDoneIcon(pct: number) {
  return DONE_ICONS.find((d) => pct >= d.min)!.Icon;
}

export default function SimulationSession({ blocks }: { blocks: LoadedBlock[] }) {
  const [phase, setPhase] = useState<Phase>('config');
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [scores, setScores] = useState<Record<string, { correct: number; total: number }>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (phase === 'running') {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  function start() {
    const q = buildSimQueue(blocks, TOTAL_QUESTIONS);
    setQueue(q);
    setIndex(0);
    setAnswered(null);
    setElapsed(0);
    setScores({});
    setPhase('running');
  }

  function handleSubmit(answer: string) {
    if (answered !== null) return;
    const current = queue[index];
    const correct = isAnswerCorrect(answer, current.exercise.correct_answer);
    setAnswered(correct);

    // Track per-block score
    setScores((prev) => {
      const blockName = current.item.blockName;
      const old = prev[blockName] || { correct: 0, total: 0 };
      return { ...prev, [blockName]: { correct: old.correct + (correct ? 1 : 0), total: old.total + 1 } };
    });
  }

  function saveSimResult(finalScores: typeof scores, finalElapsed: number) {
    try {
      const raw = localStorage.getItem('english-app-sim-history');
      const history = raw ? JSON.parse(raw) : [];
      const totalCorrect = Object.values(finalScores).reduce((s, v) => s + v.correct, 0);
      const totalQ = Object.values(finalScores).reduce((s, v) => s + v.total, 0);
      history.push({ date: new Date().toISOString(), score: totalCorrect, total: totalQ, elapsed: finalElapsed });
      localStorage.setItem('english-app-sim-history', JSON.stringify(history));
    } catch {}
  }

  function next() {
    setAnswered(null);
    if (index + 1 >= queue.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      saveSimResult(scores, elapsed);
      setPhase('done');
    } else {
      setIndex(index + 1);
    }
  }

  // ---------- CONFIG ----------
  if (phase === 'config') {
    return (
      <div className="px-4 pt-6">
        <Header />
        <div className="mt-6 rounded-[var(--radius-lg)] bg-surface p-5 shadow-ds-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <Target size={32} className="text-primary" />
          </div>
          <h2 className="mt-2 text-xl font-semibold font-display text-center">Teste seu inglês!</h2>
          <p className="mt-3 text-fg-muted text-center text-sm">
            {TOTAL_QUESTIONS} perguntas aleatórias de todos os blocos que você já estudou.
            O simulado <strong>não salva progresso</strong> — é só para praticar e medir seu nível.
          </p>
          <div className="mt-4 rounded-[var(--radius-md)] bg-primary-soft p-3">
            <p className="text-sm text-fg-brand flex items-center gap-2">
              <Package size={14} /> <strong>{blocks.length}</strong> blocos disponíveis
              <span className="mx-1">·</span>
              <Timer size={14} /> cronômetro ativo
            </p>
          </div>
        </div>
        <button onClick={start} className="mt-6 w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg">
          Iniciar simulado
        </button>
        <Link href="/" className="mt-3 block w-full rounded-[var(--radius-pill)] border border-border bg-surface py-3 text-center font-medium">
          Voltar
        </Link>
      </div>
    );
  }

  // ---------- DONE ----------
  if (phase === 'done') {
    const totalCorrect = Object.values(scores).reduce((sum, s) => sum + s.correct, 0);
    const totalQ = Object.values(scores).reduce((sum, s) => sum + s.total, 0);
    const pct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
    const DoneIcon = getDoneIcon(pct);

    const blockScores: BlockScore[] = Object.entries(scores)
      .map(([name, s]) => ({ name, correct: s.correct, total: s.total }))
      .sort((a, b) => b.total - a.total);

    return (
      <div className="px-4 pt-6 pb-10">
        <Header />
        <div className="mt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <DoneIcon size={32} className="text-primary" />
          </div>
          <h2 className="mt-3 text-2xl font-semibold font-display">Simulado concluído!</h2>
          <p className="mt-1 text-fg-muted flex items-center justify-center gap-1">
            <Timer size={14} /> Tempo: {formatTime(elapsed)}
          </p>
          <p className="mt-4 text-5xl font-bold text-primary">{pct}%</p>
          <p className="text-sm text-fg-muted">{totalCorrect} de {totalQ} corretas</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-sm text-fg">Resultado por bloco:</h3>
          <div className="mt-2 flex flex-col gap-2">
            {blockScores.map((bs) => {
              const bPct = Math.round((bs.correct / bs.total) * 100);
              return (
                <div key={bs.name} className="rounded-[var(--radius-lg)] bg-surface p-3 shadow-ds-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{bs.name}</span>
                    <span className="text-sm font-bold" style={{ color: bPct >= 80 ? 'var(--color-success)' : bPct >= 50 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                      {bPct}%
                    </span>
                  </div>
                  <div className="mt-1">
                    <ProgressBar value={bPct} color={bPct >= 80 ? 'green' : bPct >= 50 ? 'yellow' : 'red'} size="sm" />
                  </div>
                  <p className="mt-1 text-xs text-fg-muted">{bs.correct}/{bs.total} corretas</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-fg-muted">
          O simulado não afeta seu progresso de revisão.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <button onClick={start} className="w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg">
            Novo simulado
          </button>
          <Link href="/" className="w-full rounded-[var(--radius-pill)] border border-border bg-surface py-3 text-center font-medium">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  // ---------- RUNNING ----------
  const current = queue[index];
  if (!current) return null;

  return (
    <div className="px-4 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold font-display">Simulado</h1>
        <div className="flex items-center gap-3">
          <span className="rounded-[var(--radius-pill)] bg-primary-soft px-3 py-1 text-xs font-medium text-fg-brand flex items-center gap-1">
            <Timer size={12} /> {formatTime(elapsed)}
          </span>
          <Link href="/" className="text-2xl leading-none text-fg-muted" aria-label="Sair">×</Link>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar value={((index + (answered !== null ? 1 : 0)) / queue.length) * 100} color="blue" size="sm" />
        </div>
        <span className="text-xs text-fg-muted">{index + 1}/{queue.length}</span>
      </div>

      <p className="mt-2 text-xs text-fg-muted">Bloco: {current.item.blockName}</p>

      <div className="mt-4">
        <ExerciseRenderer
          key={current.key}
          item={current.item}
          exercise={current.exercise}
          disabled={answered !== null}
          onSubmit={handleSubmit}
        />
      </div>

      {answered === true && (
        <div className="mt-6 rounded-[var(--radius-lg)] border border-success bg-success-soft p-4">
          <p className="font-semibold text-success flex items-center gap-1.5">
            <CheckCircle2 size={18} /> Correto!
          </p>
          <p className="mt-1 text-sm text-fg-muted">{current.item.content_en}</p>
          <button onClick={next} className="mt-4 w-full rounded-[var(--radius-pill)] bg-success py-3 font-medium text-primary-fg">
            Continuar
          </button>
        </div>
      )}

      {answered === false && (
        <div className="mt-6 rounded-[var(--radius-lg)] border border-danger bg-danger-soft p-4">
          <p className="font-semibold text-danger flex items-center gap-1.5">
            <XCircle size={18} /> Incorreto
          </p>
          <p className="mt-1 text-sm text-fg-muted">
            Resposta correta: <strong>{current.exercise.correct_answer}</strong>
          </p>
          <p className="mt-1 text-sm text-fg-muted">{current.item.content_en}</p>
          {current.item.hint && (
            <p className="mt-2 text-xs text-fg-muted flex items-center gap-1">
              <Lightbulb size={12} /> {current.item.hint}
            </p>
          )}
          <button onClick={next} className="mt-4 w-full rounded-[var(--radius-pill)] bg-danger py-3 font-medium text-primary-fg">
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold font-display flex items-center gap-2">
        <Target size={20} className="text-primary" /> Simulado
      </h1>
      <Link href="/" className="text-2xl leading-none text-fg-muted" aria-label="Sair">×</Link>
    </div>
  );
}
