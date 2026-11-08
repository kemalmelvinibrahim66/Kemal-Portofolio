import { useState } from 'react';
import { Maximize2, Users } from 'lucide-react';
import { TopographyCanvas } from './TopographyCanvas';

export function ActivityGallery({ activities = [], copy = {}, onOpenLightbox }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      id="gallery"
      className="relative py-24 bg-[#FAFAFA] text-zinc-900 border-t border-zinc-200/80 overflow-hidden"
    >
      <TopographyCanvas theme="light" className="absolute opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B4A] font-semibold">
            <span>04</span>
            <span>/</span>
            <span>{copy.label || 'Dokumentasi Kampus'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            {copy.heading || 'Kebersamaan di Organisasi'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            {copy.sub}
          </p>
        </div>

        {/* 3D Perspective Floating Cards Stage */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-2"
          style={{ perspective: '1400px' }}
        >
          {activities.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            const isDesktop =
              typeof window !== 'undefined' && window.innerWidth >= 768;
            const defaultTilt = isDesktop
              ? idx === 0
                ? -2.5
                : idx === 2
                ? 2.5
                : 0
              : 0;

            return (
              <article
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    title: item.title,
                    subtitle: item.role,
                    image: item.image,
                  })
                }
                style={{
                  transform: isHovered
                    ? 'translateY(-12px) rotateY(0deg) scale(1.02)'
                    : `rotateZ(${defaultTilt}deg)`,
                }}
                className="group cursor-pointer rounded-3xl bg-white border border-zinc-200/90 hover:border-[#FF6B4A] shadow-xl shadow-zinc-900/5 overflow-hidden transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    <span>{item.date}</span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Lihat foto ${item.title}`}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/65 group-hover:bg-[#FF6B4A] text-white transition"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-mono font-semibold text-[#E04F2E]">
                    {item.role}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
