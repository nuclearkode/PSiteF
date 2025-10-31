'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import InteractiveCarousel from '@/components/ui/InteractiveCarousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HeroPlaceholderSVG = () => (
  <svg width="55%" viewBox="0 0 300 200" fill="none" stroke="currentColor" strokeWidth="6">
    <rect x="5" y="5" width="290" height="190" rx="28" fill="rgba(255,255,255,.06)"/>
    <path d="M30 50h110M30 85h200M30 120h240M30 155h160" />
  </svg>
);

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
    <div id="top" className="hero-wrap w-full h-[clamp(680px,85vh,920px)] relative px-gutter max-w-[1280px] mx-auto mt-top">
      <div className="hero absolute inset-0 rounded-b-6xl bg-gradient-to-br from-primary/80 to-primary/40 grid place-items-center overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/10 z-[1]
        before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(90%_90%_at_50%_40%,rgba(255,255,255,0.08),rgba(0,0,0,0.5))] before:mix-blend-multiply before:opacity-90"
      >
        <span className="badge absolute top-4 left-4 bg-white text-black rounded-full px-2.5 py-1.5 font-extrabold text-xs">{t('badge')}</span>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 p-[clamp(24px,4vw,48px)]">
            <div className="content text-center lg:text-left grid gap-4 place-items-center lg:place-items-start">
                <h1 className="hero-title text-accent-dark px-gutter lg:px-0 uppercase font-headline font-bold text-[clamp(40px,7vw,80px)] leading-[.95] tracking-[.01em] max-w-[1280px] mx-auto">
                    Ahmed Badawy <br/>— Mechatronics & Robotics
                </h1>
                <div className="btn-row flex gap-3 justify-center lg:justify-start mt-3 flex-wrap">
                    <Link className="btn" href="#projects">{t('ctaProjects')}</Link>
                    <Link className="btn" href="/media">{t('ctaMedia')}</Link>
                </div>
            </div>
            <div className="carousel-container h-[clamp(300px,40vh,450px)] lg:h-[clamp(400px,60vh,600px)] w-full relative">
                <div className="media absolute inset-0">
                  <div className="media-inner h-full outline-2 outline-white/35 outline-offset-[-12px] rounded-3xl">
                      <InteractiveCarousel items={carouselItems} />
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
