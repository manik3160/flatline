import type { Metadata, Viewport } from 'next';
import { SupabaseProvider } from '@/components/providers/SupabaseProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flatline — AI Survival Party Game',
  description:
    'Survive the chaos. Or don\'t. A real-time multiplayer AI party game for Indian GenZ — type your survival plan, let the AI judge your fate.',
  keywords: ['party game', 'AI game', 'multiplayer', 'Indian', 'desi', 'survival'],
  openGraph: {
    title: 'Flatline — AI Survival Party Game',
    description: 'Survive the chaos. Or don\'t.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#ff2d2d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SupabaseProvider>
          <div className="game-wrapper">
            {children}
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
