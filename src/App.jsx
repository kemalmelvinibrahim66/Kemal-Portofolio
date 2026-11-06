import { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStackBar } from './components/TechStackBar';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';

export function App() {
  const [lang, setLang] = useState('id');
  const currentCopy = portfolioData[lang];
  const { profile } = portfolioData;

  return (
    <div className="min-h-screen bg-[#0C1017] text-[#F4F5F7] antialiased selection:bg-[#FF6B4A]/30 selection:text-white">
      {/* Ambient Subtle Top Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-[#FF6B4A]/[0.06] blur-[130px] pointer-events-none z-0" />

      {/* 1. TOP NAVBAR */}
      <Navbar lang={lang} onSelectLang={setLang} copy={currentCopy.nav} />

      <main id="top" className="relative z-10">
        {/* 2. HERO SECTION */}
        <Hero copy={currentCopy.hero} profile={profile} />

        {/* 3. HORIZONTAL TECH STACK BAR WITH LOGOS */}
        <TechStackBar />

        {/* 4. ABOUT ME + VERTICAL COMPETENCY TIMELINE & STATS */}
        <AboutSection copy={currentCopy.about} />

        {/* 5. FEATURED PROJECTS BENTO GRID */}
        <ProjectsSection
          projects={currentCopy.projects}
          navCopy={currentCopy.nav}
          profile={profile}
        />

        {/* 6. EXPERIENCE, EDUCATION & AWARDS */}
        <JourneySection copy={currentCopy.journey} />

        {/* 7. CONTACT SECTION */}
        <ContactSection copy={currentCopy.contact} profile={profile} />
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500">
          <span>© 2026 {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
