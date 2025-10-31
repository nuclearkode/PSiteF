'use client';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const { t } = useI18n();

  const humanoidImage = PlaceHolderImages.find(img => img.id === 'carousel-humanoid');
  const aerospaceImage = PlaceHolderImages.find(img => img.id === 'carousel-aerospace');
  const satelliteImage = {
      imageUrl: 'https://images.unsplash.com/photo-1594392882823-64434a3319f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Satellite in orbit',
      imageHint: 'satellite space',
  };


  return (
    <div id="top" className="hero-wrap w-full min-h-[clamp(450px,60vh,600px)] relative px-gutter max-w-[1280px] mx-auto mt-top">
      <div className="hero-inner relative z-[1] h-full flex items-center justify-center">
        <div className="content-card bg-card rounded-4xl p-4 border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5 w-full h-full min-h-[450px] lg:min-h-[550px] overflow-hidden">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
                {humanoidImage && (
                    <div className="relative col-span-1 row-span-2 rounded-3xl overflow-hidden">
                        <Image src={humanoidImage.imageUrl} alt={humanoidImage.description} data-ai-hint={humanoidImage.imageHint} fill className="object-cover" />
                    </div>
                )}
                {aerospaceImage && (
                    <div className="relative col-span-2 row-span-1 rounded-3xl overflow-hidden">
                         <Image src={aerospaceImage.imageUrl} alt={aerospaceImage.description} data-ai-hint={aerospaceImage.imageHint} fill className="object-cover" />
                    </div>
                )}
                {satelliteImage && (
                    <div className="relative col-span-2 row-span-1 rounded-3xl overflow-hidden">
                         <Image src={satelliteImage.imageUrl} alt={satelliteImage.description} data-ai-hint={satelliteImage.imageHint} fill className="object-cover" />
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
