import { useState } from 'react';
import { TrophyIcon, ArrowUpRightIcon } from './Icons';

export function JourneySection({ copy, onOpenLightbox }) {
  const [hoveredEdu, setHoveredEdu] = useState(null);
  const [hoveredOrg, setHoveredOrg] = useState(null);

  return (
    <section
      id="journey"
      className="py-24 bg-[#111722]/60 border-y border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B4A]">
            <span>02</span>
            <span>/</span>
            <span>{copy.exp_label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {copy.exp_heading}
          </h2>
        </div>

        {/* Two-Column Interactive Timelines (Education & Organizations) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (6 cols): Numbered Education Steps with Hover Spotlight */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
              {copy.edu_title || 'Pendidikan & Studi Independen'}
            </h3>
            <div className="space-y-4">
              {(copy.education || []).map((edu, idx) => {
                const isDimmed = hoveredEdu !== null && hoveredEdu !== idx;
                const isHighlighted = hoveredEdu === idx;

                return (
                  <div
                    key={edu.title}
                    onMouseEnter={() => setHoveredEdu(idx)}
                    onMouseLeave={() => setHoveredEdu(null)}
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-[#172030] border-[#FF6B4A]/50 shadow-xl'
                        : 'bg-[#151C28]/80 border-white/[0.07]'
                    } ${isDimmed ? 'opacity-45' : 'opacity-100'}`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`w-9 h-9 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-all ${
                          isHighlighted
                            ? 'bg-white text-[#0C1017] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                            : 'bg-[#FF6B4A]/15 text-[#FF6B4A] border border-[#FF6B4A]/30'
                        }`}
                      >
                        {edu.step}
                      </span>
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-[#FF856A]">
                          {edu.date}
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {edu.title}
                        </h4>
                        <p className="text-xs font-mono text-slate-300">
                          {edu.subtitle}
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed pt-1">
                          {edu.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (6 cols): Organization & Activity Timeline */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
              {copy.org_title || 'Organisasi & Kepanitiaan'}
            </h3>
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              {copy.timeline.map((item, idx) => {
                const isDimmed = hoveredOrg !== null && hoveredOrg !== idx;
                return (
                  <div
                    key={item.title}
                    onMouseEnter={() => setHoveredOrg(idx)}
                    onMouseLeave={() => setHoveredOrg(null)}
                    className={`relative group transition-opacity duration-300 ${
                      isDimmed ? 'opacity-45' : 'opacity-100'
                    }`}
                  >
                    <span
                      className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        item.isActive
                          ? 'bg-[#FF6B4A] border-[#FF6B4A] shadow-[0_0_12px_#FF6B4A]'
                          : 'bg-[#0C1017] border-slate-500 group-hover:border-[#FF6B4A]'
                      }`}
                    />
                    <span className="text-xs font-mono text-[#FF856A]">
                      {item.date}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Credential Strip with Direct Lightbox Preview */}
        <div className="pt-6 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Highlighted Award */}
          <div
            onClick={() =>
              onOpenLightbox &&
              onOpenLightbox({
                title: copy.award.title,
                subtitle: copy.award.meta,
                image: copy.award.image,
              })
            }
            className="p-5 rounded-2xl bg-gradient-to-br from-[#FF6B4A]/15 via-[#151C28] to-[#151C28] border border-[#FF6B4A]/35 hover:border-[#FF6B4A] cursor-pointer transition group"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#FF6B4A]/20 text-[#FF6B4A] shrink-0">
                <TrophyIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#FF856A]">
                  {copy.award.meta}
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5 group-hover:text-[#FF856A] transition">
                  {copy.award.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {copy.award.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* 2 Verified Dicoding Certificates */}
          {copy.certificates.map((cert) => (
            <a
              key={cert.credentialId}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-2xl bg-[#151C28] border border-white/[0.07] hover:border-[#FF6B4A]/40 transition group"
            >
              <div className="pr-3">
                <span className="text-[11px] font-mono text-slate-400">
                  {cert.meta}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5 group-hover:text-[#FF856A] transition">
                  {cert.title}
                </h4>
                <span className="inline-block mt-1.5 text-[11px] font-mono text-[#FF6B4A]">
                  {cert.credentialId}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-[#FF6B4A] text-slate-400 group-hover:text-[#0C1017] transition shrink-0">
                <ArrowUpRightIcon className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
