'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ErrorType, ExerciseData } from '@/types/database';
import { LoadedBlock, LoadedItem } from '@/lib/seed-loader';
import { isAnswerCorrect, shuffle } from '@/lib/answer-check';
import { recordAnswer } from '@/lib/progress-store';
import { recordStudyDay } from '@/lib/streak-store';
import ExerciseRenderer from './ExerciseRenderer';
import ErrorFeedback from '@/components/feedback/ErrorFeedback';
import ProgressBar from '@/components/ui/ProgressBar';
import { Trophy, Dumbbell, BookOpen, CheckCircle2, XCircle, RefreshCw, type LucideIcon } from 'lucide-react';

interface QueueEntry {
  key: string;
  item: LoadedItem;
  exercise: ExerciseData;
  isRetry: boolean;
}

interface AnswerResult {
  correct: boolean;
  answer: string;
  timeMs: number;
}

type Phase = 'loading' | 'intro' | 'exercise' | 'done';

function pickExercise(item: LoadedItem, avoid?: ExerciseData): ExerciseData {
  const options = item.exercises.filter((e) => e !== avoid);
  const pool = options.length > 0 ? options : item.exercises;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Easier items first; random order inside each difficulty level. */
function buildQueue(items: LoadedItem[]): QueueEntry[] {
  const ordered = [1, 2, 3].flatMap((level) => shuffle(items.filter((i) => i.difficulty === level)));
  return ordered.map((item) => ({ key: item.id, item, exercise: pickExercise(item), isRetry: false }));
}

function introSeenKey(blockId: string) {
  return `intro-seen-${blockId}`;
}

const DONE_ICONS: { min: number; Icon: LucideIcon }[] = [
  { min: 80, Icon: Trophy },
  { min: 50, Icon: Dumbbell },
  { min: 0, Icon: BookOpen },
];

function getDoneIcon(pct: number) {
  return DONE_ICONS.find((d) => pct >= d.min)!.Icon;
}

export default function StudySession({ block }: { block: LoadedBlock }) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, content: 0, attention: 0 });
  const startRef = useRef(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(introSeenKey(block.id)) === '1';
    } catch {}
    setQueue(buildQueue(block.items));
    setPhase(block.intro_card && !seen ? 'intro' : 'exercise');
  }, [block]);

  useEffect(() => {
    startRef.current = Date.now();
  }, [index, phase]);

  const current = queue[index];

  function startExercises() {
    try {
      localStorage.setItem(introSeenKey(block.id), '1');
    } catch {}
    setPhase('exercise');
  }

  function handleSubmit(answer: string) {
    if (result || !current) return;
    const timeMs = Date.now() - startRef.current;
    const correct = isAnswerCorrect(answer, current.exercise.correct_answer);
    setResult({ correct, answer, timeMs });

    if (!current.isRetry) {
      setStats((s) => ({ ...s, correct: s.correct + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));
      if (correct) {
        recordAnswer(current.item.id, block.id, true);
      }
    }

    if (!correct && !current.isRetry) {
      setQueue((q) => [
        ...q,
        { key: `${current.item.id}-retry`, item: current.item, exercise: pickExercise(current.item, current.exercise), isRetry: true },
      ]);
    }
  }

  function next(errorType?: ErrorType) {
    if (errorType && !current.isRetry) {
      setStats((s) => ({
        ...s,
        content: s.content + (errorType === 'CONTENT' ? 1 : 0),
        attention: s.attention + (errorType === 'ATTENTION' ? 1 : 0),
      }));
      recordAnswer(current.item.id, block.id, false, errorType);
    }
    setResult(null);
    if (index + 1 >= queue.length) {
      recordStudyDay();
      setPhase('done');
    } else {
      setIndex(index + 1);
    }
  }

  function restart() {
    setQueue(buildQueue(block.items));
    setIndex(0);
    setResult(null);
    setStats({ correct: 0, wrong: 0, content: 0, attention: 0 });
    setPhase('exercise');
  }

  // ---------- Render ----------

  if (phase === 'loading') {
    return <p className="px-4 pt-10 text-center text-fg-muted">Carregando...</p>;
  }

  if (phase === 'intro' && block.intro_card) {
    const intro = block.intro_card;
    return (
      <div className="px-4 pt-6">
        <Header blockName={block.name} />
        <div className="mt-6 rounded-[var(--radius-lg)] bg-surface p-5 shadow-ds-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-fg-brand">Antes de começar</p>
          <h2 className="mt-1 text-xl font-semibold font-display">{intro.title}</h2>
          <p className="mt-3 text-fg-muted">{intro.explanation}</p>
          <div className="mt-4 flex flex-col gap-2">
            {intro.examples.map((ex) => (
              <p key={ex} className="rounded-[var(--radius-md)] bg-info-soft px-3 py-2 text-sm text-fg-brand">
                {ex}
              </p>
            ))}
          </div>
        </div>
        <button onClick={startExercises} className="mt-6 w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg">
          Começar exercícios
        </button>
      </div>
    );
  }

  if (phase === 'done') {
    const total = stats.correct + stats.wrong;
    const pct = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
    const DoneIcon = getDoneIcon(pct);
    return (
      <div className="px-4 pt-6">
        <Header blockName={block.name} />
        <div className="mt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <DoneIcon size={32} className="text-primary" />
          </div>
          <h2 className="mt-3 text-2xl font-semibold font-display">Sessão concluída!</h2>
          <p className="mt-1 text-fg-muted">{block.name}</p>
          <p className="mt-6 text-5xl font-bold text-primary">{pct}%</p>
          <p className="text-sm text-fg-muted">de acerto na primeira tentativa</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Stat label="Acertos" value={stats.correct} color="text-success" Icon={CheckCircle2} />
          <Stat label="Erros" value={stats.wrong} color="text-danger" Icon={XCircle} />
          <Stat label="Conteúdo" value={stats.content} color="text-fg" Icon={BookOpen} />
          <Stat label="Atenção" value={stats.attention} color="text-fg" Icon={RefreshCw} />
        </div>
        <p className="mt-4 text-center text-xs text-fg-muted flex items-center justify-center gap-1">
          <CheckCircle2 size={12} className="text-success" /> Progresso salvo! Os itens entrarão na sua fila de revisão.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button onClick={restart} className="w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg">
            Estudar de novo
          </button>
          <Link href="/blocks" className="w-full rounded-[var(--radius-pill)] border border-border bg-surface py-3 text-center font-medium">
            Voltar aos blocos
          </Link>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="px-4 pt-6 pb-10">
      <Header blockName={block.name} />
      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar value={(index / queue.length) * 100} color="blue" size="sm" />
        </div>
        <span className="text-xs text-fg-muted">
          {index + 1}/{queue.length}
        </span>
      </div>
      {current.isRetry && (
        <p className="mt-3 inline-block rounded-[var(--radius-pill)] bg-warning-soft px-3 py-1 text-xs text-warning flex items-center gap-1 w-fit">
          <RefreshCw size={12} /> Revisando um erro
        </p>
      )}

      <div className="mt-6">
        <ExerciseRenderer
          key={current.key}
          item={current.item}
          exercise={current.exercise}
          disabled={result !== null}
          onSubmit={handleSubmit}
        />
      </div>

      {result?.correct && (
        <div className="mt-6 rounded-[var(--radius-lg)] border border-success bg-success-soft p-4">
          <p className="font-semibold text-success flex items-center gap-1.5">
            <CheckCircle2 size={18} /> Correto!
          </p>
          <p className="mt-1 text-sm text-fg-muted">{current.item.content_en}</p>
          <button onClick={() => next()} className="mt-4 w-full rounded-[var(--radius-pill)] bg-success py-3 font-medium text-primary-fg">
            Continuar
          </button>
        </div>
      )}

      {result && !result.correct && (
        <div className="mt-6">
          <ErrorFeedback
            key={current.key}
            item={current.item}
            correctAnswer={current.exercise.correct_answer}
            userAnswer={result.answer}
            responseTimeMs={result.timeMs}
            onContinue={next}
          />
        </div>
      )}
    </div>
  );
}

function Header({ blockName }: { blockName: string }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold font-display">{blockName}</h1>
      <Link href="/blocks" className="text-2xl leading-none text-fg-muted" aria-label="Sair">
        ×
      </Link>
    </div>
  );
}

function Stat({ label, value, color, Icon }: { label: string; value: number; color: string; Icon: LucideIcon }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface p-4 text-center shadow-ds-sm">
      <p className={`text-2xl font-bold ${color} flex items-center justify-center gap-1`}>
        <Icon size={18} /> {value}
      </p>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  );
}
