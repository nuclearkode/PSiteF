'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const humanoidImage = PlaceHolderImages.find(img => img.id === 'carousel-humanoid');

  return (
    <div id="top" className="hero-wrap relative w-full max-w-[1280px] mx-auto px-gutter mt-top min-h-[clamp(450px,60vh,600px)]">
      <div className="relative w-full h-full min-h-[inherit] bg-card rounded-4xl border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5 overflow-hidden p-4">
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          {humanoidImage && (
            <Image
              src={humanoidImage.imageUrl}
              alt={humanoidImage.description}
              data-ai-hint={humanoidImage.imageHint}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
