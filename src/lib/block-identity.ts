import {
  ShowerHead, CookingPot, Briefcase, Sunrise, ShoppingBag, HeartPulse, Bus,
  UtensilsCrossed, Smile, Laptop, MessagesSquare, Presentation, Plane,
  Clapperboard, Shuffle, PenLine, Blocks, Repeat, Zap, History, FastForward,
  Palette, Users, Link as LinkIcon, Split, ArrowLeftRight, BookOpen, Brackets,
  type LucideIcon,
} from 'lucide-react';

/** Cores da paleta de tópicos. Não são tokens de interface — ver globals.css. */
export type Topic =
  | 'rose' | 'orange' | 'amber' | 'lime' | 'teal' | 'cyan' | 'sky'
  | 'blue' | 'indigo' | 'violet' | 'fuchsia' | 'pink' | 'clay' | 'slate';

export interface BlockIdentity {
  Icon: LucideIcon;
  topic: Topic;
}

/**
 * Cada bloco tem um ícone que diz do que ele trata e uma cor própria.
 * A cor vive SÓ no ladrilho do ícone — o cartão continua neutro.
 * Com 26 blocos coloridos, tingir o cartão inteiro viraria confete.
 */
const BY_NAME: Record<string, BlockIdentity> = {
  // Vocabulário — iniciante
  'Bathroom':             { Icon: ShowerHead,      topic: 'cyan' },
  'Kitchen':              { Icon: CookingPot,      topic: 'orange' },
  'Workplace':            { Icon: Briefcase,       topic: 'slate' },
  'Daily Routine':        { Icon: Sunrise,         topic: 'amber' },
  'Shopping':             { Icon: ShoppingBag,     topic: 'pink' },
  'Health & Body':        { Icon: HeartPulse,      topic: 'rose' },
  'Getting Around':       { Icon: Bus,             topic: 'blue' },
  'Food & Eating Out':    { Icon: UtensilsCrossed, topic: 'clay' },
  'Feelings & Opinions':  { Icon: Smile,           topic: 'violet' },
  'Tech & Online':        { Icon: Laptop,          topic: 'sky' },
  'Slang & Idioms':       { Icon: MessagesSquare,  topic: 'fuchsia' },

  // Vocabulário — intermediário
  'Business & Meetings':      { Icon: Presentation,  topic: 'indigo' },
  'Travel & Airport':         { Icon: Plane,         topic: 'sky' },
  'Entertainment & Media':    { Icon: Clapperboard,  topic: 'fuchsia' },

  // Vocabulário — avançado
  'Phrasal Verbs':    { Icon: Shuffle,  topic: 'lime' },
  'Formal Writing':   { Icon: PenLine,  topic: 'clay' },

  // Gramática — iniciante
  'Foundations':          { Icon: Blocks,      topic: 'slate' },
  'Daily Habits':         { Icon: Repeat,      topic: 'teal' },
  'Right Now':            { Icon: Zap,         topic: 'amber' },
  'Looking Back':         { Icon: History,     topic: 'clay' },
  "What's Next":          { Icon: FastForward, topic: 'blue' },
  'Describing Things':    { Icon: Palette,     topic: 'pink' },
  'People & Possession':  { Icon: Users,       topic: 'violet' },

  // Gramática — intermediário
  'Present Perfect':  { Icon: LinkIcon, topic: 'cyan' },
  'Conditionals':     { Icon: Split,    topic: 'orange' },

  // Gramática — avançado
  'Passive Voice':    { Icon: ArrowLeftRight, topic: 'indigo' },
};

const TOPICS: Topic[] = [
  'rose','orange','amber','lime','teal','cyan','sky',
  'blue','indigo','violet','fuchsia','pink','clay','slate',
];

/** Reserva estável para um bloco novo que ainda não esteja no mapa acima. */
function fallback(name: string, type: 'VOCAB' | 'GRAMMAR'): BlockIdentity {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return {
    Icon: type === 'GRAMMAR' ? Brackets : BookOpen,
    topic: TOPICS[h % TOPICS.length],
  };
}

export function getBlockIdentity(name: string, type: 'VOCAB' | 'GRAMMAR'): BlockIdentity {
  return BY_NAME[name] ?? fallback(name, type);
}

/** Estilo do ladrilho do ícone. A borda dá contorno sem precisar escurecer o fundo. */
export function topicTileStyle(topic: Topic): React.CSSProperties {
  return {
    background: `var(--topic-${topic}-soft)`,
    color: `var(--topic-${topic}-ink)`,
    borderColor: `color-mix(in srgb, var(--topic-${topic}-ink) 22%, transparent)`,
  };
}
