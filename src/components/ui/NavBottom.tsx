'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, RefreshCw, BarChart3, FileSearch, LogOut, type LucideIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const links: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: '/', label: 'Início', Icon: Home },
  { href: '/blocks', label: 'Blocos', Icon: BookOpen },
  { href: '/review', label: 'Revisão', Icon: RefreshCw },
  { href: '/reference', label: 'Consulta', Icon: FileSearch },
  { href: '/dashboard', label: 'Painel', Icon: BarChart3 },
];

export default function NavBottom() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-md">
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center py-2.5 text-xs font-medium transition-colors ${
                active ? 'text-primary' : 'text-fg-muted'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-1 flex-col items-center py-2.5 text-xs font-medium text-fg-muted transition-colors hover:text-danger"
        >
          <LogOut size={22} strokeWidth={1.8} />
          Sair
        </button>
      </div>
    </nav>
  );
}
