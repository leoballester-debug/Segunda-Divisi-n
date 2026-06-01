import type {Metadata} from 'next';
import { Inter, Asap_Condensed } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const asapCondensed = Asap_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Segunda División — Marketplace de Artículos de Fútbol de Segunda Mano',
  description: 'Un marketplace de artículos de fútbol de segunda mano para aficionados, diseñado con estética deportiva.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${asapCondensed.variable}`}>
      <body suppressHydrationWarning className="font-body selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

