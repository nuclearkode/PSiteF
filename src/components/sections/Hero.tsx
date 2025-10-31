'use client';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const { t } = useI18n();

  const humanoidImage = PlaceHolderImages.find(img => img.id === 'carousel-humanoid');

  return (
    <div id="top" className="hero-wrap w-full min-h-[clamp(450px,60vh,600px)] relative px-gutter max-w-[1280px] mx-auto mt-top">
      <div className="hero-inner relative z-[1] h-full flex items-center justify-center">
        <div className="content-card bg-card rounded-4xl border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5 w-full h-full min-h-[450px] lg:min-h-[550px] overflow-hidden p-4">
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            {humanoidImage && (
              <Image 
                src={humanoidImage.imageUrl} 
                alt={humanoidImage.description} 
                data-ai-hint={humanoidImage.imageHint} 
                fill 
                className="object-cover" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
