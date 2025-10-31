'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useI18n } from '@/hooks/useI18n';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const mediaItems = [
  {
    titleKey: 'media_sfu_fira_title',
    descriptionKey: 'media_sfu_fira_desc',
    imageUrl: 'https://picsum.photos/seed/media1/600/400',
    imageHint: 'robotics award ceremony',
    links: [
      { url: 'https://x.com/SFUMechatronics/status/1795527666713690532', labelKey: 'sfu_x' },
      { url: 'https://www.sfu.ca/fas/news-events/news/2024/05/2024-fira-canada-roboworld-cup.html', labelKey: 'sfu_news' },
    ],
  },
  {
    titleKey: 'media_alpha_secondary_title',
    descriptionKey: 'media_alpha_secondary_desc',
    imageUrl: 'https://picsum.photos/seed/media2/600/400',
    imageHint: 'robotics competition',
    links: [
      { url: 'https://www.vancouverisawesome.com/burnaby-now-archive/news/burnaby-school-robotics-club-headed-for-championships-after-years-long-hiatus-5126362', labelKey: 'read_article' },
    ],
  },
  {
    titleKey: 'media_burnaby_now_title',
    descriptionKey: 'media_burnaby_now_desc',
    imageUrl: 'https://picsum.photos/seed/media3/600/400',
    imageHint: 'newspaper article',
    links: [],
  },
  {
    titleKey: 'media_coach_title',
    descriptionKey: 'media_coach_desc',
    imageUrl: 'https://picsum.photos/seed/media4/600/400',
    imageHint: 'robotics coaching students',
    links: [
        { url: 'https://kavosh.ai', labelKey: 'official_website' },
    ],
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
                    <div key={index} className="media-card flex flex-col content-card bg-card rounded-4xl overflow-hidden border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
                      <div className="relative h-64 w-full">
                        <Image
                          src={item.imageUrl}
                          alt={t(item.titleKey)}
                          data-ai-hint={item.imageHint}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-[clamp(18px,2.2vw,28px)] flex flex-col flex-grow">
                        <h3 className="uppercase tracking-[.06em] mb-1.5 text-accent-dark font-headline">{t(item.titleKey)}</h3>
                        <p className="text-muted-foreground mb-3 flex-grow" dangerouslySetInnerHTML={{ __html: t(item.descriptionKey) }}></p>
                        <div className="flex gap-3 flex-wrap">
                            {item.links.map(link => (
                                <Link key={link.url} className="visit-link font-extrabold text-sm opacity-90 border border-white/10 p-2 rounded-xl transition-transform hover:-translate-y-0.5 hover:bg-white/5 whitespace-nowrap inline-flex items-center gap-1.5" href={link.url} target="_blank" rel="noopener">
                                    {t(link.labelKey)} <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
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
