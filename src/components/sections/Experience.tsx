'use client';
import { useI18n } from '@/hooks/useI18n';
import Timeline from '@/components/ui/Timeline';

export default function Experience() {
  const { t } = useI18n();

  const timelineItems = [
    {
      metaKey: 'exp1meta',
      titleKey: 'exp1title',
      descriptionKey: 'exp1p',
    },
    {
      metaKey: 'exp2meta',
      titleKey: 'exp2title',
      descriptionKey: 'exp2p',
    },
    {
      metaKey: 'exp3meta',
      titleKey: 'exp3title',
      descriptionKey: 'exp3p',
    },
    {
      metaKey: 'exp4meta',
      titleKey: 'exp4title',
      descriptionKey: 'exp4p',
    }
  ];

  return (
    <section id="experience" className="relative z-[1]">
      <div className="section-inner max-w-[1280px] mx-auto py-16 px-gutter">
        <h2 className="section-title font-headline text-[clamp(32px,6vw,64px)] tracking-[.06em] uppercase text-accent-dark mb-4 leading-none">{t('exp')}</h2>
        <div className="content-card bg-card rounded-4xl p-[clamp(18px,2.2vw,28px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
          <Timeline items={timelineItems} />
        </div>
      </div>
    </section>
  );
}
