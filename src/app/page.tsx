'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import QuickLinks from '@/components/sections/QuickLinks';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import About from '@/components/sections/About';
import RadialMenu from '@/components/ui/RadialMenu';
import { useState, MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { Cpu, Gamepad2, CircuitBoard, Cog } from 'lucide-react';


export default function Home() {
  const [radialMenuState, setRadialMenuState] = useState<{
    isOpen: boolean;
    position: { top: number; left: number };
  }>({ isOpen: false, position: { top: 0, left: 0 } });

  const projectCategories = [
    { id: 'ai', label: 'AI', icon: Cpu, href: '#projects-ai' },
    { id: 'controls', label: 'Controls', icon: Gamepad2, href: '#projects-controls' },
    { id: 'electronics', label: 'Electronics', icon: CircuitBoard, href: '#projects-electronics' },
    { id: 'mechanical', label: 'Mechanical', icon: Cog, href: '#projects-mechanical' },
  ];

  useEffect(() => {
    const handleDoubleClick = (event: MouseEvent) => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection && projectsSection.contains(event.target as Node)) {
        setRadialMenuState({
          isOpen: true,
          position: { top: event.clientY, left: event.clientX },
        });
      }
    };

    document.addEventListener('dblclick', handleDoubleClick);
    return () => document.removeEventListener('dblclick', handleDoubleClick);
  }, []);

  const closeRadialMenu = () => {
    setRadialMenuState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickLinks />
        <Projects />
        <About />
        <Experience />
      </main>
      <Footer />
      <RadialMenu
        items={projectCategories}
        isOpen={radialMenuState.isOpen}
        onClose={closeRadialMenu}
        onSelect={closeRadialMenu}
        position={radialMenuState.position}
        source="cursor"
      />
    </>
  );
}
