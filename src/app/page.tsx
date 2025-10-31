import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import QuickLinks from '@/components/sections/QuickLinks';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Resources from '@/components/sections/Resources';
import About from '@/components/sections/About';
import Resume from '@/components/sections/Resume';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickLinks />
        <Projects />
        <Experience />
        <Resources />
        <About />
        <Resume />
      </main>
      <Footer />
    </>
  );
}
