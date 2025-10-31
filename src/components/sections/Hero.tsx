'use client';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import InteractiveCarousel from '@/components/ui/InteractiveCarousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const { t } = useI18n();
  const avatar = PlaceHolderImages.find(p => p.id === 'hero-avatar');

  const carouselItems = [
    { id: 'proj-aerospace', imgId: 'carousel-aerospace', alt: 'Aerospace engineering concept', text: 'Aerospace & Aviation' },
    { id: 'proj-humanoid', imgId: 'carousel-humanoid', alt: 'Humanoid robot concept', text: 'Humanoid Robotics' },
    { id: 'proj-marine', imgId: 'carousel-marine', alt: 'Marine hull brush', text: 'Marine vehicle tool — Open project' },
    { id: 'proj-stm32', imgId: 'carousel-pcb', alt: 'STM32 PCB', text: 'STM32F411 board — See details' },
    { id: 'proj-8051', imgId: 'carousel-encoder', alt: 'Encoder', text: '8051 speed control — Learn more' },
  ];

  return (
    <div id="top" className="hero-wrap w-full min-h-[clamp(600px,80vh,800px)] relative px-gutter max-w-[1280px] mx-auto mt-top">
      <div className="hero-inner relative z-[1] h-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="content-card bg-card rounded-4xl p-[clamp(24px,4vw,48px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5 order-2 lg:order-1">
            <h1 className="hero-title text-accent-dark uppercase font-headline font-bold text-[clamp(28px,4.5vw,48px)] leading-[.95] tracking-[.01em]">
                Ahmed Badawy <br/>— Mechatronics & Robotics
            </h1>
            <p className="mt-4 text-muted-foreground max-w-prose">{t('aboutP')}</p>
        </div>
        <div className="carousel-container min-h-[450px] lg:min-h-[550px] w-full relative order-1 lg:order-2">
            <div className="media absolute inset-0">
              <div className="media-inner h-full">
                  <InteractiveCarousel items={carouselItems} />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
