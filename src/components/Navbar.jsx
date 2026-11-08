import { useState } from 'react';
import { motion } from 'framer-motion';

export function Navbar({
  lang,
  onSelectLang,
  copy,
  activeSection = 'home',
  onSelectSection,
  isLightSection = false,
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: 'home', label: copy.home || 'beranda', href: '#top' },
    { id: 'about', label: copy.about, href: '#about' },
    { id: 'projects', label: copy.projects, href: '#projects' },
    { id: 'journey', label: copy.journey, href: '#journey' },
    { id: 'gallery', label: copy.gallery || 'aktivitas', href: '#gallery' },
    { id: 'contact', label: copy.contact, href: '#contact' },
  ];

  const targetMascotTab = hoveredItem || activeSection;

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={`pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
          isLightSection
            ? 'bg-white/85 border-zinc-200/80 text-zinc-800 shadow-zinc-900/10'
            : 'bg-[#0C1017]/80 border-white/10 text-slate-200 shadow-black/50'
        }`}
      >
        {/* Brand Monogram */}
        <a
          href="#top"
          onClick={() => onSelectSection && onSelectSection('home')}
          className={`px-3 py-1.5 rounded-full font-extrabold text-sm tracking-tight transition ${
            isLightSection ? 'text-zinc-900 hover:bg-zinc-100' : 'text-white hover:bg-white/5'
          }`}
        >
          KM<span className="text-[#FF6B4A]">.</span>
        </a>

        {/* Interactive Pill Links with Bouncing Companion Mascot */}
        <div className="flex items-center gap-0.5 sm:gap-1 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const hasMascot = targetMascotTab === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => onSelectSection && onSelectSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono capitalize transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : isLightSection
                    ? 'text-zinc-600 hover:text-zinc-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[#FF6B4A] shadow-[0_0_20px_rgba(255,107,74,0.45)] -z-10"
                  />
                )}

                {hasMascot && (
                  <motion.span
                    layoutId="anime-mascot"
                    data-testid="nav-mascot"
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center"
                  >
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-6 h-5 rounded-full bg-white border border-[#FF6B4A]/40 shadow-md flex flex-col items-center justify-center relative"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-900" />
                        <span className="w-1 h-1 rounded-full bg-slate-900" />
                      </span>
                      <span className="flex items-center justify-between w-3.5 -mt-0.5">
                        <span className="w-1 h-0.5 rounded-full bg-[#FF6B4A]/70" />
                        <span className="w-1 h-0.5 rounded-full bg-[#FF6B4A]/70" />
                      </span>
                    </motion.span>
                    <span className="w-1.5 h-1.5 rotate-45 bg-white -mt-1 border-r border-b border-[#FF6B4A]/30" />
                  </motion.span>
                )}

                {item.label}
              </a>
            );
          })}
        </div>

        {/* Status Dot (Desktop) */}
        <div
          className={`hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono ${
            isLightSection
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-[#111722]/90 border-white/10 text-slate-300'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{copy.status}</span>
        </div>

        {/* Bilingual Switcher */}
        <div
          className={`flex items-center p-0.5 rounded-full border text-[11px] font-mono ${
            isLightSection
              ? 'bg-zinc-100 border-zinc-200'
              : 'bg-[#111722] border-white/10'
          }`}
          role="group"
          aria-label="Language switcher"
        >
          <button
            type="button"
            onClick={() => onSelectLang('id')}
            className={`px-2 py-0.5 rounded-full transition font-semibold ${
              lang === 'id'
                ? 'bg-[#FF6B4A] text-white'
                : isLightSection
                ? 'text-zinc-500 hover:text-zinc-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => onSelectLang('en')}
            className={`px-2 py-0.5 rounded-full transition font-semibold ${
              lang === 'en'
                ? 'bg-[#FF6B4A] text-white'
                : isLightSection
                ? 'text-zinc-500 hover:text-zinc-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  );
}
