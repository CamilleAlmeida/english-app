'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBottom from '@/components/ui/NavBottom';
import Link from 'next/link';
import { getDueItems, getProgressStats } from '@/lib/progress-store';
import { getWeekActivity, type WeekActivity } from '@/lib/streak-store';
import {
  Play, BookOpen, Target, Lightbulb, Check,
  FileSearch, GraduationCap, RefreshCw,
} from 'lucide-react';

interface HomeStats {
  learned: number;
  inReview: number;
  withErrors: number;
  pendingReviews: number;
}

export default function HomePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState<HomeStats>({
    learned: 0,
    inReview: 0,
    withErrors: 0,
    pendingReviews: 0,
  });
  const [greeting, setGreeting] = useState('Olá');
  const [week, setWeek] = useState<WeekActivity | null>(null);

  useEffect(() => {
    try {
      const onboarded = localStorage.getItem('english-app-onboarded');
      if (!onboarded) {
        router.replace('/welcome');
        return;
      }
    } catch {}

    setReady(true);

    const progressStats = getProgressStats();
    const dueItems = getDueItems();

    setStats({
      learned: progressStats.learned,
      inReview: progressStats.inReview,
      withErrors: progressStats.withErrors,
      pendingReviews: dueItems.length,
    });

    setWeek(getWeekActivity());

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, [router]);

  if (!ready) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold font-display">{greeting} 👋</h1>
      {stats.pendingReviews > 0 ? (
        <p className="text-fg-muted mt-1">
          Você tem{' '}
          <span className="font-semibold text-primary">
            {stats.pendingReviews} {stats.pendingReviews === 1 ? 'revisão' : 'revisões'}
          </span>{' '}
          {stats.pendingReviews === 1 ? 'pendente' : 'pendentes'} hoje
        </p>
      ) : (
        <p className="text-fg-muted mt-1">Tudo em dia! Que tal estudar um bloco novo?</p>
      )}

      {/* Atividade da semana — acumula, nunca zera */}
      {week && (
        <section className="mt-5 rounded-[var(--radius-lg)] border border-border bg-surface p-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-fg">Sua semana</h2>
            <span className="text-xs text-fg-muted">
              {week.studiedThisWeek} de 7 dias
            </span>
          </div>

          <ul className="mt-3 flex justify-between gap-1.5">
            {week.days.map((d) => (
              <li key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  aria-label={`${d.label}${d.studied ? ': estudou' : d.isToday ? ': hoje' : ''}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs transition-colors ${
                    d.studied
                      ? 'border-primary bg-primary text-primary-fg'
                      : d.isToday
                        ? 'border-primary border-dashed bg-primary-soft text-primary'
                        : d.isFuture
                          ? 'border-border bg-surface-2 opacity-50'
                          : 'border-border bg-surface-2'
                  }`}
                >
                  {d.studied && <Check size={16} strokeWidth={3} />}
                </span>
                <span className={`text-[10px] ${d.isToday ? 'font-semibold text-fg' : 'text-fg-muted'}`}>
                  {d.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-fg-muted">
            {week.totalDays === 0
              ? 'Seu primeiro dia começa quando você quiser.'
              : `${week.totalDays} ${week.totalDays === 1 ? 'dia' : 'dias'} de estudo no total.`}
          </p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-3 mt-5">
        <StatCard value={stats.pendingReviews} label="Para revisar hoje" color="text-primary" Icon={RefreshCw} />
        <StatCard value={stats.learned} label="Já aprendidas" color="text-success" Icon={GraduationCap} />
      </div>

      {stats.pendingReviews > 0 ? (
        <Link
          href="/review"
          className="flex min-h-[52px] items-center justify-center gap-2 w-full bg-primary text-primary-fg font-semibold py-3 rounded-[var(--radius-pill)] mt-6 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Play size={18} fill="currentColor" /> Começar revisão do dia
        </Link>
      ) : (
        <Link
          href="/blocks"
          className="flex min-h-[52px] items-center justify-center gap-2 w-full bg-primary text-primary-fg font-semibold py-3 rounded-[var(--radius-pill)] mt-6 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <BookOpen size={18} /> Estudar novos blocos
        </Link>
      )}

      <Link
        href="/simulation"
        className="flex min-h-[48px] items-center justify-center gap-2 w-full border border-primary bg-surface text-fg-brand font-medium py-3 rounded-[var(--radius-pill)] mt-3 hover:bg-primary-soft active:scale-[0.98] transition-all"
      >
        <Target size={18} /> Fazer simulado
      </Link>

      <Link
        href="/reference"
        className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-border bg-surface py-3 font-medium text-fg transition-all hover:bg-surface-2 active:scale-[0.98]"
      >
        <FileSearch size={18} /> Consultar material
      </Link>

      <div className="mt-6 mb-2">
        <h2 className="text-sm font-semibold text-fg-muted mb-2">Dica</h2>
        <div className="bg-surface rounded-[var(--radius-lg)] border border-border p-4">
          <p className="text-sm text-fg-muted flex items-start gap-2">
            <Lightbulb size={16} className="text-warning flex-shrink-0 mt-0.5" />
            <span>
              {stats.pendingReviews > 0
                ? 'Faça suas revisões primeiro — a repetição espaçada funciona melhor quando você revisa no momento certo!'
                : 'Estudar um pouco todo dia é mais eficiente do que estudar muito de vez em quando.'}
            </span>
          </p>
        </div>
      </div>

      <NavBottom />
    </div>
  );
}

function StatCard({
  value,
  label,
  color,
  Icon,
}: {
  value: string | number;
  label: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="bg-surface rounded-[var(--radius-lg)] border border-border p-4 text-center shadow-ds-sm">
      <Icon size={20} className={`${color} mx-auto mb-1`} />
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
      <p className="text-xs text-fg-muted mt-1">{label}</p>
    </div>
  );
}
