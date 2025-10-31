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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

    const handleMouseMove = (e: MouseEvent) => {
      if (!isOpen || !menuRef.current) return;
    
      const menuRect = menuRef.current.getBoundingClientRect();
      const menuCenterX = menuRect.left + menuRect.width / 2;
      const menuCenterY = menuRect.top + menuRect.height / 2;
    
      const dx = e.clientX - menuCenterX;
      const dy = e.clientY - menuCenterY;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
    
      const radius = menuRect.width / 2;
      const innerRadius = radius * 0.4;
    
      if (distance > innerRadius && distance < radius) {
        const angleStep = 360 / items.length;
        const normalizedAngle = (angle + angleStep / 2) % 360;
        const index = Math.floor(normalizedAngle / angleStep);
        setHoveredIndex(index);
      } else {
        setHoveredIndex(null);
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
  }, [isOpen, onClose, source, items.length]);


  if (!isClient || !isOpen) {
    return null;
  }

  const radius = 100; 
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
    
  const getPathForSegment = (index: number) => {
    const startAngle = angleStep * index - 90;
    const endAngle = startAngle + angleStep;
    const outerRadius = 128; 
    const innerRadius = 51;

    const startOuter = {
        x: outerRadius * Math.cos(startAngle * Math.PI / 180),
        y: outerRadius * Math.sin(startAngle * MathPI / 180)
    };
    const endOuter = {
        x: outerRadius * Math.cos(endAngle * Math.PI / 180),
        y: outerRadius * Math.sin(endAngle * Math.PI / 180)
    };
    const startInner = {
        x: innerRadius * Math.cos(startAngle * Math.PI / 180),
        y: innerRadius * Math.sin(startAngle * Math.PI / 180)
    };
    const endInner = {
        x: innerRadius * Math.cos(endAngle * Math.PI / 180),
        y: innerRadius * Math.sin(endAngle * Math.PI / 180)
    };

    const largeArcFlag = angleStep > 180 ? 1 : 0;

    return `M ${startOuter.x} ${startOuter.y} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y} L ${endInner.x} ${endInner.y} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y} Z`;
};

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
            "radial-container transition-all duration-300",
            isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0",
            source === 'quicklinks' ? 'relative -top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-auto' : 'absolute pointer-events-auto'
        )}
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div 
              className="absolute w-full h-full rounded-full"
              style={{
                backgroundColor: 'rgba(29, 30, 34, 0.95)',
                maskImage: 'radial-gradient(circle, transparent 40%, black 41%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 41%)',
              }}
            ></div>

            <div
                className="absolute w-full h-full rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 120, 255, 0.2) 0%, rgba(0, 120, 255, 0) 60%)',
                    clipPath: 'circle(40% at 50% 50%)'
                }}
            ></div>
            
            {items.map((_, index) => {
              const angle = angleStep * index - (angleStep / 2);
              return (
                <div
                  key={`line-${index}`}
                  className="absolute left-1/2 top-0 w-px h-1/2 bg-gray-600/70 origin-bottom"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    height: '50%',
                    clipPath: 'polygon(0 41%, 100% 41%, 100% 100%, 0 100%)',
                  }}
                />
              );
            })}
            
            <svg viewBox="-128 -128 256 256" className="absolute w-full h-full pointer-events-none">
              {items.map((_, index) => (
                <path 
                  key={`segment-${index}`}
                  d={getPathForSegment(index)}
                  fill={hoveredIndex === index ? '#0078F2' : 'transparent'}
                  className="transition-colors duration-100"
                />
              ))}
            </svg>

          {items.map((item, index) => {
            const angle = angleStep * index - 90;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <Link
                href={item.href}
                key={item.id}
                onClick={(e) => handleItemClick(e, item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="radial-item group absolute w-16 h-16 flex flex-col items-center justify-center cursor-pointer"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  top: '50%',
                  left: '50%',
                }}
              >
                <item.icon className={cn(
                  "w-8 h-8 transition-colors duration-100",
                  hoveredIndex === index ? 'text-white' : 'text-gray-400'
                )} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadialMenu;
