import { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStackBar } from './components/TechStackBar';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { LetterPortal } from './components/LetterPortal';
import { ProjectsSection } from './components/ProjectsSection';
import { ActivityGallery } from './components/ActivityGallery';
import { ContactSection } from './components/ContactSection';

export function App() {
  const [lang, setLang] = useState('id');
  const [activeSection, setActiveSection] = useState('home');
  const [activePortfolioTab, setActivePortfolioTab] = useState('projects');
  const [externalLightbox, setExternalLightbox] = useState(null);

  const currentCopy = portfolioData[lang];
  const { profile } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      const sections = ['contact', 'gallery', 'projects', 'journey', 'about'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(sec);
            return;
          }
        }
      }
      if (scrollY < 400) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightSection =
    activeSection === 'projects' || activeSection === 'gallery';

  const handleExploreFromFolder = (tabId) => {
    setActivePortfolioTab(tabId);
    setActiveSection('projects');
  };

  return (
    <div className="min-h-screen bg-[#0C1017] text-[#F4F5F7] antialiased selection:bg-[#FF6B4A]/30 selection:text-white">
      {/* Ambient Subtle Top Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-[#FF6B4A]/[0.06] blur-[130px] pointer-events-none z-0" />

      {/* 1. FLOATING PILL NAVBAR WITH COMPANION MASCOT */}
      <Navbar
        lang={lang}
        onSelectLang={setLang}
        copy={currentCopy.nav}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        isLightSection={isLightSection}
      />

      <main id="top" className="relative z-10">
        {/* 2. 5-LAYER PARALLAX WELCOME + GROUNDED STUDENT HERO */}
        <Hero copy={currentCopy.hero} profile={profile} />

        {/* 3. HORIZONTAL TECH STACK BAR WITH LOGOS */}
        <TechStackBar />

        {/* 4. ABOUT ME + SPOTLIGHT PORTRAIT + 3D GLASS FOLDERS */}
        <AboutSection
          copy={currentCopy.about}
          profile={profile}
          onSelectTab={handleExploreFromFolder}
        />

        {/* 5. EDUCATION, ORGANIZATION TIMELINES & CREDENTIAL STRIP */}
        <JourneySection
          copy={currentCopy.journey}
          onOpenLightbox={setExternalLightbox}
        />

        {/* 6. INTERACTIVE GIANT LETTER-PORTAL ZOOM (DARK TO LIGHT TRANSITION) */}
        <LetterPortal copy={currentCopy.portal} />

        {/* 7. TABBED PORTFOLIO SHOWCASE (PROJECTS, CERTIFICATES, AWARDS + LIGHTBOX) */}
        <ProjectsSection
          projects={currentCopy.projects}
          journey={currentCopy.journey}
          navCopy={currentCopy.nav}
          profile={profile}
          activeTab={activePortfolioTab}
          onTabChange={setActivePortfolioTab}
          externalLightboxItem={externalLightbox}
          onCloseExternalLightbox={() => setExternalLightbox(null)}
        />

        {/* 8. 3D PERSPECTIVE CAMPUS ACTIVITY GALLERY */}
        <ActivityGallery
          activities={currentCopy.activities}
          copy={currentCopy.gallery}
          onOpenLightbox={setExternalLightbox}
        />

        {/* 9. CONTACT SECTION */}
        <ContactSection copy={currentCopy.contact} profile={profile} />
      </main>

      <footer className="border-t border-white/[0.06] py-8 bg-[#0C1017]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500">
          <span>© 2026 {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
