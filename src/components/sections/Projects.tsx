'use client';
import { useI18n } from '@/hooks/useI18n';
import ProjectCard from '@/components/ProjectCard';
import { Cog, Cpu, Gamepad2, CircuitBoard } from 'lucide-react';
import React from 'react';

const projectsData = [
  {
    id: 'proj-marine',
    titleKey: 'pmarine_t',
    descriptionKey: 'pmarine_d',
    image1Id: 'proj-marine-3d',
    image2Id: 'proj-marine-2d',
    link: '#',
    category: 'ai'
  },
  {
    id: 'proj-stm32',
    titleKey: 'pstm32_t',
    descriptionKey: 'pstm32_d',
    image1Id: 'proj-pcb-3d',
    image2Id: 'proj-pcb-2d',
    link: '#',
    category: 'electronics'
  },
  {
    id: 'proj-8051',
    titleKey: 'p8051_t',
    descriptionKey: 'p8051_d',
    image1Id: 'proj-8051-3d',
    image2Id: 'proj-8051-2d',
    link: '#',
    category: 'controls'
  },
  {
    id: 'proj-labview',
    titleKey: 'plabview_t',
    descriptionKey: 'plabview_d',
    image1Id: 'proj-labview-3d',
    image2Id: 'proj-labview-2d',
    link: '#',
    category: 'controls'
  },
  {
    id: 'proj-snowplow',
    titleKey: 'psnow_t',
    descriptionKey: 'psnow_d',
    image1Id: 'proj-plow-3d',
    image2Id: 'proj-plow-2d',
    link: '#',
    category: 'mechanical'
  },
];

const categories = {
  ai: { icon: Cpu, label: 'AI' },
  controls: { icon: Gamepad2, label: 'Controls' },
  electronics: { icon: CircuitBoard, label: 'Electronics' },
  mechanical: { icon: Cog, label: 'Mechanical' },
};

export default function Projects() {
  const { t } = useI18n();

  return (
    <section 
      id="projects" 
      className="relative z-[1] pt-20 scroll-mt-20"
    >
      <div className="section-inner max-w-[1280px] mx-auto px-gutter">
        <h2 className="section-title font-headline text-[clamp(32px,6vw,64px)] tracking-[.06em] uppercase text-accent-dark mb-4 leading-none">{t('projects')}</h2>
        
        {Object.keys(categories).map(categoryKey => {
          const category = categories[categoryKey as keyof typeof categories];
          const categoryProjects = projectsData.filter(p => p.category === categoryKey);

          if (categoryProjects.length === 0) return null;

          return (
            <div key={categoryKey} id={`projects-${categoryKey}`} className="scroll-mt-24">
              <h3 className="flex items-center gap-3 text-2xl font-bold font-headline uppercase tracking-wider text-foreground/80 mb-6 mt-12">
                <category.icon className="w-8 h-8 text-accent-dark" />
                {category.label}
              </h3>
              <div id={`more-projects-${categoryKey}`}>
                  {categoryProjects.map(project => (
                      <ProjectCard key={project.id} {...project} t={t} />
                  ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
