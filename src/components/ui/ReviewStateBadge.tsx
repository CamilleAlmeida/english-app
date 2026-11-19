import type { ReviewState } from '@/types/database';
import { STATE_CHIP, STATE_LABELS } from '@/lib/review-state-ui';

/** Etiqueta do intervalo de revisão. Cor + texto, nunca só cor. */
export default function ReviewStateBadge({
  state,
  className = '',
}: {
  state: ReviewState;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] border px-2.5 py-0.5 text-xs font-medium ${STATE_CHIP[state]} ${className}`}
    >
      {STATE_LABELS[state]}
    </span>
  );
}
