'use client';

import { BlockType } from '@/types/database';
import { Lock, CheckCircle2 } from 'lucide-react';
import { getBlockIdentity, topicTileStyle } from '@/lib/block-identity';

interface Props {
  name: string;
  type: BlockType;
  totalItems: number;
  completedItems: number;
  unlocked: boolean;
  onClick: () => void;
}

const TYPE_LABEL: Record<BlockType, string> = {
  VOCAB: 'Vocabulário',
  GRAMMAR: 'Gramática',
};

export default function BlockCard({ name, type, totalItems, completedItems, unlocked, onClick }: Props) {
  const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const { Icon, topic } = getBlockIdentity(name, type);

  /** O ladrilho é a única coisa colorida do cartão. O resto fica neutro. */
  const tile = (muted = false) => (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 flex-none items-center justify-center rounded-[var(--radius-md)] border"
      style={muted ? undefined : topicTileStyle(topic)}
    >
      <Icon size={21} strokeWidth={1.9} />
    </span>
  );

  if (!unlocked) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface-2 p-4 opacity-60">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface text-fg-muted"
          >
            <Icon size={21} strokeWidth={1.9} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-fg-muted">{TYPE_LABEL[type]}</p>
            <p className="mt-0.5 truncate font-semibold font-display">{name}</p>
          </div>
          <Lock size={18} className="flex-none text-fg-muted" />
        </div>
        <p className="mt-2 text-xs text-fg-muted">Em breve</p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-left shadow-ds-sm transition hover:border-primary hover:shadow-ds-md"
    >
      <div className="flex items-center gap-3">
        {tile()}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-fg-muted">{TYPE_LABEL[type]}</p>
          <p className="mt-0.5 truncate font-semibold font-display">{name}</p>
        </div>
        <span className="flex-none text-sm font-bold text-fg-brand">{pct}%</span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-2 flex gap-3 text-xs text-fg-muted">
        <span>{completedItems}/{totalItems} itens</span>
        {pct === 100 && (
          <span className="flex items-center gap-0.5 font-medium text-success">
            <CheckCircle2 size={12} /> Completo
          </span>
        )}
      </div>
    </button>
  );
}
