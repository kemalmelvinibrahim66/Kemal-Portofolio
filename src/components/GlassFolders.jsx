import { useState } from 'react';
import { FolderOpen, Code2, Award, Trophy, ArrowUpRight } from 'lucide-react';

export function GlassFolders({ folders = [], onSelectTab }) {
  const [openFolderId, setOpenFolderId] = useState('folder-projects');

  const previewCardsByTab = {
    projects: [
      { title: 'Asterisk WA Bot', tag: '15+ Web UI', img: '/assets/asterisk-dashboard.png' },
      { title: 'Panel Pengurus', tag: 'Tailwind + API', img: '/assets/asterisk-login.png' },
      { title: 'BeasiswaKu App', tag: 'Python PyQt6', img: '/assets/beasiswaku-dashboard.png' },
      { title: 'SQL Parser & OOP', tag: 'Pytest & Java', img: null },
    ],
    certificates: [
      { title: 'Machine Learning', tag: 'Dicoding 2026', img: '/assets/cert-dicoding-ml.png' },
      { title: 'Pemrograman Python', tag: 'Dicoding 2026', img: '/assets/cert-dicoding-python.png' },
      { title: 'Asah 2026 Cohort', tag: 'Dicoding x GoTo', img: null },
    ],
    awards: [
      { title: 'Finalis PEKAN IT', tag: 'UNSIKA 2026', img: '/assets/cert-pekan-it-2026.png' },
      { title: 'HIMAKOM Polban', tag: 'Komisi MPA', img: '/assets/activity-mpa-2.jpeg' },
      { title: 'JTK Polban', tag: 'Angkatan 2025', img: '/assets/activity-himakom-1.jpeg' },
    ],
  };

  const iconByTab = {
    projects: Code2,
    certificates: Award,
    awards: Trophy,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 pt-6">
      {folders.map((folder) => {
        const isOpen = openFolderId === folder.id;
        const cards = previewCardsByTab[folder.tabTarget] || [];
        const FolderIcon = iconByTab[folder.tabTarget] || FolderOpen;

        return (
          <div
            key={folder.id}
            data-testid={`glass-folder-${folder.tabTarget}`}
            data-open={isOpen ? 'true' : 'false'}
            onClick={() => setOpenFolderId(isOpen ? null : folder.id)}
            className="group relative cursor-pointer select-none rounded-3xl bg-gradient-to-b from-[#172030]/90 to-[#0F1520]/95 border border-white/[0.09] hover:border-[#FF6B4A]/45 p-6 pt-14 transition-all duration-500 shadow-2xl"
            style={{ perspective: '1200px' }}
          >
            {/* Folder Back Tab */}
            <div className="absolute top-3 left-6 px-3.5 py-1 rounded-t-xl bg-[#1E293B] border-t border-x border-white/10 text-[11px] font-mono text-[#FF856A] flex items-center gap-1.5">
              <FolderIcon className="w-3.5 h-3.5 text-[#FF6B4A]" />
              <span>{folder.count}</span>
            </div>

            {/* Fan-Out 3D Preview Cards Inside the Folder */}
            <div className="relative h-36 mb-4 flex items-center justify-center">
              {cards.slice(0, 3).map((card, idx) => {
                const fanAngle = (idx - 1) * (isOpen ? 10 : 4);
                const liftY = isOpen ? -26 - idx * 6 : -6 - idx * 3;
                const spreadX = (idx - 1) * (isOpen ? 34 : 14);

                return (
                  <div
                    key={card.title}
                    style={{
                      transform: `translateX(${spreadX}px) translateY(${liftY}px) rotate(${fanAngle}deg)`,
                    }}
                    className="absolute w-36 h-24 rounded-xl overflow-hidden border border-white/15 bg-[#1E293B] shadow-xl transition-all duration-500 group-hover:-translate-y-5"
                  >
                    {card.img ? (
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full p-2.5 bg-gradient-to-br from-[#151C28] to-[#0C1017] flex flex-col justify-between font-mono">
                        <span className="text-[9px] text-[#FF6B4A]">{card.tag}</span>
                        <span className="text-[11px] font-bold text-white leading-tight">
                          {card.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2 py-1">
                      <p className="text-[10px] font-semibold text-white truncate">
                        {card.title}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Frosted Glass Front Flap */}
              <div
                style={{
                  transform: isOpen
                    ? 'rotateX(-24deg) translateY(10px)'
                    : 'rotateX(-8deg)',
                  transformOrigin: 'bottom center',
                }}
                className="absolute inset-x-0 bottom-0 h-24 rounded-2xl bg-gradient-to-b from-white/[0.13] to-white/[0.04] backdrop-blur-md border border-white/20 shadow-inner transition-transform duration-500 flex items-end justify-between p-3.5"
              >
                <span className="text-[11px] font-mono text-white/80">
                  {isOpen ? 'Folder Terbuka' : 'Klik untuk buka'}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              </div>
            </div>

            {/* Folder Metadata & Jump Action */}
            <div className="space-y-2 pt-2 border-t border-white/[0.07]">
              <h4 className="text-base font-bold text-white group-hover:text-[#FF856A] transition">
                {folder.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {folder.subtitle}
              </p>
              <div className="pt-2">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectTab) onSelectTab(folder.tabTarget);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#FF6B4A] hover:text-[#FF856A] transition"
                >
                  <span>{folder.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
