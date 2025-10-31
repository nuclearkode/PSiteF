'use client';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

export default function QuickLinks() {
  const { t } = useI18n();

  const tiles = [
    { href: '/resources', labelKey: 'res' },
    { href: '/media', labelKey: 'media' },
    { href: '/#projects', labelKey: 'proj' },
    { href: '/#about', labelKey: 'abt' },
  ];

  return (
    <section id="quick" className="py-10">
      <div className="inner max-w-[1280px] mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-5">
        {tiles.map((tile, index) => (
          <Link
            key={index}
            href={tile.href}
            className="tile bg-primary text-white rounded-4xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/10 flex items-end justify-between min-h-32"
          >
            <span className="font-black text-[clamp(18px,2.2vw,28px)] tracking-[.06em] uppercase font-headline">
              {t(tile.labelKey)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
