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
    { id: 'proj-marine', imgId: 'carousel-marine', alt: 'Marine hull brush', text: 'Marine vehicle tool — Open project' },
    { id: 'proj-stm32', imgId: 'carousel-pcb', alt: 'STM32 PCB', text: 'STM32F411 board — See details' },
    { id: 'proj-8051', imgId: 'carousel-encoder', alt: 'Encoder', text: '8051 speed control — Learn more' },
    { id: 'proj-labview', imgId: 'carousel-hopper', alt: 'Hopper', text: 'Automation line — Visit project' },
    { id: 'proj-snowplow', imgId: 'carousel-plow', alt: 'Snow plow', text: 'Custom plow — Fabrication notes' },
    { id: 'proj-diagram', imgId: 'carousel-ai', alt: 'AI tool', text: 'Diagram Weaver — AI tool' },
  ];

  return (
    <div id="top" className="hero-wrap w-full h-[clamp(520px,80vh,820px)] relative px-gutter max-w-[1280px] mx-auto mt-top">
      <div className="hero absolute inset-0 rounded-b-6xl bg-primary grid place-items-center overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/10
        before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(90%_90%_at_50%_40%,rgba(255,255,255,0.08),rgba(0,0,0,0.5))] before:mix-blend-multiply before:opacity-90
        after:content-[''] after:absolute after:inset-0 after:opacity-20 after:mix-blend-overlay after:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20100%20100%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.8%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')] after:bg-[length:220px_220px]"
      >
        <span className="badge absolute top-4 left-4 bg-white text-black rounded-full px-2.5 py-1.5 font-extrabold text-xs">{t('badge')}</span>
        <div className="text-center grid gap-3.5 place-items-center">
            
          <h1 className="hero-title text-accent-dark px-gutter uppercase font-headline font-bold text-[clamp(40px,8vw,88px)] leading-[.9] tracking-[.01em] max-w-[1280px] mx-auto">
            Ahmed Badawy <br/>— Mechatronics & Robotics
          </h1>
          
          <div className="h-[250px] w-[90vw] max-w-2xl relative">
            <div className="media absolute inset-0">
              <div className="media-inner h-full outline-2 outline-white/35 outline-offset-[-12px] rounded-3xl">
                <InteractiveCarousel items={carouselItems} />
              </div>
            </div>
          </div>
          
          <div className="btn-row flex gap-3 justify-center mt-3 flex-wrap">
            <Link className="btn" href="#projects">{t('ctaProjects')}</Link>
            <Link className="btn" href="#resume">{t('ctaResume')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
