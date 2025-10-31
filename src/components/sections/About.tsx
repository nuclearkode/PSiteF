'use client';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function About() {
  const { t } = useI18n();
  const avatar = PlaceHolderImages.find(img => img.id === 'about-avatar');

  return (
    <section 
      id="about" 
      className="relative z-[1]"
    >
      <div className="section-inner max-w-[1280px] mx-auto pt-8 pb-16 px-gutter">
        <h2 className="section-title font-headline text-[clamp(32px,6vw,64px)] tracking-[.06em] uppercase text-accent-dark mb-4 leading-none">{t('abt')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-5">
          <div className="content-card bg-card rounded-4xl p-[clamp(18px,2.2vw,28px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
            <h3 className="font-headline">Ahmed Badawy</h3>
            <p className="mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('aboutP') }}></p>
          </div>
          <div className="content-card flex items-center justify-center bg-card rounded-4xl p-[clamp(18px,2.2vw,28px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
            {avatar && (
              <Image 
                src={avatar.imageUrl} 
                alt={avatar.description} 
                data-ai-hint={avatar.imageHint}
                width={220} 
                height={220} 
                className="avatar w-[220px] h-[220px] rounded-full object-cover shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-8 ring-inset ring-white/10" 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
