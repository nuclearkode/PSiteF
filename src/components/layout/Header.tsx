'use client';

import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="fixed top-2 left-0 right-0 h-[60px] flex items-center justify-between px-gutter z-40 max-w-[1280px] mx-auto">
      <Link className="brand flex gap-2.5 items-center font-extrabold tracking-[-.02em]" href="#top" aria-label="Go to home/top">
        <span className="brand-dot w-3 h-3 rounded-full bg-[#78ffd1] shadow-[0_0_12px_rgba(120,255,209,0.6)]"></span>
        <span>{t('brand')}</span>
      </Link>
      <div className="header-actions flex gap-2.5 items-center">
        <ThemeToggle />
        <LangToggle />
      </div>
    </header>
  );
}
