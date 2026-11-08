import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar({
  lang,
  onSelectLang,
  copy,
  activeSection = 'home',
  onSelectSection,
  isLightSection = false,
}) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: copy.home || 'beranda', href: '#top', primary: true },
    { id: 'about', label: copy.about, href: '#about', primary: true },
    { id: 'projects', label: copy.projects, href: '#projects', primary: true },
    { id: 'journey', label: copy.journey, href: '#journey', primary: false },
    { id: 'gallery', label: copy.gallery || 'aktivitas', href: '#gallery', primary: false },
    { id: 'contact', label: copy.contact, href: '#contact', primary: true },
  ];

  // On mobile pill bar, if activeSection is 'journey' or 'gallery', map mascot to 'about' or 'projects' so it always stays visible inside the viewport
  const targetMascotTab = hoveredItem || activeSection;
  const mobileMascotTab =
    targetMascotTab === 'journey'
      ? 'about'
      : targetMascotTab === 'gallery'
      ? 'projects'
      : targetMascotTab;

  return (
    <header className="fixed top-6 sm:top-7 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={`pointer-events-auto max-w-full flex items-center justify-between gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
          isLightSection
            ? 'bg-white/90 border-zinc-200/90 text-zinc-800 shadow-zinc-900/10'
            : 'bg-[#0C1017]/85 border-white/10 text-slate-200 shadow-black/60'
        }`}
      >
        {/* Brand Monogram */}
        <a
          href="#top"
          onClick={() => {
            if (onSelectSection) onSelectSection('home');
            setMobileMenuOpen(false);
          }}
          className={`px-2 sm:px-3 py-1 rounded-full font-extrabold text-xs sm:text-sm tracking-tight shrink-0 transition ${
            isLightSection
              ? 'text-zinc-900 hover:bg-zinc-100'
              : 'text-white hover:bg-white/5'
          }`}
        >
          KM<span className="text-[#FF6B4A]">.</span>
        </a>

        {/* Interactive Pill Links (4 primary items on mobile so it NEVER overflows 360px-430px screens, all 6 items on md+) */}
        <div className="flex items-center gap-0.5 sm:gap-1 relative">
          {navItems.map((item) => {
            const isActive =
              activeSection === item.id ||
              (!item.primary &&
                ((item.id === 'journey' && activeSection === 'journey') ||
                  (item.id === 'gallery' && activeSection === 'gallery')));

            // Show mascot on desktop for exact tab, or on mobile mapped to primary tab
            const hasMascot =
              targetMascotTab === item.id ||
              (item.primary && mobileMascotTab === item.id && targetMascotTab !== item.id);

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (onSelectSection) onSelectSection(item.id);
                  setMobileMenuOpen(false);
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`${
                  item.primary ? 'inline-flex' : 'hidden md:inline-flex'
                } relative items-center px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono capitalize whitespace-nowrap transition-colors ${
                  activeSection === item.id ||
                  (item.id === 'about' && activeSection === 'journey' && !hoveredItem) ||
                  (item.id === 'projects' && activeSection === 'gallery' && !hoveredItem)
                    ? 'text-white font-semibold'
                    : isLightSection
                    ? 'text-zinc-600 hover:text-zinc-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {(activeSection === item.id ||
                  (item.id === 'about' &&
                    activeSection === 'journey' &&
                    typeof window !== 'undefined' &&
                    window.innerWidth < 768) ||
                  (item.id === 'projects' &&
                    activeSection === 'gallery' &&
                    typeof window !== 'undefined' &&
                    window.innerWidth < 768)) && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[#FF6B4A] shadow-[0_0_20px_rgba(255,107,74,0.45)] -z-10"
                  />
                )}

                {targetMascotTab === item.id && (
                  <motion.span
                    layoutId="anime-mascot"
                    data-testid="nav-mascot"
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-20"
                  >
                    <motion.span
                      animate={{ y: [0, -2.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-5 h-4 sm:w-6 sm:h-5 rounded-full bg-white border border-[#FF6B4A]/40 shadow-md flex flex-col items-center justify-center relative"
                    >
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-900" />
                        <span className="w-1 h-1 rounded-full bg-slate-900" />
                      </span>
                      <span className="flex items-center justify-between w-3 sm:w-3.5 -mt-0.5">
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

        {/* Status Dot (Large Screens Only) */}
        <div
          className={`hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono shrink-0 ${
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
          className={`flex items-center p-0.5 rounded-full border text-[10px] sm:text-[11px] font-mono shrink-0 ${
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
            className={`px-1.5 sm:px-2 py-0.5 rounded-full transition font-semibold ${
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
            className={`px-1.5 sm:px-2 py-0.5 rounded-full transition font-semibold ${
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

        {/* Mobile Extra Sections Drawer Button (for Perjalanan & Aktivitas on <768px) */}
        <button
          type="button"
          aria-label="Toggle extra sections menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`md:hidden p-1.5 rounded-full transition shrink-0 ${
            isLightSection
              ? 'text-zinc-700 hover:bg-zinc-100'
              : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Compact Mobile Dropdown for All 6 Sections */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto md:hidden mt-2 w-64 rounded-2xl border p-2 backdrop-blur-xl shadow-2xl grid grid-cols-2 gap-1 ${
            isLightSection
              ? 'bg-white/95 border-zinc-200 text-zinc-800'
              : 'bg-[#0C1017]/95 border-white/10 text-slate-200'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={`mob-${item.id}`}
              href={item.href}
              onClick={() => {
                if (onSelectSection) onSelectSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-mono capitalize text-center transition ${
                activeSection === item.id
                  ? 'bg-[#FF6B4A] text-white font-semibold'
                  : isLightSection
                  ? 'hover:bg-zinc-100 text-zinc-700'
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
