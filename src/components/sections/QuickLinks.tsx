'use client';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import RadialMenu from '@/components/ui/RadialMenu';
import { useState } from 'react';
import { Cpu, Binary, CircuitBoard, Cog } from 'lucide-react';

export default function QuickLinks() {
  const { t } = useI18n();
  const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false);

  const tiles = [
    { href: '/#projects', labelKey: 'proj' },
    { href: '/#about', labelKey: 'abt' },
    { href: '/resources', labelKey: 'res' },
    { href: '/media', labelKey: 'media' },
  ];

  const projectCategories = [
    { id: 'ai', label: 'AI', icon: Cpu, href: '#projects-ai' },
    { id: 'controls', label: 'Controls', icon: Binary, href: '#projects-controls' },
    { id: 'electronics', label: 'Electronics', icon: CircuitBoard, href: '#projects-electronics' },
    { id: 'mechanical', label: 'Mechanical', icon: Cog, href: '#projects-mechanical' },
  ];

  return (
    <section id="quick" className="py-10">
      <div className="inner max-w-[1280px] mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-5">
        {tiles.map((tile, index) => {
          if (tile.labelKey === 'proj') {
            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setIsRadialMenuOpen(true)}
                onMouseLeave={() => setIsRadialMenuOpen(false)}
              >
                <Link
                  href={tile.href}
                  className="tile bg-primary text-white rounded-4xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/10 flex items-end justify-between min-h-32 transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1"
                >
                  <span className="font-black text-[clamp(18px,2.2vw,28px)] tracking-[.06em] uppercase font-headline">
                    {t(tile.labelKey)}
                  </span>
                </Link>
                <RadialMenu
                  items={projectCategories}
                  isOpen={isRadialMenuOpen}
                  onClose={() => setIsRadialMenuOpen(false)}
                  onSelect={() => setIsRadialMenuOpen(false)}
                  source="quicklinks"
                />
              </div>
            );
          }
          return (
            <Link
              key={index}
              href={tile.href}
              className="tile bg-primary text-white rounded-4xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/10 flex items-end justify-between min-h-32 transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1"
            >
              <span className="font-black text-[clamp(18px,2.2vw,28px)] tracking-[.06em] uppercase font-headline">
                {t(tile.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
