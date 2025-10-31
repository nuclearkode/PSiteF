import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ProjectCardProps = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image1Id: string;
  image2Id: string;
  link: string;
  t: (key: string) => string;
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function ProjectCard({ id, titleKey, descriptionKey, image1Id, image2Id, link, t }: ProjectCardProps) {
  const image1 = findImage(image1Id);
  const image2 = findImage(image2Id);
  const descriptionHtml = t(descriptionKey);

  return (
    <article className="project-block grid gap-4 mb-proj-gap" id={id}>
      <div className="widgets grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <div className="media arm-stage relative min-h-[clamp(300px,50vh,560px)] overflow-hidden rounded-4xl shadow-[0_40px_80px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/5 bg-gradient-to-b from-[#1f232c] to-[#171a22] p-4 before:absolute before:inset-[-20%] before:bg-[radial-gradient(85%_85%_at_50%_50%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.18)_60%,rgba(0,0,0,0.55)_100%)] before:opacity-80 before:mix-blend-multiply after:absolute after:inset-0 after:opacity-[.08] after:mix-blend-overlay after:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20100%20100%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.8%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20type=%27saturate%27%20values=%270%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')] after:bg-[length:220px_220px]">
          <div className="media-inner relative rounded-3xl overflow-hidden grid place-items-center h-full">
            {image1 && (
              <Image src={image1.imageUrl} alt={image1.description} data-ai-hint={image1.imageHint} fill className="object-cover" />
            )}
          </div>
        </div>
        <div className="media relative min-h-[clamp(300px,50vh,560px)] overflow-hidden rounded-4xl bg-primary text-white shadow-[0_40px_80px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/5 p-4 before:absolute before:inset-[-20%] before:bg-[radial-gradient(85%_85%_at_50%_50%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.18)_60%,rgba(0,0,0,0.55)_100%)] before:opacity-80 before:mix-blend-multiply after:absolute after:inset-0 after:opacity-[.08] after:mix-blend-overlay after:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20100%20100%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.8%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20type=%27saturate%27%20values=%270%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')] after:bg-[length:220px_220px]">
          <div className="media-inner relative rounded-3xl overflow-hidden grid place-items-center h-full">
            {image2 && (
              <Image src={image2.imageUrl} alt={image2.description} data-ai-hint={image2.imageHint} fill className="object-cover" />
            )}
          </div>
        </div>
      </div>
      <div className="content-card bg-card rounded-4xl p-[clamp(18px,2.2vw,28px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
        <div className="card-head flex items-baseline justify-between gap-3">
          <h3 className="uppercase tracking-[.06em] mb-1.5 text-accent-dark font-headline">{t(titleKey)}</h3>
          {link !== '#' && (
            <a className="visit-link font-extrabold text-sm opacity-90 border border-white/10 p-2 rounded-xl transition-transform hover:-translate-y-0.5 hover:bg-white/5 whitespace-nowrap" href={link} target="_blank" rel="noopener">Check it out ↗</a>
          )}
        </div>
        <div className="prose prose-sm prose-headings:text-foreground/80 prose-h4:mb-1 prose-h4:mt-3 prose-p:my-1 prose-p:text-muted-foreground" dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
      </div>
    </article>
  );
}
