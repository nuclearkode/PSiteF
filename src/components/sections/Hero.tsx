'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const humanoidImage = PlaceHolderImages.find(img => img.id === 'carousel-humanoid');

  return (
    <div id="top" className="hero-wrap relative w-full max-w-[1280px] mx-auto px-gutter mt-top min-h-[clamp(450px,60vh,600px)]">
      <div className="relative w-full h-full min-h-[inherit] bg-card rounded-4xl border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5 overflow-hidden p-4">
        <div className="absolute inset-0 z-10 before:absolute before:inset-[-20%] before:bg-[radial-gradient(85%_85%_at_50%_50%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.18)_60%,rgba(0,0,0,0.55)_100%)] before:opacity-80 before:mix-blend-multiply after:absolute after:inset-0 after:opacity-[.08] after:mix-blend-overlay after:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20100%20100%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.8%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20type=%27saturate%27%20values=%270%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')] after:bg-[length:220px_220px]">
        </div>
        {humanoidImage && (
          <div className="relative w-full h-full z-0 rounded-3xl overflow-hidden">
            <Image
              src={humanoidImage.imageUrl}
              alt={humanoidImage.description}
              data-ai-hint={humanoidImage.imageHint}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
