import { useState, useEffect } from 'react';
import { Code2, Award, Trophy, Maximize2, X, ExternalLink, Terminal } from 'lucide-react';
import { GitHubIcon, ArrowUpRightIcon } from './Icons';
import { TopographyCanvas } from './TopographyCanvas';

export function ProjectsSection({
  projects = [],
  journey = {},
  navCopy = {},
  profile = {},
  activeTab = 'projects',
  onTabChange,
  externalLightboxItem,
  onCloseExternalLightbox,
}) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [asteriskPreviewIndex, setAsteriskPreviewIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (externalLightboxItem) {
      setLightboxItem(externalLightboxItem);
    }
  }, [externalLightboxItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
        if (onCloseExternalLightbox) onCloseExternalLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseExternalLightbox]);

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
    if (onCloseExternalLightbox) onCloseExternalLightbox();
  };

  const tabs = [
    {
      id: 'projects',
      label: navCopy.tab_projects || 'Proyek',
      count: projects.length,
      icon: Code2,
    },
    {
      id: 'certificates',
      label: navCopy.tab_certificates || 'Sertifikat',
      count: (journey.certificates || []).length,
      icon: Award,
    },
    {
      id: 'awards',
      label: navCopy.tab_awards || 'Penghargaan',
      count: journey.award ? 1 : 0,
      icon: Trophy,
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-24 bg-[#FAFAFA] text-zinc-900 overflow-hidden transition-colors"
    >
      {/* Subtle Light Mode Topographic Lines */}
      <TopographyCanvas theme="light" className="absolute opacity-75" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-12">
        {/* Header & Segmented Tab Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B4A] font-semibold">
              <span>03</span>
              <span>/</span>
              <span>{navCopy.proj_label}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              {navCopy.proj_heading}
            </h2>
          </div>

          {/* Segmented Pill Tab Bar (inspired by reference showcase) */}
          <div
            role="tablist"
            aria-label="Portfolio Categories"
            className="inline-flex items-center p-1.5 rounded-2xl bg-white border border-zinc-200/90 shadow-lg shadow-zinc-900/5 self-start"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-[#FF6B4A] text-white shadow-md shadow-[#FF6B4A]/30'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                      isSelected
                        ? 'bg-black/20 text-white'
                        : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: PROJECTS (Screenshots for p1/p2 + Code Terminal Preview for p3/p4) */}
        {currentTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            {projects.map((project) => {
              const hasDualScreens = Boolean(project.image && project.secondaryImage);
              const displayedScreen =
                hasDualScreens && asteriskPreviewIndex === 1
                  ? project.secondaryImage
                  : project.image;

              return (
                <article
                  key={project.id}
                  className={`${project.spanClass} group rounded-3xl bg-white border border-zinc-200/90 hover:border-[#FF6B4A]/60 shadow-xl shadow-zinc-900/5 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300`}
                >
                  <div className="space-y-5">
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B4A]/10 text-[#E04F2E] border border-[#FF6B4A]/25 text-xs font-mono font-semibold">
                        {project.badge}
                      </span>

                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-[#FF6B4A] transition"
                        >
                          <GitHubIcon className="w-3.5 h-3.5 fill-current" />
                          <span>{project.repoLabel}</span>
                          <ArrowUpRightIcon className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">
                          {project.dateLabel}
                        </span>
                      )}
                    </div>

                    {/* Visual Media: Real Screenshot (p1 & p2) OR Interactive Code Terminal (p3 & p4) */}
                    {displayedScreen ? (
                      <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 group/img">
                        <img
                          src={displayedScreen}
                          alt={project.title}
                          onClick={() =>
                            setLightboxItem({
                              title: project.title,
                              subtitle: project.badge,
                              image: displayedScreen,
                            })
                          }
                          className="w-full h-52 sm:h-60 object-cover object-top cursor-zoom-in group-hover/img:scale-[1.02] transition-transform duration-500"
                        />

                        {/* Zoom Button */}
                        <button
                          type="button"
                          aria-label={`Perbesar gambar ${project.title}`}
                          onClick={() =>
                            setLightboxItem({
                              title: project.title,
                              subtitle: project.badge,
                              image: displayedScreen,
                            })
                          }
                          className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-[#FF6B4A] text-white transition shadow-lg"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>

                        {/* Switcher for Asterisk Dashboard vs Login */}
                        {hasDualScreens && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
                            <button
                              type="button"
                              onClick={() => setAsteriskPreviewIndex(0)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                                asteriskPreviewIndex === 0
                                  ? 'bg-[#FF6B4A] text-white font-semibold'
                                  : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              Dashboard PJ
                            </button>
                            <button
                              type="button"
                              onClick={() => setAsteriskPreviewIndex(1)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                                asteriskPreviewIndex === 1
                                  ? 'bg-[#FF6B4A] text-white font-semibold'
                                  : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              Login Pengurus
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      project.codePreview && (
                        <div className="rounded-2xl overflow-hidden bg-[#0F1520] border border-slate-800 text-slate-200 font-mono text-xs shadow-inner">
                          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161F2E] border-b border-white/10">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                              <span className="ml-2 text-[11px] text-slate-300">
                                {project.codePreview.filename}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#FF856A]">
                              <Terminal className="w-3 h-3" />
                              {project.codePreview.lang}
                            </span>
                          </div>
                          <div className="p-4 space-y-1 overflow-x-auto text-[11px] leading-relaxed text-slate-300">
                            {project.codePreview.lines.map((line, i) => (
                              <div key={i} className="whitespace-pre">
                                <span className="text-slate-600 select-none mr-3">
                                  {i + 1}
                                </span>
                                <span>{line}</span>
                              </div>
                            ))}
                          </div>
                          <div className="px-4 py-2 bg-emerald-950/40 border-t border-emerald-500/20 text-[11px] text-emerald-300">
                            {project.codePreview.output}
                          </div>
                        </div>
                      )
                    )}

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {project.highlights.map((hl) => (
                          <div
                            key={hl.mono}
                            className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80"
                          >
                            <div className="text-xs font-mono font-bold text-[#E04F2E]">
                              {hl.mono}
                            </div>
                            <div className="text-[11px] text-zinc-600 mt-0.5">
                              {hl.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-5 mt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 text-[11px] font-mono text-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#E04F2E] hover:underline"
                      >
                        <span>Kode Sumber</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* TAB 2: CERTIFICATES (Dicoding Machine Learning & Python with Lightbox) */}
        {currentTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(journey.certificates || []).map((cert) => (
              <div
                key={cert.credentialId}
                className="group rounded-3xl bg-white border border-zinc-200/90 hover:border-[#FF6B4A] shadow-xl shadow-zinc-900/5 overflow-hidden flex flex-col justify-between transition-all"
              >
                <div
                  onClick={() =>
                    setLightboxItem({
                      title: cert.title,
                      subtitle: `${cert.meta} (${cert.credentialId})`,
                      image: cert.image,
                      url: cert.url,
                    })
                  }
                  className="relative h-64 bg-zinc-900 overflow-hidden cursor-zoom-in"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-lg">
                      <Maximize2 className="w-4 h-4 text-[#FF6B4A]" />
                      <span>Lihat Sertifikat</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-[#FF6B4A]/10 text-[#E04F2E] font-semibold">
                      {cert.badge || 'Sertifikat Kelulusan'}
                    </span>
                    <span className="text-zinc-500">{cert.credentialId}</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">{cert.title}</h3>
                  <p className="text-xs font-mono text-zinc-500">{cert.meta}</p>
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxItem({
                          title: cert.title,
                          subtitle: `${cert.meta} (${cert.credentialId})`,
                          image: cert.image,
                          url: cert.url,
                        })
                      }
                      className="text-xs font-mono font-semibold text-zinc-700 hover:text-[#FF6B4A]"
                    >
                      Perbesar Gambar
                    </button>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#E04F2E] hover:underline"
                    >
                      <span>Verifikasi Resmi Dicoding</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: AWARDS (Finalis PEKAN IT 2026 UNSIKA with Lightbox) */}
        {currentTab === 'awards' && journey.award && (
          <div className="max-w-3xl mx-auto">
            <div className="group rounded-3xl bg-white border border-zinc-200/90 hover:border-[#FF6B4A] shadow-xl shadow-zinc-900/5 overflow-hidden transition-all">
              <div
                onClick={() =>
                  setLightboxItem({
                    title: journey.award.title,
                    subtitle: journey.award.meta,
                    image: journey.award.image,
                  })
                }
                className="relative h-72 sm:h-96 bg-zinc-900 overflow-hidden cursor-zoom-in"
              >
                <img
                  src={journey.award.image}
                  alt={journey.award.title}
                  className="w-full h-full object-contain bg-zinc-950 group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-lg">
                    <Maximize2 className="w-4 h-4 text-[#FF6B4A]" />
                    <span>Perbesar Sertifikat Penghargaan</span>
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FF6B4A]/10 text-[#E04F2E] text-xs font-mono font-semibold">
                  {journey.award.meta}
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-900">
                  {journey.award.title}
                </h3>
                <p className="text-sm text-zinc-600">{journey.award.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom GitHub Link */}
        <div className="pt-4 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono transition shadow-md"
          >
            <GitHubIcon className="w-4 h-4 fill-current" />
            <span>{profile.githubDomain}</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR SCREENSHOTS, CERTIFICATES & AWARDS */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl bg-[#111722] border border-white/15 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">
                  {lightboxItem.title}
                </h3>
                {lightboxItem.subtitle && (
                  <p className="text-xs font-mono text-slate-400">
                    {lightboxItem.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Close preview"
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-white/10 hover:bg-[#FF6B4A] text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-black flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
