import type { Metadata } from 'next';
import { I18nProvider } from '@/contexts/I18nContext';
import { Toaster } from "@/components/ui/toaster"
import { NoiseBackground } from '@/components/layout/NoiseBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Project By Ahmed Badawy',
  description: 'Mechatronics & Robotics Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
