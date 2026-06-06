import type { Metadata, Viewport } from 'next';
import { SupabaseProvider } from '@/components/providers/SupabaseProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flatline — AI Survival Party Game',
  description:
    'Survive the chaos. Or don\'t. A real-time multiplayer AI party game for Indian GenZ — type your survival plan, let the AI judge your fate.',
  keywords: ['party game', 'AI game', 'multiplayer', 'Indian', 'desi', 'survival'],
  metadataBase: new URL('https://flatline.vercel.app'), // Will automatically resolve to deployment URL if configured
  openGraph: {
    title: 'Flatline — AI Survival Party Game',
    description: 'Survive the chaos. Or don\'t.',
    url: 'https://flatline.vercel.app',
    siteName: 'Flatline',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flatline — AI Survival Party Game',
    description: 'Survive the chaos. Or don\'t.',
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
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
