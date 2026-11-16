'use client';

import { useRouter } from 'next/navigation';
import { Brain, BookOpen, RefreshCw, Target, Flame, Rocket, type LucideIcon } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

  function handleStart() {
    try {
      localStorage.setItem('english-app-onboarded', 'true');
    } catch {}
    router.push('/');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-splash">
      <div className="max-w-md w-full text-center">
        {/* Logo / Hero */}
        <div className="w-20 h-20 rounded-full bg-primary-soft mx-auto mb-4 flex items-center justify-center">
          <Brain size={40} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-display text-fg">English App</h1>
        <p className="text-fg-muted mt-1 text-sm">Seu inglês, um passo de cada vez</p>

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
            Icon={Flame}
            title="Streak diário"
            description="Estude um pouquinho todo dia e veja seu streak crescer. Consistência é o segredo!"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className="flex items-center justify-center gap-2 w-full mt-8 bg-primary text-primary-fg font-semibold py-4 rounded-[var(--radius-pill)] text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-ds-md"
        >
          Começar agora <Rocket size={20} />
        </button>

        <p className="text-xs text-fg-muted mt-4 mb-8">
          Nível A2/B1 → B2/C1 • 100% gratuito • Funciona offline
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
