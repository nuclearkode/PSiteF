'use client';
import { useI18n } from '@/hooks/useI18n';
import Link from 'next/link';

const resources = [
  { name: 'Three.js Editor', href: 'https://threejs.org/editor/' },
  { name: 'Spline 3D', href: 'https://spline.design/' },
  { name: 'CodeSandbox', href: 'https://codesandbox.io/' },
  { name: 'Blender', href: 'https://blender.org/' },
  { name: 'Onshape CAD', href: 'https://www.onshape.com/en/' },
  { name: 'GitHub', href: 'https://github.com/' },
  { name: 'Figma', href: 'https://www.figma.com/' },
  { name: 'Kinematics Calculator', href: 'https://www.desmos.com/calculator' },
  { name: 'OpenCV Tutorials', href: 'https://learnopencv.com/' },
  { name: 'Observable Notebooks', href: 'https://observablehq.com/' },
  { name: 'Polycam (3D capture)', href: 'https://poly.cam/' },
  { name: 'Sketchfab', href: 'https://sketchfab.com/' },
];

export default function Resources() {
  const { t } = useI18n();

  return (
    <section id="resources" className="relative z-[1]">
      <div className="section-inner max-w-[1280px] mx-auto py-16 px-gutter">
        <h2 className="section-title font-headline text-[clamp(32px,6vw,64px)] tracking-[.06em] uppercase text-accent-dark mb-4 leading-none">{t('res')}</h2>
        <div className="content-card bg-card rounded-4xl p-[clamp(18px,2.2vw,28px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5">
          <p>{t('resDesc')}</p>
          <div className="link-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-3">
            {resources.map((resource, index) => (
              <Link
                key={index}
                className="link-pill flex items-center justify-between py-3 px-3.5 rounded-2xl bg-white/5 border-2 border-white/10 font-bold hover:bg-white/10"
                href={resource.href}
                target="_blank"
                rel="noopener"
              >
                {resource.name}
                <span>↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
