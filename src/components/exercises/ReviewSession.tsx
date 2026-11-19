'use client';

import { useEffect, useRef, useState } from 'react';
import { ErrorType, ExerciseData } from '@/types/database';
import { LoadedItem, getBlockById } from '@/lib/seed-loader';
import { ItemProgress, recordAnswer } from '@/lib/progress-store';
import { recordStudyDay } from '@/lib/streak-store';
import { isAnswerCorrect, shuffle } from '@/lib/answer-check';
import ExerciseRenderer from './ExerciseRenderer';
import ErrorFeedback from '@/components/feedback/ErrorFeedback';
import ProgressBar from '@/components/ui/ProgressBar';
import { Trophy, Dumbbell, BookOpen, CheckCircle2, RefreshCw, type LucideIcon } from 'lucide-react';

interface ReviewEntry {
  key: string;
  item: LoadedItem;
  exercise: ExerciseData;
  blockId: string;
  isRetry: boolean;
}

interface AnswerResult {
  correct: boolean;
  answer: string;
  timeMs: number;
}

function pickExercise(item: LoadedItem, avoid?: ExerciseData): ExerciseData {
  const options = item.exercises.filter((e) => e !== avoid);
  const pool = options.length > 0 ? options : item.exercises;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildReviewQueue(dueItems: ItemProgress[]): ReviewEntry[] {
  const entries: ReviewEntry[] = [];

  for (const progress of shuffle([...dueItems])) {
    const block = getBlockById(progress.blockId);
    if (!block) continue;
    const item = block.items.find((i) => i.id === progress.itemId);
    if (!item) continue;

    entries.push({
      key: item.id,
      item,
      exercise: pickExercise(item),
      blockId: progress.blockId,
      isRetry: false,
    });
  }

  return entries;
}

const DONE_ICONS: { min: number; Icon: LucideIcon }[] = [
  { min: 80, Icon: Trophy },
  { min: 50, Icon: Dumbbell },
  { min: 0, Icon: BookOpen },
];

function getDoneIcon(pct: number) {
  return DONE_ICONS.find((d) => pct >= d.min)!.Icon;
}

export default function ReviewSession({
  dueItems,
  onFinish,
}: {
  dueItems: ItemProgress[];
  onFinish: () => void;
}) {
  const [queue, setQueue] = useState<ReviewEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [phase, setPhase] = useState<'loading' | 'exercise' | 'done'>('loading');
  const startRef = useRef(0);

  useEffect(() => {
    setQueue(buildReviewQueue(dueItems));
    setPhase('exercise');
  }, [dueItems]);

  useEffect(() => {
    startRef.current = Date.now();
  }, [index, phase]);

  const current = queue[index];

  function handleSubmit(answer: string) {
    if (result || !current) return;
    const timeMs = Date.now() - startRef.current;
    const correct = isAnswerCorrect(answer, current.exercise.correct_answer);
    setResult({ correct, answer, timeMs });

    if (!current.isRetry) {
      setStats((s) => ({
        ...s,
        correct: s.correct + (correct ? 1 : 0),
        wrong: s.wrong + (correct ? 0 : 1),
      }));

      if (correct) {
        recordAnswer(current.item.id, current.blockId, true);
      }
    }

    if (!correct && !current.isRetry) {
      setQueue((q) => [
        ...q,
        {
          key: `${current.item.id}-retry`,
          item: current.item,
          exercise: pickExercise(current.item, current.exercise),
          blockId: current.blockId,
          isRetry: true,
        },
      ]);
    }
  }

  function next(errorType?: ErrorType) {
    if (errorType && !current.isRetry) {
      recordAnswer(current.item.id, current.blockId, false, errorType);
    }
    setResult(null);
    if (index + 1 >= queue.length) {
      recordStudyDay();
      setPhase('done');
    } else {
      setIndex(index + 1);
    }
  }

  if (phase === 'loading') {
    return <p className="px-4 pt-10 text-center text-fg-muted">Carregando revisão...</p>;
  }

  if (phase === 'done') {
    const total = stats.correct + stats.wrong;
    const pct = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
    const DoneIcon = getDoneIcon(pct);
    return (
      <div className="px-4 pt-6">
        <h1 className="text-lg font-semibold font-display">Revisão concluída</h1>
        <div className="mt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <DoneIcon size={32} className="text-primary" />
          </div>
          <h2 className="mt-3 text-2xl font-semibold font-display">Revisão do dia feita!</h2>
          <p className="mt-6 text-5xl font-bold text-primary">{pct}%</p>
          <p className="text-sm text-fg-muted">de acerto</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-[var(--radius-lg)] bg-surface p-4 text-center shadow-ds-sm">
            <p className="text-2xl font-bold text-success flex items-center justify-center gap-1">
              <CheckCircle2 size={18} /> {stats.correct}
            </p>
            <p className="text-xs text-fg-muted">Acertos</p>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-surface p-4 text-center shadow-ds-sm">
            <p className="text-2xl font-bold text-danger flex items-center justify-center gap-1">
              <CheckCircle2 size={18} /> {stats.wrong}
            </p>
            <p className="text-xs text-fg-muted">Erros</p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-fg-muted flex items-center justify-center gap-1">
          <CheckCircle2 size={12} className="text-success" /> Progresso atualizado! Itens corretos avançam no ciclo de revisão.
        </p>
        <button
          onClick={onFinish}
          className="mt-6 w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg"
        >
          Voltar
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="flex min-h-[100dvh] flex-col px-4 pt-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold font-display">Revisão</h1>
        <button onClick={onFinish} className="text-2xl leading-none text-fg-muted" aria-label="Sair">
          ×
        </button>
      </div>
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
      <p className="mt-2 text-xs text-fg-muted">
        Bloco: {current.item.blockName}
      </p>

      {/* Conteúdo ancorado embaixo: o que se toca fica na zona do polegar */}
      <div className="flex flex-1 flex-col justify-end gap-5 pt-6">
        <ExerciseRenderer
          key={current.key}
          item={current.item}
          exercise={current.exercise}
          disabled={result !== null}
          onSubmit={handleSubmit}
        />

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
    </div>
  );
}
