'use client';

import { useState } from 'react';
import { ExerciseData } from '@/types/database';
import { LoadedItem } from '@/lib/seed-loader';
import { blankOut, shuffle } from '@/lib/answer-check';
import { Lightbulb } from 'lucide-react';

interface Props {
  item: LoadedItem;
  exercise: ExerciseData;
  disabled: boolean;
  onSubmit: (answer: string) => void;
}

const LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Escolha a tradução',
  FILL_GAP: 'Complete a frase',
  ORDER_SENTENCE: 'Monte a frase',
  CORRECT_ERROR: 'Corrija o erro',
  TRANSLATE: 'Traduza para o inglês',
  COMPLETE_DIALOGUE: 'Complete o diálogo',
};

export default function ExerciseRenderer({ item, exercise, disabled, onSubmit }: Props) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-fg-brand">
          {LABELS[exercise.type]}
        </p>
        {item.hint && !disabled && (
          <button
            onClick={() => setShowHint(!showHint)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-[var(--radius-pill)] transition-colors ${
              showHint
                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                : 'bg-surface-2 text-fg-muted hover:text-fg border border-transparent'
            }`}
          >
            <Lightbulb size={13} />
            Dica
          </button>
        )}
      </div>

      {showHint && item.hint && (
        <div className="mt-2 flex items-start gap-2 rounded-[var(--radius-md)] bg-amber-50 border border-amber-200 px-3 py-2">
          <Lightbulb size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">{item.hint}</p>
        </div>
      )}

      <div className="mt-3">
        {exercise.type === 'MULTIPLE_CHOICE' && (
          <MultipleChoice item={item} exercise={exercise} disabled={disabled} onSubmit={onSubmit} />
        )}
        {exercise.type === 'FILL_GAP' && (
          <FillGap item={item} exercise={exercise} disabled={disabled} onSubmit={onSubmit} />
        )}
        {exercise.type === 'ORDER_SENTENCE' && (
          <OrderSentence item={item} exercise={exercise} disabled={disabled} onSubmit={onSubmit} />
        )}
        {exercise.type === 'CORRECT_ERROR' && (
          <TextAnswer
            prompt={exercise.error_sentence ?? ''}
            subtitle="Esta frase tem um erro. Reescreva corretamente:"
            initialValue={exercise.error_sentence ?? ''}
            disabled={disabled}
            onSubmit={onSubmit}
          />
        )}
        {exercise.type === 'TRANSLATE' && (
          <TextAnswer prompt={item.content_pt} disabled={disabled} onSubmit={onSubmit} />
        )}
        {exercise.type === 'COMPLETE_DIALOGUE' && (
          <TextAnswer
            prompt={exercise.dialogue_prompt ?? item.content_pt}
            subtitle="Escreva a resposta em inglês:"
            disabled={disabled}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

// ---------- Multiple choice ----------

function MultipleChoice({ item, exercise, disabled, onSubmit }: Props) {
  const [options] = useState(() => shuffle(exercise.options ?? []));
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <p className="text-2xl font-semibold font-display">{item.content_pt}</p>
      <OptionList
        options={options}
        selected={selected}
        disabled={disabled}
        onPick={(opt) => {
          setSelected(opt);
          onSubmit(opt);
        }}
      />
    </div>
  );
}

// ---------- Fill the gap ----------

function FillGap({ item, exercise, disabled, onSubmit }: Props) {
  const [options] = useState(() => shuffle(exercise.options ?? []));
  const [selected, setSelected] = useState<string | null>(null);
  const sentence = blankOut(item.content_en, exercise.correct_answer);

  if (options.length === 0) {
    return <TextAnswer prompt={sentence} subtitle={item.content_pt} disabled={disabled} onSubmit={onSubmit} />;
  }

  return (
    <div>
      <p className="text-2xl font-semibold font-display">{sentence}</p>
      <p className="mt-1 text-sm text-fg-muted">{item.content_pt}</p>
      <OptionList
        options={options}
        selected={selected}
        disabled={disabled}
        onPick={(opt) => {
          setSelected(opt);
          onSubmit(opt);
        }}
      />
    </div>
  );
}

// ---------- Order the sentence ----------

function OrderSentence({ item, exercise, disabled, onSubmit }: Props) {
  const [pool] = useState(() =>
    shuffle((exercise.scrambled_words ?? []).map((word, idx) => ({ word, idx })))
  );
  const [picked, setPicked] = useState<number[]>([]);

  const pickedWords = picked.map((idx) => pool.find((p) => p.idx === idx)!.word);
  const allPicked = picked.length === pool.length;

  return (
    <div>
      <p className="text-2xl font-semibold font-display">{item.content_pt}</p>

      {/* Answer area */}
      <div className="mt-5 flex min-h-14 flex-wrap gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-border bg-surface p-3">
        {picked.length === 0 && (
          <span className="text-sm text-fg-muted">Toque nas palavras abaixo na ordem certa</span>
        )}
        {picked.map((idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => setPicked(picked.filter((p) => p !== idx))}
            className="rounded-[var(--radius-md)] bg-primary-soft px-3 py-1.5 text-fg-brand font-medium"
          >
            {pool.find((p) => p.idx === idx)!.word}
          </button>
        ))}
      </div>

      {/* Word pool */}
      <div className="mt-4 flex flex-wrap gap-2">
        {pool.map(({ word, idx }) => {
          const used = picked.includes(idx);
          return (
            <button
              key={idx}
              disabled={disabled || used}
              onClick={() => setPicked([...picked, idx])}
              className={`rounded-[var(--radius-md)] border px-3 py-1.5 transition ${
                used ? 'border-surface-2 bg-surface-2 text-transparent' : 'border-border bg-surface hover:bg-surface-2'
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {!disabled && (
        <button
          disabled={!allPicked}
          onClick={() => onSubmit(pickedWords.join(' '))}
          className="mt-6 w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg disabled:opacity-40"
        >
          Verificar
        </button>
      )}
    </div>
  );
}

// ---------- Shared: text answer ----------

function TextAnswer({
  prompt,
  subtitle,
  initialValue = '',
  disabled,
  onSubmit,
}: {
  prompt: string;
  subtitle?: string;
  initialValue?: string;
  disabled: boolean;
  onSubmit: (answer: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div>
      {subtitle && <p className="mb-1 text-sm text-fg-muted">{subtitle}</p>}
      <p className="text-2xl font-semibold font-display">{prompt}</p>
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) onSubmit(value);
        }}
      >
        <input
          autoFocus
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          placeholder="Digite em inglês..."
          className="w-full rounded-[var(--radius-lg)] border border-border bg-surface px-4 py-3 text-lg outline-none focus:border-primary disabled:bg-surface-2 text-fg"
        />
        {!disabled && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="mt-4 w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg disabled:opacity-40"
          >
            Verificar
          </button>
        )}
      </form>
    </div>
  );
}

// ---------- Shared: option buttons ----------

function OptionList({
  options,
  selected,
  disabled,
  onPick,
}: {
  options: string[];
  selected: string | null;
  disabled: boolean;
  onPick: (opt: string) => void;
}) {
  return (
    <div className="mt-5 flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          disabled={disabled}
          onClick={() => onPick(opt)}
          className={`rounded-[var(--radius-lg)] border px-4 py-3 text-left transition ${
            selected === opt ? 'border-primary bg-primary-soft' : 'border-border bg-surface hover:bg-surface-2'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
