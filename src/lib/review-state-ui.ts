import type { ReviewState } from '@/types/database';

/**
 * Aparência dos estados de revisão — um lugar só, usado em todas as telas.
 * As cores foram escolhidas para diferirem em LUMINOSIDADE, não só em matiz:
 * quem tem daltonismo distingue a escada. O rótulo sempre acompanha a cor,
 * então nenhuma informação depende só dela.
 */
export const STATE_LABELS: Record<ReviewState, string> = {
  NOVA: 'Nova',
  '24H': '24h',
  '7D': '7 dias',
  '21D': '21 dias',
  DONE: 'Aprendida',
};

/** Cor sólida — barras, pontos, preenchimentos. */
export const STATE_BG: Record<ReviewState, string> = {
  NOVA: 'bg-surface-2',
  '24H': 'bg-danger',
  '7D': 'bg-accent',
  '21D': 'bg-info',
  DONE: 'bg-primary',
};

/** Versão clara + texto legível — etiquetas. */
export const STATE_CHIP: Record<ReviewState, string> = {
  NOVA: 'bg-surface-2 text-fg-muted border-border',
  '24H': 'bg-danger-soft text-danger border-danger/30',
  '7D': 'bg-accent-soft text-warning border-warning/30',
  '21D': 'bg-info-soft text-info border-info/30',
  DONE: 'bg-primary-soft text-fg-brand border-primary/30',
};

export const STATE_ORDER: ReviewState[] = ['NOVA', '24H', '7D', '21D', 'DONE'];
