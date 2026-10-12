import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600'], display: 'swap', variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'PYCCA — inspiración para disfrutar la vida',
  description: 'Experiencia de comercio unificado para hogar, tecnología y estilo de vida.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
