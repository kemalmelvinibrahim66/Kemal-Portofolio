import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRightIcon,
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  MailIcon,
  CurvedArrowLeft,
  CurvedArrowRight,
} from './Icons';

export function Hero({ copy, profile }) {
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start start', 'end start'],
  });

  // 5-Layer Parallax Transforms (inspired by reference walkthrough, custom Bandung night ridge + coral glow)
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const mountainY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const mountainScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], ['15%', '-25%', '-65%']);
  const titleScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 1.06, 1.15]);
  const ridgeY = useTransform(scrollYProgress, [0, 1], ['0%', '-48%']);
  const canopyScale = useTransform(scrollYProgress, [0, 0.45], [1, 2.35]);
  const canopyOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div className="relative">
      {/* PART A: 5-LAYER PARALLAX MOUNTAIN & NIGHT SKY OPENER */}
      <section
        ref={parallaxRef}
        aria-label="Parallax Welcome Banner"
        className="relative h-[135vh] sm:h-[155vh] w-full overflow-clip bg-gradient-to-b from-[#06090F] via-[#0C1017] to-[#0C1017]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Layer 1 (z-0): Night Sky, Stars & Warm Coral Moon Glow */}
          <motion.div
            style={{ y: starsY }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute top-16 right-[18%] w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-[#FF6B4A]/20 blur-[60px]" />
            <div className="absolute top-24 right-[21%] w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFF3EE] via-[#FFB4A1] to-[#FF6B4A]/60 shadow-[0_0_60px_rgba(255,107,74,0.45)]" />
            <svg
              className="w-full h-full opacity-55"
              viewBox="0 0 1440 800"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <circle cx="190" cy="120" r="1.5" fill="#F8FAFC" />
              <circle cx="340" cy="80" r="2" fill="#FF856A" />
              <circle cx="520" cy="160" r="1.2" fill="#F8FAFC" />
              <circle cx="780" cy="95" r="1.8" fill="#F8FAFC" />
              <circle cx="960" cy="140" r="1.5" fill="#F8FAFC" />
              <circle cx="1180" cy="110" r="2" fill="#FF856A" />
              <circle cx="1310" cy="190" r="1.4" fill="#F8FAFC" />
              <circle cx="120" cy="260" r="1.3" fill="#94A3B8" />
              <circle cx="640" cy="220" r="1.6" fill="#94A3B8" />
            </svg>
          </motion.div>

          {/* Layer 2 (z-10): Distant Bandung Mountain Peaks */}
          <motion.div
            style={{ y: mountainY, scale: mountainScale }}
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          >
            <svg
              viewBox="0 0 1440 520"
              fill="none"
              className="w-full h-[52vh] sm:h-[62vh]"
              preserveAspectRatio="none"
            >
              <path
                d="M0 520L0 310L185 180L350 265L560 95L770 240L980 115L1210 250L1440 150L1440 520Z"
                fill="url(#mountainGradBack)"
              />
              <path
                d="M560 95L625 145L580 165L540 135L560 95Z"
                fill="#FF6B4A"
                fillOpacity="0.22"
              />
              <path
                d="M980 115L1040 165L995 190L955 150L980 115Z"
                fill="#FF856A"
                fillOpacity="0.18"
              />
              <defs>
                <linearGradient id="mountainGradBack" x1="720" y1="95" x2="720" y2="520" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="55%" stopColor="#111722" />
                  <stop offset="100%" stopColor="#0C1017" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Layer 3 (z-20): Giant Typography Sandwiched Between Mountain & Foreground Ridge */}
          <motion.div
            style={{ y: titleY, scale: titleScale }}
            className="relative z-20 text-center px-6 select-none pointer-events-none -mt-16 sm:-mt-24"
          >
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#FF856A] mb-3">
              {copy.parallax_subtitle || 'Kemal Melvin Ibrahim • D4 Teknik Informatika Polban'}
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              {copy.parallax_title || 'WELCOME TO MY PORTOFOLIO'}
            </h2>
          </motion.div>

          {/* Layer 4 (z-30): Foreground Ridge & Student Silhouette */}
          <motion.div
            style={{ y: ridgeY }}
            className="absolute inset-x-0 bottom-0 z-30 pointer-events-none"
          >
            <svg
              viewBox="0 0 1440 380"
              fill="none"
              className="w-full h-[38vh] sm:h-[45vh]"
              preserveAspectRatio="none"
            >
              <path
                d="M0 380L0 250L260 190L510 255L720 165L950 245L1220 185L1440 235L1440 380Z"
                fill="#0C1017"
              />
              <path
                d="M260 190L510 255L720 165L950 245"
                stroke="#FF6B4A"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          {/* Layer 5 (z-40): Parting Pine/Forest Canopy Frame on Initial Scroll */}
          <motion.div
            style={{ scale: canopyScale, opacity: canopyOpacity }}
            className="absolute inset-0 z-40 pointer-events-none flex justify-between items-stretch"
          >
            <div className="w-24 sm:w-48 h-full bg-gradient-to-r from-[#05070B] via-[#05070B]/60 to-transparent" />
            <div className="w-24 sm:w-48 h-full bg-gradient-to-l from-[#05070B] via-[#05070B]/60 to-transparent" />
          </motion.div>

          {/* Scroll Prompt Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-slate-400">
            <span className="text-[11px] font-mono tracking-wider uppercase">
              {copy.scroll_hint || 'Gulir ke bawah untuk menjelajah'}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
            >
              <span className="w-1 h-2 rounded-full bg-[#FF6B4A]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PART B: GROUNDED STUDENT HERO INTRO */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Academic Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#151C28] border border-white/[0.08] text-xs font-mono text-slate-300">
              <span className="text-[#FF6B4A] font-semibold">Polban</span>
              <span className="text-slate-600">•</span>
              <span>{copy.pill}</span>
            </div>

            {/* Grounded Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] text-white">
              <span>{copy.h1_a}</span>{' '}
              <span className="font-serif italic font-normal text-[#FF856A] px-1">
                {copy.h1_italic}
              </span>{' '}
              <span>{copy.h1_b}</span>
            </h1>

            {/* Natural, Humble Description */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {copy.desc}
            </p>

            {/* Primary CTA Buttons & Social Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF6B4A] hover:bg-[#ff7d60] text-[#0C1017] font-bold text-sm transition shadow-lg shadow-[#FF6B4A]/20"
              >
                <span>{copy.btn_projects}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#151C28] hover:bg-[#1c2535] text-white font-semibold text-sm border border-white/10 transition"
              >
                <span>{copy.btn_contact}</span>
              </a>

              <div className="flex items-center gap-2 pl-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-[#151C28] hover:bg-white/10 text-slate-300 hover:text-white border border-white/[0.07] transition"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-[#151C28] hover:bg-white/10 text-slate-300 hover:text-[#0A66C2] border border-white/[0.07] transition"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 rounded-xl bg-[#151C28] hover:bg-white/10 text-slate-300 hover:text-[#E4405F] border border-white/[0.07] transition"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="p-3 rounded-xl bg-[#151C28] hover:bg-white/10 text-slate-300 hover:text-[#FF6B4A] border border-white/[0.07] transition"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) — Portrait with Callout Annotations (Clean bottom) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              <div
                className="absolute inset-0 dot-matrix opacity-35 rounded-3xl -rotate-6 scale-105 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#FF6B4A]/25 via-[#FF6B4A]/5 to-transparent blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Top-Left Callout */}
              <div className="hidden sm:flex items-center gap-1.5 absolute -top-5 -left-6 z-20">
                <span className="px-3 py-1 rounded-lg bg-[#151C28]/95 border border-white/10 text-[11px] font-mono text-slate-300 shadow-lg">
                  {copy.callout_1}
                </span>
                <CurvedArrowLeft className="w-7 h-7 text-[#FF6B4A] translate-y-2" />
              </div>

              {/* Top-Right Callout */}
              <div className="hidden sm:flex items-center gap-1.5 absolute top-6 -right-8 z-20">
                <CurvedArrowRight className="w-7 h-7 text-[#FF6B4A] translate-y-1" />
                <span className="px-3 py-1 rounded-lg bg-[#151C28]/95 border border-white/10 text-[11px] font-mono text-[#FF856A] shadow-lg">
                  {copy.callout_2}
                </span>
              </div>

              {/* Circular Portrait Frame */}
              <div className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-full p-1.5 bg-gradient-to-b from-[#FF6B4A]/60 via-white/15 to-white/5 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#131A26]">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
