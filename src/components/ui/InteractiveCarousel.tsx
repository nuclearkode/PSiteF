"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type CarouselItem = {
  id: string;
  imgId: string;
  alt: string;
  text: string;
};

type InteractiveCarouselProps = {
  items: CarouselItem[];
};

export default function InteractiveCarousel({ items }: InteractiveCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const initialRotation = useRef(0);
  const currentRotation = useRef(0);
  const velocity = useRef(0);
  const rafRef = useRef<number>();

  const rotationAngle = 360 / items.length;

  const updateRotation = () => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateZ(-300px) rotateY(${currentRotation.current}deg)`;
    }
  };

  const momentumLoop = useCallback(() => {
    currentRotation.current += velocity.current;
    velocity.current *= 0.9; // Friction

    // Snap to nearest item
    if (Math.abs(velocity.current) < 0.1 && !isDragging.current) {
      const nearestIndex = Math.round(-currentRotation.current / rotationAngle);
      const targetRotation = -nearestIndex * rotationAngle;
      
      // Animate the snap
      const snapAnimation = () => {
        const diff = targetRotation - currentRotation.current;
        if (Math.abs(diff) < 0.1) {
          currentRotation.current = targetRotation;
          setActiveIndex((items.length - (nearestIndex % items.length)) % items.length);
          updateRotation();
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          return;
        }
        currentRotation.current += diff * 0.1;
        updateRotation();
        rafRef.current = requestAnimationFrame(snapAnimation);
      };
      snapAnimation();

    } else {
      updateRotation();
      rafRef.current = requestAnimationFrame(momentumLoop);
    }
  }, [rotationAngle, items.length]);

  const onDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    isDragging.current = true;
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    initialRotation.current = currentRotation.current;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grabbing';
  }, []);

  const onMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const dx = clientX - startX.current;
    
    const newRotation = initialRotation.current + (dx / window.innerWidth) * 180;
    velocity.current = newRotation - currentRotation.current;
    currentRotation.current = newRotation;
    updateRotation();
  }, []);

  const onUp = useCallback(() => {
    isDragging.current = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
    rafRef.current = requestAnimationFrame(momentumLoop);
  }, [momentumLoop]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        velocity.current -= e.deltaX * 0.1;
        rafRef.current = requestAnimationFrame(momentumLoop);
    }
  }, [momentumLoop]);

  useEffect(() => {
    const el = wrapperRef.current?.parentElement;
    if (el) {
        el.addEventListener('mousedown', onDown as unknown as EventListener);
        el.addEventListener('touchstart', onDown as unknown as EventListener, { passive: true });
        el.addEventListener('wheel', handleWheel, { passive: false });

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchend', onUp);
    }

    return () => {
        if(el) {
            el.removeEventListener('mousedown', onDown as unknown as EventListener);
            el.removeEventListener('touchstart', onDown as unknown as EventListener);
            el.removeEventListener('wheel', handleWheel);
        }
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
    }
  }, [onDown, onMove, onUp, handleWheel]);
  
  return (
    <div className="scene h-full w-full" style={{ perspective: '1000px' }}>
      <div 
        ref={wrapperRef}
        className="carousel-wrapper h-full w-full relative cursor-grab"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {items.map((item, index) => {
          const image = PlaceHolderImages.find(img => img.id === item.imgId);
          const angle = rotationAngle * index;
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              className="carousel-item absolute w-[300px] h-[400px] left-[50%] top-[50%] -ml-[150px] -mt-[200px] transition-transform duration-500 ease-in-out"
              style={{ transform: `rotateY(${angle}deg) translateZ(300px)` }}
            >
              <Link 
                className="card block w-full h-full rounded-3xl bg-black/10 border border-white/20 grid grid-rows-[1fr_auto] overflow-hidden transition-all duration-300 ease-in-out"
                href={`#${item.id}`}
                style={{
                  transform: isActive ? 'scale(1.1)' : 'scale(0.9)',
                  opacity: isActive ? 1 : 0.6,
                  boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                <div className="media-slot relative">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={item.alt}
                      data-ai-hint={image.imageHint}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="desc p-3 text-sm bg-black/20 border-t border-white/10 text-white">{item.text}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
