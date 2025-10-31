"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

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
  const ringRef = useRef<HTMLDivElement>(null);
  const velocity = useRef(0);
  const rafRef = useRef<number>();
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const setTransform = useCallback((x: number) => {
    if (ringRef.current) {
      ringRef.current.style.transform = `translateX(${x}px)`;
    }
  }, []);

  const momentumLoop = useCallback(() => {
    currentX.current += velocity.current;
    velocity.current *= 0.95;
    
    // Boundary checks
    if (ringRef.current) {
      const parentWidth = ringRef.current.parentElement?.clientWidth || 0;
      const ringWidth = ringRef.current.scrollWidth || 0;
      const maxScroll = 0;
      const minScroll = -(ringWidth - parentWidth);

      if (currentX.current > maxScroll) {
        currentX.current = maxScroll;
        velocity.current = 0;
      }
      if (currentX.current < minScroll) {
        currentX.current = minScroll;
        velocity.current = 0;
      }
    }

    setTransform(currentX.current);
    if (Math.abs(velocity.current) > 0.5) {
      rafRef.current = requestAnimationFrame(momentumLoop);
    }
  }, [setTransform]);

  const onDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current = ('touches' in e ? e.touches[0].clientX : e.clientX) - currentX.current;
    if (ringRef.current) ringRef.current.style.cursor = 'grabbing';
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const onMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - startX.current;
    velocity.current = x - currentX.current;
    currentX.current = x;
    setTransform(currentX.current);
  }, [setTransform]);

  const onUp = useCallback(() => {
    isDragging.current = false;
    if (ringRef.current) ringRef.current.style.cursor = 'grab';
    rafRef.current = requestAnimationFrame(momentumLoop);
  }, [momentumLoop]);

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if(rafRef.current) cancelAnimationFrame(rafRef.current);
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    currentX.current -= delta;
    setTransform(currentX.current);
    rafRef.current = requestAnimationFrame(momentumLoop);
  }, [setTransform, momentumLoop]);

  useEffect(() => {
    const ring = ringRef.current;
    const parent = ring?.parentElement;
    
    if (ring) {
      ring.addEventListener('mousedown', onDown as EventListener);
      ring.addEventListener('touchstart', onDown as EventListener, { passive: true });
    }
    if (parent) {
      parent.addEventListener('wheel', onWheel, { passive: false });
    }
    
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    return () => {
      if (ring) {
        ring.removeEventListener('mousedown', onDown as EventListener);
        ring.removeEventListener('touchstart', onDown as EventListener);
      }
      if(parent) {
        parent.removeEventListener('wheel', onWheel);
      }
      
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
      
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onDown, onMove, onUp, onWheel]);
  
  return (
    <div className="carousel h-full grid grid-cols-1" role="region" aria-roledescription="carousel" aria-label="3D Objects">
        <div 
            ref={ringRef} 
            className="ring relative h-full flex gap-4 p-4 cursor-grab"
        >
          {items.map((item) => {
            const image = PlaceHolderImages.find(img => img.id === item.imgId);
            return (
              <Link key={item.id} className="card flex-[0_0_clamp(240px,42%,420px)] h-full rounded-3xl bg-black/10 border border-white/20 grid grid-rows-[1fr_auto] overflow-hidden transition-transform duration-200 ease-in-out hover:scale-[1.02]" href={`#${item.id}`}>
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
            );
          })}
        </div>
    </div>
  );
}
