'use client';

import { useState, useEffect, useRef, FC, MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideProps, ArrowUp } from 'lucide-react';

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
  const [cursorAngle, setCursorAngle] = useState(0);

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleScroll = () => {
      if (isOpen) {
        onClose();
      }
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (menuRef.current && isOpen && source === 'cursor') {
        const menuRect = menuRef.current.getBoundingClientRect();
        const menuCenterX = menuRect.left + menuRect.width / 2;
        const menuCenterY = menuRect.top + menuRect.height / 2;
        const angle = Math.atan2(event.clientY - menuCenterY, event.clientX - menuCenterX) * (180 / Math.PI);
        setCursorAngle(angle + 90);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen, onClose, source]);


  if (!isClient || !isOpen) {
    return null;
  }

  const radius = 90; 
  const angleStep = 360 / items.length;

  const handleItemClick = (e: ReactMouseEvent, item: RadialMenuItem) => {
    e.preventDefault();
    onSelect(item);
    onClose();
    router.push(item.href);
  };
  
  const menuStyles: React.CSSProperties =
    source === 'cursor' && position
      ? { 
          top: `${position.top}px`, 
          left: `${position.left}px`,
          transform: 'translate(-50%, -50%)',
        }
      : {};

  return (
    <div
      ref={menuRef}
      className={cn(
        "radial-menu fixed z-50 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
        isOpen ? "opacity-100" : "opacity-0",
        source === 'cursor' ? 'top-0 left-0' : 'inset-0'
      )}
      style={source === 'cursor' && position ? menuStyles : {}}
    >
      <div
        className={cn(
            "radial-container transition-all duration-300 pointer-events-auto",
            isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0",
            source === 'quicklinks' ? 'relative -top-1/2 left-1/2 -translate-x-1/2 -translate-y-full' : 'absolute'
        )}
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
            
            {items.map((_, index) => {
              const angle = angleStep * index - (angleStep / 2);
              return (
                <div
                  key={`line-${index}`}
                  className="absolute left-1/2 top-0 w-px h-1/2 bg-white/10 origin-bottom"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    height: '50%',
                    clipPath: 'polygon(0 41%, 100% 41%, 100% 100%, 0 100%)',
                  }}
                />
              );
            })}
            
            {source === 'cursor' && (
              <div
                className="absolute w-4 h-4 text-white/50"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${cursorAngle}deg) translateY(-40px)`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.1s linear'
                }}
              >
                <ArrowUp size={16} />
              </div>
            )}


          {items.map((item, index) => {
            const angle = angleStep * index - 90;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <Link
                href={item.href}
                key={item.id}
                onClick={(e) => handleItemClick(e, item)}
                className="radial-item group absolute w-16 h-16 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  top: '50%',
                  left: '50%',
                }}
              >
                <div className="relative flex items-center justify-center w-12 h-12">
                    <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-90 group-hover:scale-100"></div>
                    <div className="absolute inset-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-90 group-hover:scale-100 blur-md"></div>
                    <item.icon className="w-6 h-6 text-primary-foreground/80 group-hover:text-white transition-colors duration-200" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground mt-0.5 transition-colors duration-200">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadialMenu;
