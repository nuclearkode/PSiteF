'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useI18n } from '@/hooks/useI18n';
import Image from 'next/image';
import Link from 'next/link';

const mediaItems = [
  {
    titleKey: 'media1_title',
    descriptionKey: 'media1_desc',
    imageUrl: 'https://picsum.photos/seed/media1/600/400',
    imageHint: 'robotics club',
    link: '#',
  },
  {
    titleKey: 'media2_title',
    descriptionKey: 'media2_desc',
    imageUrl: 'https://picsum.photos/seed/media2/600/400',
    imageHint: 'robotics competition award',
    link: '#',
  },
  {
    titleKey: 'media3_title',
    descriptionKey: 'media3_desc',
    imageUrl: 'https://picsum.photos/seed/media3/600/400',
    imageHint: 'news article',
    link: '#',
  },
  {
    titleKey: 'media4_title',
    descriptionKey: 'media4_desc',
    imageUrl: 'https://picsum.photos/seed/media4/600/400',
    imageHint: 'conference speaker',
    link: '#',
  }
];

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {mediaItems.map((item, index) => (
                    <div key={index} className="media-card content-card bg-card rounded-4xl overflow-hidden border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
                      <div className="relative h-64 w-full">
                        <Image
                          src={item.imageUrl}
                          alt={t(item.titleKey)}
                          data-ai-hint={item.imageHint}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-[clamp(18px,2.2vw,28px)]">
                        <h3 className="uppercase tracking-[.06em] mb-1.5 text-accent-dark font-headline">{t(item.titleKey)}</h3>
                        <p className="text-muted-foreground mb-3">{t(item.descriptionKey)}</p>
                        {item.link !== '#' && (
                          <Link className="visit-link font-extrabold text-sm opacity-90 border border-white/10 p-2 rounded-xl transition-transform hover:-translate-y-0.5 hover:bg-white/5 whitespace-nowrap" href={item.link} target="_blank" rel="noopener">
                            {t('readMore')}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
