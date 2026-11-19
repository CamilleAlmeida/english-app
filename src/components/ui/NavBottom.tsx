'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, RefreshCw, BarChart3, type LucideIcon } from 'lucide-react';

/**
 * Quatro destinos, no máximo. Consulta virou atalho na Início e
 * Sair saiu daqui — era uma ação destrutiva encostada nas abas do dia a dia.
 */
const links: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: '/', label: 'Início', Icon: Home },
  { href: '/blocks', label: 'Blocos', Icon: BookOpen },
  { href: '/review', label: 'Revisão', Icon: RefreshCw },
  { href: '/dashboard', label: 'Painel', Icon: BarChart3 },
];

export default function NavBottom() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-md">
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                active ? 'text-primary' : 'text-fg-muted'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
