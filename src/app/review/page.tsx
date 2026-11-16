'use client';

import { useEffect, useState } from 'react';
import NavBottom from '@/components/ui/NavBottom';
import Link from 'next/link';
import { getDueItems, ItemProgress } from '@/lib/progress-store';
import { getBlockById } from '@/lib/seed-loader';
import ReviewSession from '@/components/exercises/ReviewSession';
import { CheckCircle2, Play, BookOpen, Circle } from 'lucide-react';

export default function ReviewPage() {
  const [dueItems, setDueItems] = useState<ItemProgress[] | null>(null);
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    setDueItems(getDueItems());
  }, []);

  if (dueItems === null) {
    return (
      <div className="px-4 pt-6">
        <p className="text-fg-muted">Carregando...</p>
        <NavBottom />
      </div>
    );
  }

  if (reviewing && dueItems.length > 0) {
    return (
      <ReviewSession
        dueItems={dueItems}
        onFinish={() => {
          setDueItems(getDueItems());
          setReviewing(false);
        }}
      />
    );
  }

  // Group due items by block for display
  const byBlock = new Map<string, { blockName: string; count: number }>();
  for (const item of dueItems) {
    const block = getBlockById(item.blockId);
    const name = block?.name ?? `Bloco ${item.blockId}`;
    const existing = byBlock.get(item.blockId);
    if (existing) {
      existing.count++;
    } else {
      byBlock.set(item.blockId, { blockName: name, count: 1 });
    }
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold font-display">Revisão do dia</h1>

      {dueItems.length === 0 ? (
        <div className="mt-10 text-center">
          <div className="w-16 h-16 rounded-full bg-success-soft mx-auto flex items-center justify-center">
            <CheckCircle2 size={32} className="text-success" />
          </div>
          <h2 className="mt-3 text-xl font-semibold font-display">Tudo em dia!</h2>
          <p className="mt-2 text-fg-muted">
            Nenhum item para revisar agora. Estude novos blocos ou volte mais tarde.
          </p>
          <Link
            href="/blocks"
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-primary px-6 py-3 font-medium text-primary-fg"
          >
            <BookOpen size={18} /> Ver blocos
          </Link>
        </div>
      ) : (
        <>
          <p className="text-fg-muted mt-1">
            Você tem <span className="font-semibold text-primary">{dueItems.length} itens</span> para revisar
          </p>

          <div className="mt-4 flex flex-col gap-2">
            {Array.from(byBlock.entries()).map(([blockId, { blockName, count }]) => (
              <div key={blockId} className="flex items-center justify-between rounded-[var(--radius-lg)] bg-surface border border-border p-4 shadow-ds-sm">
                <div>
                  <p className="font-medium">{blockName}</p>
                  <p className="text-sm text-fg-muted">{count} {count === 1 ? 'item' : 'itens'}</p>
                </div>
                <Circle
                  size={14}
                  fill="currentColor"
                  className={count <= 3 ? 'text-success' : count <= 6 ? 'text-warning' : 'text-danger'}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setReviewing(true)}
            className="mt-6 w-full rounded-[var(--radius-pill)] bg-primary py-3 font-medium text-primary-fg flex items-center justify-center gap-2"
          >
            <Play size={18} fill="currentColor" /> Revisar {dueItems.length} itens
          </button>
        </>
      )}

      <NavBottom />
    </div>
  );
}
