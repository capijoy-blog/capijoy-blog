import '@/styles/globals.css';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {getSiteBaseUrl} from '@/lib/urls';

export const metadata: Metadata = {
  title: 'Capí Joy — música, palavra e verdade que transformam',
  description:
    'Site oficial de Capí Joy: música, palavra e projetos que unem liberdade, paz e fé prática. Conteúdo para ouvir, ler e viver com mais propósito.',
  metadataBase: new URL(getSiteBaseUrl()),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--page-bg)] text-[var(--page-text)] antialiased transition-colors">
        {children}
      </body>
    </html>
  );
}
