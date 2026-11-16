import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'English App',
  description: 'Aprenda inglês com repetição espaçada',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-bg text-fg font-sans">
        <AuthProvider>
          <main className="flex-1 pb-20 max-w-md mx-auto w-full">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
