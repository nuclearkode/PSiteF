'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import QuickLinks from '@/components/sections/QuickLinks';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import About from '@/components/sections/About';
import Media from '@/components/sections/Media';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickLinks />
        <Projects />
        <Experience />
        <Media />
        <About />
      </main>
      <Footer />
    </>
  );
}
