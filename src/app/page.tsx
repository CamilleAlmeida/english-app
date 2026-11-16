'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBottom from '@/components/ui/NavBottom';
import Link from 'next/link';
import { getDueItems, getProgressStats } from '@/lib/progress-store';
import { getStreakInfo } from '@/lib/streak-store';
import {
  Flame, Play, BookOpen, Target, Lightbulb, Trophy,
  CheckCircle2, Clock, AlertTriangle, GraduationCap,
} from 'lucide-react';

interface HomeStats {
  learned: number;
  inReview: number;
  withErrors: number;
  pendingReviews: number;
}

interface StreakInfo {
  current: number;
  longest: number;
  studiedToday: boolean;
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
  const [streak, setStreak] = useState<StreakInfo>({ current: 0, longest: 0, studiedToday: false });

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

    setStreak(getStreakInfo());

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

      {/* Streak */}
      <div className="mt-5 bg-warning-soft rounded-[var(--radius-lg)] border border-warning/30 p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-warning/15 flex items-center justify-center">
          <Flame size={26} className="text-warning" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-warning">{streak.current}</span>
            <span className="text-sm text-fg-muted">{streak.current === 1 ? 'dia seguido' : 'dias seguidos'}</span>
          </div>
          <p className="text-xs text-fg-muted mt-0.5 flex items-center gap-1">
            {streak.studiedToday ? (
              <><CheckCircle2 size={13} className="text-success" /> Você já estudou hoje!</>
            ) : streak.current > 0 ? (
              <><Clock size={13} className="text-warning" /> Estude hoje para manter seu streak!</>
            ) : (
              'Comece a estudar para iniciar seu streak!'
            )}
          </p>
        </div>
        {streak.longest > 0 && (
          <div className="text-center">
            <Trophy size={16} className="text-warning mx-auto mb-0.5" />
            <p className="text-lg font-semibold text-warning">{streak.longest}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <StatCard value={stats.learned} label="Aprendidas" color="text-success" Icon={GraduationCap} />
        <StatCard value={stats.inReview} label="Em revisão" color="text-primary" Icon={Clock} />
        <StatCard value={stats.withErrors} label="Com erro" color="text-danger" Icon={AlertTriangle} />
        <StatCard value={stats.pendingReviews} label="Para revisar" color="text-warning" Icon={Target} />
      </div>

      {stats.pendingReviews > 0 ? (
        <Link
          href="/review"
          className="flex items-center justify-center gap-2 w-full bg-primary text-primary-fg font-medium py-3 rounded-[var(--radius-pill)] mt-6 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Play size={18} fill="currentColor" /> Começar revisão do dia
        </Link>
      ) : (
        <Link
          href="/blocks"
          className="flex items-center justify-center gap-2 w-full bg-success text-primary-fg font-medium py-3 rounded-[var(--radius-pill)] mt-6 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <BookOpen size={18} /> Estudar novos blocos
        </Link>
      )}

      <Link
        href="/simulation"
        className="flex items-center justify-center gap-2 w-full bg-info text-primary-fg font-medium py-3 rounded-[var(--radius-pill)] mt-3 hover:opacity-90 active:scale-[0.98] transition-all"
      >
        <Target size={18} /> Fazer simulado
      </Link>

      <div className="mt-6">
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
