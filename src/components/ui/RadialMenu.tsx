'use client';

import { useState, useEffect, useRef, FC, MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

interface RadialMenuItem {
  id: string;
  label: string;
  icon: FC<LucideProps>;
  href: string;
}

interface RadialMenuProps {
  items: RadialMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: RadialMenuItem) => void;
  position?: { top: number; left: number };
  source: 'quicklinks' | 'cursor';
}

const RadialMenu: FC<RadialMenuProps> = ({ items, isOpen, onClose, onSelect, position, source }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  if (!isClient || !isOpen) {
    return null;
  }

  const radius = 120; // Radius of the circle
  const angleStep = 360 / items.length;

  const handleItemClick = (e: ReactMouseEvent, item: RadialMenuItem) => {
    e.preventDefault();
    onSelect(item);
    onClose();
    router.push(item.href);
  };
  
  const menuStyles: React.CSSProperties =
    source === 'cursor' && position
      ? { top: `${position.top}px`, left: `${position.left}px` }
      : {};

  return (
    <div
      ref={menuRef}
      className={cn(
        "radial-menu fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
        isOpen ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={cn(
            "radial-container absolute transition-all duration-300 pointer-events-auto",
            isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0",
            source === 'quicklinks' ? 'relative -top-1/2 left-1/2 -translate-x-1/2 -translate-y-full' : ''
        )}
        style={menuStyles}
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div 
              className="absolute w-full h-full rounded-full shadow-2xl border-2 border-white/10"
              style={{
                backgroundColor: 'rgba(22, 24, 29, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                maskImage: 'radial-gradient(circle, transparent 40%, black 41%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 41%)',
              }}
            ></div>
          {items.map((item, index) => {
            const angle = angleStep * index - 90; // Start from top
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <Link
                href={item.href}
                key={item.id}
                onClick={(e) => handleItemClick(e, item)}
                className="radial-item group absolute w-24 h-24 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  top: '50%',
                  left: '50%',
                }}
              >
                <div className="relative flex items-center justify-center w-16 h-16">
                    <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-90 group-hover:scale-100"></div>
                    <div className="absolute inset-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-90 group-hover:scale-100 blur-md"></div>
                    <item.icon className="w-8 h-8 text-primary-foreground/80 group-hover:text-white transition-colors duration-200" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground mt-1 transition-colors duration-200">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadialMenu;
