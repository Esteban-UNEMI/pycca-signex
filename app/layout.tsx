import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import { withBasePath } from '@/lib/site-path';
import { ServiceWorkerRegister } from '@/components/service-worker-register';
import { ScrollReveal } from '@/components/scroll-reveal';
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600'], display: 'swap', variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'PYCCA — inspiración para disfrutar la vida',
  description: 'Experiencia de comercio unificado para hogar, tecnología y estilo de vida.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href={withBasePath('/manifest.webmanifest')} />
        <meta name="theme-color" content="#00539f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href={withBasePath('/icons/pycca-192.svg')} />
      </head>
      <body className={poppins.variable}>
        <ServiceWorkerRegister />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}

