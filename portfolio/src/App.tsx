import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import SplashScreen from '@/components/ui/SplashScreen';
import { ParticlesBackground } from '@/components/sections/ParticlesBackground';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Prevent scrolling while splash screen is active
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSplash]);

  return (
    <div className="font-sans antialiased text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
      <div className="crt-overlay" />
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash-screen" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Dynamic Global Background - Hardware Accelerated Canvas Particles */}
      <ParticlesBackground />

      <Navbar />

      <main>
        <HeroSection showSplash={showSplash} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
