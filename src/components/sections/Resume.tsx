'use client';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

export default function Resume() {
  const { t } = useI18n();
  return (
    <section id="resume" className="relative z-[1]">
      <div className="section-inner max-w-[1280px] mx-auto py-16 px-gutter">
        <h2 className="section-title font-headline text-[clamp(32px,6vw,64px)] tracking-[.06em] uppercase text-accent-dark mb-4 leading-none">{t('openPdf')}</h2>
        <div className="content-card bg-card rounded-4xl p-[clamp(18px,2.2vw,28px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
          <p>{t('mediaDesc')}</p>
          <div className="btn-row flex gap-3 flex-wrap mt-3">
            <a className="btn" href="/resume.pdf" download>{t('download')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
