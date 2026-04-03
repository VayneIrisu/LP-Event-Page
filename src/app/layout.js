import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'LUMINA FEST 2026 — Where Light Meets Sound',
  description:
    'LUMINA FEST 2026 is the ultimate celebration of music, art, food, and technology. Three days of unforgettable experiences at Neon Park, Jakarta. April 18-20, 2026.',
  keywords: ['festival', 'music', 'art', 'event', 'lumina fest', 'jakarta', '2026'],
  openGraph: {
    title: 'LUMINA FEST 2026',
    description: 'Where Light Meets Sound — April 18-20, 2026 at Neon Park, Jakarta',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
