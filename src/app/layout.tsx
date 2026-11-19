import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Easy Idiomas',
  description: 'Aprenda inglês com repetição espaçada',
  manifest: '/manifest.json',
  applicationName: 'Easy Idiomas',
  appleWebApp: {
    capable: true,
    title: 'Easy Idiomas',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0E7A52' },
    { media: '(prefers-color-scheme: dark)', color: '#061A14' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
