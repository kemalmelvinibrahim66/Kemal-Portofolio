import { useState } from 'react';
import { LayoutIcon, TerminalIcon, CodeIcon } from './Icons';
import { TopographyCanvas } from './TopographyCanvas';
import { GlassFolders } from './GlassFolders';

const competencyIcons = {
  'comp-1': LayoutIcon,
  'comp-2': TerminalIcon,
  'comp-3': CodeIcon,
};

export function AboutSection({ copy, profile, onSelectTab }) {
  const [cursorPos, setCursorPos] = useState({ x: 140, y: 140 });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Animated Topographic Contour Background */}
      <TopographyCanvas theme="dark" className="absolute opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-20">
        {/* Part 1: Interactive Spotlight Portrait + Grounded Student Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (5 cols): Interactive Cursor Spotlight Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              data-testid="spotlight-portrait"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
              className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 bg-[#131A26] shadow-2xl cursor-crosshair select-none group"
            >
              {/* Base Layer: Natural Student Portrait */}
              <img
                src={profile?.aboutPhoto || profile?.photo || '/assets/profile_0.png'}
                alt={profile?.name || 'Kemal Melvin Ibrahim'}
                className="w-full h-full object-cover object-top"
              />

              {/* Spotlight Reveal Layer: Warm Coral Blueprint / Terminal HUD Overlay */}
              <div
                style={{
                  WebkitMaskImage: `radial-gradient(circle ${
                    isHoveringPhoto ? '125px' : '65px'
                  } at ${cursorPos.x}px ${cursorPos.y}px, black 55%, transparent 100%)`,
                  maskImage: `radial-gradient(circle ${
                    isHoveringPhoto ? '125px' : '65px'
                  } at ${cursorPos.x}px ${cursorPos.y}px, black 55%, transparent 100%)`,
                }}
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              >
                <img
                  src={profile?.aboutPhoto || profile?.photo || '/assets/profile_0.png'}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-top filter contrast-150 saturate-200 hue-rotate-[-18deg] brightness-110"
                />
                <div className="absolute inset-0 bg-[#FF6B4A]/25 mix-blend-color" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,107,74,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,107,74,0.22)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/75 border border-[#FF6B4A]/60 text-[10px] font-mono text-[#FF856A]">
                  POLBAN // D4-TIF
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 border border-[#FF6B4A]/60 text-[10px] font-mono text-emerald-300">
                  ASAH_2026: ACTIVE
                </div>
              </div>

              {/* Bottom Glass Caption */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#0C1017]/80 backdrop-blur-md border border-white/10 px-3.5 py-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-300 truncate">
                  {copy.spotlight_hint || 'Arahkan kursor ke foto'}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B4A] shrink-0" />
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Grounded Bio, Focus Areas & Metrics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B4A]">
              <span>01</span>
              <span>/</span>
              <span>{copy.heading}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {copy.heading}
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed text-[15px] sm:text-base">
              <p>{copy.p1}</p>
              <p>{copy.p2}</p>
            </div>

            {/* 3 Grounded Learning Focus Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {copy.competencies.map((comp) => {
                const IconComponent = competencyIcons[comp.id] || CodeIcon;
                return (
                  <div
                    key={comp.id}
                    className="p-4 rounded-2xl bg-[#151C28]/90 border border-white/[0.07] hover:border-[#FF6B4A]/40 transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FF6B4A]/10 border border-[#FF6B4A]/30 flex items-center justify-center text-[#FF6B4A] mb-3">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-white leading-snug">
                      {comp.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">
                      {comp.tech}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 3 Coral Plus Counters */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/[0.08]">
              {copy.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {metric.value}
                    <span className="text-[#FF6B4A]">+</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Interactive 3D macOS-Style Glass Folders */}
        {copy.folders && (
          <div className="space-y-3 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {copy.folders_heading || 'Arsip Ringkas'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {copy.folders_sub}
                </p>
              </div>
            </div>
            <GlassFolders folders={copy.folders} onSelectTab={onSelectTab} />
          </div>
        )}
      </div>
    </section>
  );
}
