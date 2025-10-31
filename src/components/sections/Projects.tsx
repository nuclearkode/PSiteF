'use client';
import { useI18n } from '@/hooks/useI18n';
import ProjectCard from '@/components/ProjectCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

const projectsData = [
  {
    id: 'proj-marine',
    titleKey: 'pmarine_t',
    descriptionKey: 'pmarine_d',
    image1Id: 'proj-marine-3d',
    image2Id: 'proj-marine-2d',
    link: '#',
  },
  {
    id: 'proj-stm32',
    titleKey: 'pstm32_t',
    descriptionKey: 'pstm32_d',
    image1Id: 'proj-pcb-3d',
    image2Id: 'proj-pcb-2d',
    link: '#',
  },
  {
    id: 'proj-8051',
    titleKey: 'p8051_t',
    descriptionKey: 'p8051_d',
    image1Id: 'proj-8051-3d',
    image2Id: 'proj-8051-2d',
    link: '#',
  },
  {
    id: 'proj-labview',
    titleKey: 'plabview_t',
    descriptionKey: 'plabview_d',
    image1Id: 'proj-labview-3d',
    image2Id: 'proj-labview-2d',
    link: '#',
  },
  {
    id: 'proj-snowplow',
    titleKey: 'psnow_t',
    descriptionKey: 'psnow_d',
    image1Id: 'proj-plow-3d',
    image2Id: 'proj-plow-2d',
    link: '#',
  },
];

export default function Projects() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={cn(
        "relative z-[1] pt-20 pb-10 opacity-0 transition-opacity duration-700 ease-out",
        isVisible && "animate-fade-in-up"
      )}
    >
      <div className="section-inner max-w-[1280px] mx-auto px-gutter">
        <h2 className="section-title font-headline text-[clamp(32px,6vw,64px)] tracking-[.06em] uppercase text-accent-dark mb-4 leading-none">{t('projects')}</h2>
        
        <div id="more-projects">
            {projectsData.map(project => (
                <ProjectCard key={project.id} {...project} t={t} />
            ))}
        </div>
      </div>
    </section>
  );
}
