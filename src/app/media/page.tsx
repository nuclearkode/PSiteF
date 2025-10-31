'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useI18n } from '@/hooks/useI18n';

export default function MediaPage() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main className="mt-top px-gutter">
        <section id="media-content" className="relative z-[1] py-16">
            <div className="section-inner max-w-[1280px] mx-auto">
                <h1 className="section-title font-headline text-[clamp(32px,6vw,64px)] tracking-[.06em] uppercase text-accent-dark mb-8 leading-none">
                {t('media')}
                </h1>
                <div className="content-card bg-card rounded-4xl p-[clamp(18px,2.2vw,28px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5 min-h-[50vh]">
                    <p>This page will feature a collection of activities, awards, news, and more.</p>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
