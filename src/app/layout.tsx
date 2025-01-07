import './globals.css';
import type { Metadata } from 'next';
import { ViewportLayout } from 'next/dist/lib/metadata/types/extra-types';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Liga COHAB',
  description: 'Aplicativo de gestão da Liga COHAB',
  // manifest: '/manifest.json',
};

export const viewport: ViewportLayout = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}