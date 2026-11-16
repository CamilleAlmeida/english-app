'use client';

import { BlockType } from '@/types/database';
import { BookOpen, Brackets, Lock, CheckCircle2 } from 'lucide-react';

interface Props {
  name: string;
  type: BlockType;
  totalItems: number;
  completedItems: number;
  unlocked: boolean;
  onClick: () => void;
}

const CARD_COLORS: Record<BlockType, string> = {
  VOCAB: 'bg-card-1',
  GRAMMAR: 'bg-card-2',
};

const TYPE_CONFIG: Record<BlockType, { label: string; Icon: typeof BookOpen }> = {
  VOCAB: { label: 'Vocabulário', Icon: BookOpen },
  GRAMMAR: { label: 'Gramática', Icon: Brackets },
};

export default function BlockCard({ name, type, totalItems, completedItems, unlocked, onClick }: Props) {
  const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const { label, Icon } = TYPE_CONFIG[type];

  if (!unlocked) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface-2 p-4 opacity-60">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-fg-muted flex items-center gap-1">
              <Icon size={12} /> {label}
            </p>
            <p className="mt-0.5 font-semibold font-display">{name}</p>
          </div>
          <Lock size={20} className="text-fg-muted" />
        </div>
        <p className="mt-2 text-xs text-fg-muted">Em breve</p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-[var(--radius-lg)] border border-border ${CARD_COLORS[type]} p-4 text-left shadow-ds-sm transition hover:shadow-ds-md hover:border-primary`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-fg-muted flex items-center gap-1">
            <Icon size={12} /> {label}
          </p>
          <p className="mt-0.5 font-semibold font-display">{name}</p>
        </div>
        <span className="text-sm font-bold text-primary">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Stats */}
      <div className="mt-2 flex gap-3 text-xs text-fg-muted">
        <span>{completedItems}/{totalItems} itens</span>
        {pct === 100 && (
          <span className="text-success font-medium flex items-center gap-0.5">
            <CheckCircle2 size={12} /> Completo
          </span>
        )}
      </div>
    </button>
  );
}
