'use client';
import type { Metadata } from 'next';
import { I18nProvider } from '@/contexts/I18nContext';
import { Toaster } from "@/components/ui/toaster"
import { NoiseBackground } from '@/components/layout/NoiseBackground';
import './globals.css';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>A Project By Ahmed Badawy</title>
        <meta name="description" content="Mechatronics & Robotics Portfolio" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-body antialiased">
        <I18nProvider>
          <NoiseBackground />
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
