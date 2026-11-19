'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, RefreshCw, Target, CalendarCheck, Rocket, GraduationCap, type LucideIcon } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function WelcomePage() {
  const router = useRouter();

  function handleStart() {
    // Go to placement test first
    router.push('/placement-test');
  }

  function handleSkip() {
    try {
      localStorage.setItem('english-app-onboarded', 'true');
    } catch {}
    router.push('/');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-splash">
      <div className="max-w-md w-full text-center">
        {/* Logo / Hero */}
        <div className="w-24 h-24 rounded-[28px] bg-white/15 mx-auto mb-4 flex items-center justify-center">
          <Logo size={66} body="#FFFFFF" shaft="var(--color-accent)" />
        </div>
        <h1 className="text-3xl font-bold font-display text-white">Easy Idiomas</h1>
        <p className="text-white/90 mt-1 text-sm">Seu inglês, um passo de cada vez</p>

        {/* Explanation cards */}
        <div className="mt-8 space-y-4 text-left">
          <StepCard
            Icon={BookOpen}
            title="Blocos temáticos"
            description="Vocabulário e gramática organizados por temas do dia a dia — do básico ao avançado."
          />
          <StepCard
            Icon={RefreshCw}
            title="Repetição espaçada"
            description="O app decide quando você deve revisar. Intervalos de 24h → 7 dias → 21 dias garantem que o conteúdo vá para a memória de longo prazo."
          />
          <StepCard
            Icon={Target}
            title="Exercícios variados"
            description="Tradução, múltipla escolha, preencher lacunas e ordenar frases — cada item é praticado de formas diferentes."
          />
          <StepCard
            Icon={CalendarCheck}
            title="Sua semana, sem pressão"
            description="Cada dia de estudo fica marcado na semana. Faltou um dia? Ele só fica vazio — nada zera, nada se perde."
          />
        </div>

        {/* CTA — Placement test */}
        <button
          onClick={handleStart}
          className="flex items-center justify-center gap-2 w-full mt-8 bg-accent text-accent-fg font-semibold py-4 rounded-[var(--radius-pill)] text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-ds-md"
        >
          <GraduationCap size={20} /> Fazer teste de nível
        </button>

        <button
          onClick={handleSkip}
          className="block w-full text-sm text-white/90 hover:text-white py-3 mt-2 transition-colors"
        >
          Pular e começar como Iniciante <Rocket size={14} className="inline ml-1" />
        </button>

        <p className="text-xs text-white/90 mt-2 mb-8">
          Níveis: Iniciante • Intermediário • Avançado
        </p>
      </div>
    </div>
  );
}

function StepCard({ Icon, title, description }: { Icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex gap-3 bg-surface rounded-[var(--radius-lg)] border border-border p-4 shadow-ds-sm">
      <div className="w-10 h-10 rounded-[var(--radius-md)] bg-primary-soft flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-fg text-sm">{title}</h3>
        <p className="text-fg-muted text-sm mt-0.5">{description}</p>
      </div>
    </div>
  );
}
