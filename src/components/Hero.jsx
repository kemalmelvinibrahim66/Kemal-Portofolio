import {
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  CodeIcon,
  CurvedArrowLeft,
  CurvedArrowRight,
} from './Icons';

export function Hero({ copy, profile }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-12 pb-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151C28] border border-white/10 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
            <span>{copy.pill}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.12]">
            <span>{copy.h1_a}</span>
            <span className="font-serif italic font-normal text-[#FF856A] px-1">
              {copy.h1_italic}
            </span>
            <span>{copy.h1_b}</span>
          </h1>

          <p className="text-slate-400 text-base leading-relaxed max-w-xl">
            {copy.desc}
          </p>

          {/* Action Buttons + Quick Social Icon Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition shadow-lg"
            >
              <span>{copy.btn_projects}</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#151C28] hover:bg-[#1C2536] border border-white/15 text-white font-medium text-sm transition"
            >
              <span>{copy.btn_contact}</span>
              <DownloadIcon className="w-4 h-4 text-[#FF6B4A]" />
            </a>

            {/* Social Logos Pill Group */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="w-10 h-10 rounded-full bg-[#151C28] hover:bg-[#FF6B4A]/20 border border-white/10 hover:border-[#FF6B4A]/50 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                <GitHubIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#151C28] hover:bg-[#FF6B4A]/20 border border-white/10 hover:border-[#FF6B4A]/50 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                <LinkedInIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-full bg-[#151C28] hover:bg-[#FF6B4A]/20 border border-white/10 hover:border-[#FF6B4A]/50 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                <InstagramIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Dot-Matrix + Coral Glowing Ring + Floating Callouts */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[460px] h-[390px] flex items-center justify-center">
            <div className="w-[310px] h-[310px] sm:w-[340px] sm:h-[340px] dot-matrix rounded-3xl flex items-center justify-center relative">
              <span className="absolute -left-5 top-1/2 -translate-y-1/2 font-mono text-4xl font-bold text-[#FF6B4A]/40 select-none">
                &lt;
              </span>
              <span className="absolute -right-5 top-1/2 -translate-y-1/2 font-mono text-4xl font-bold text-[#FF6B4A]/40 select-none">
                &gt;
              </span>

              {/* Callout 1 (Top-Left) */}
              <div className="absolute -top-3 -left-4 sm:-left-10 z-20 flex flex-col items-end">
                <div className="px-3.5 py-2 rounded-full bg-[#151C28]/95 border border-white/15 shadow-xl backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                  <span className="text-xs font-medium text-slate-200">
                    {copy.callout_1}
                  </span>
                </div>
                <CurvedArrowLeft className="w-10 h-8 text-slate-400 mr-6 mt-1" />
              </div>

              {/* Callout 2 (Middle-Right) */}
              <div className="absolute top-12 -right-3 sm:-right-8 z-20 flex flex-col items-start">
                <div className="px-3.5 py-2 rounded-full bg-[#151C28]/95 border border-white/15 shadow-xl backdrop-blur-md flex items-center gap-2">
                  <CodeIcon className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  <span className="text-xs font-medium text-slate-200">
                    {copy.callout_2}
                  </span>
                </div>
                <CurvedArrowRight className="w-10 h-8 text-slate-400 ml-4 mt-1" />
              </div>

              {/* Glowing Coral Ring Portrait */}
              <div className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-[#FF6B4A] via-[#FF856A] to-amber-500/70 coral-ring">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#101620]">
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
      </div>
    </section>
  );
}

export default Hero;
