'use client';

import { useState } from 'react';
import { ErrorType } from '@/types/database';
import { LoadedItem } from '@/lib/seed-loader';
import { suggestErrorType } from '@/lib/spaced-repetition';
import { getRandomAttentionPhrase } from '@/lib/heuristic';
import { XCircle, BookOpen, Eye, Ruler, Lightbulb } from 'lucide-react';

interface Props {
  item: LoadedItem;
  correctAnswer: string;
  userAnswer: string;
  responseTimeMs: number;
  onContinue: (errorType: ErrorType) => void;
}

export default function ErrorFeedback({ item, correctAnswer, userAnswer, responseTimeMs, onContinue }: Props) {
  const [choice, setChoice] = useState<ErrorType | null>(null);
  const [phrase] = useState(getRandomAttentionPhrase);
  const suggestion = suggestErrorType(responseTimeMs);
  const seconds = (responseTimeMs / 1000).toFixed(1);

  return (
    <div className="rounded-[var(--radius-lg)] border border-danger bg-danger-soft p-4">
      <p className="font-semibold text-danger flex items-center gap-1.5">
        <XCircle size={18} /> Não foi dessa vez
      </p>
      <p className="mt-2 text-sm text-fg-muted">
        Sua resposta: <span className="line-through">{userAnswer}</span>
      </p>
      <p className="text-sm text-fg">
        Correta: <span className="font-semibold">{correctAnswer}</span>
      </p>

      {!choice && (
        <div className="mt-4">
          <p className="text-sm font-medium">O que aconteceu?</p>
          {suggestion && (
            <p className="mt-1 text-xs text-fg-muted">
              Você respondeu em {seconds}s — parece que foi{' '}
              <strong>{suggestion === 'ATTENTION' ? 'atenção' : 'conteúdo'}</strong>.
            </p>
          )}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setChoice('CONTENT')}
              className={`rounded-[var(--radius-lg)] border bg-surface py-3 text-sm font-medium flex items-center justify-center gap-1.5 ${
                suggestion === 'CONTENT' ? 'border-primary ring-2 ring-primary-soft' : 'border-border'
              }`}
            >
              <BookOpen size={16} /> Não sabia
            </button>
            <button
              onClick={() => setChoice('ATTENTION')}
              className={`rounded-[var(--radius-lg)] border bg-surface py-3 text-sm font-medium flex items-center justify-center gap-1.5 ${
                suggestion === 'ATTENTION' ? 'border-primary ring-2 ring-primary-soft' : 'border-border'
              }`}
            >
              <Eye size={16} /> Foi desatenção
            </button>
          </div>
        </div>
      )}

      {choice === 'CONTENT' && (
        <div className="mt-4 rounded-[var(--radius-lg)] bg-surface p-3 text-sm">
          <p className="font-medium flex items-center gap-1.5">
            <BookOpen size={16} className="text-primary" /> Vamos revisar
          </p>
          <p className="mt-2">
            <span className="text-fg-muted">PT:</span> {item.content_pt}
            <br />
            <span className="text-fg-muted">EN:</span> <strong>{item.content_en}</strong>
          </p>
          {item.grammar_rule && (
            <p className="mt-2 rounded-[var(--radius-md)] bg-info-soft p-2 text-fg-brand flex items-center gap-1.5">
              <Ruler size={14} className="shrink-0" /> {item.grammar_rule}
            </p>
          )}
          {item.hint && (
            <p className="mt-2 text-fg-muted flex items-center gap-1.5">
              <Lightbulb size={14} className="shrink-0" /> {item.hint}
            </p>
          )}
        </div>
      )}

      {choice === 'ATTENTION' && (
        <div className="mt-4 rounded-[var(--radius-lg)] bg-surface p-3 text-sm">
          <p>{phrase}</p>
        </div>
      )}

      {choice && (
        <button
          onClick={() => onContinue(choice)}
          className="mt-4 w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg"
        >
          Continuar
        </button>
      )}
    </div>
  );
}
