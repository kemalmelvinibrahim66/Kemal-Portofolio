import { ArrowRightIcon } from './Icons';

export function Navbar({ lang, onSelectLang, copy }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0C1017]/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="#top" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
            <span>KM</span>
            <span className="text-[#FF6B4A]">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
            <a href="#projects" className="hover:text-white transition">
              {copy.projects}
            </a>
            <a href="#about" className="hover:text-white transition">
              {copy.about}
            </a>
            <a href="#journey" className="hover:text-white transition">
              {copy.journey}
            </a>
            <a href="#contact" className="hover:text-white transition">
              {copy.contact}
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151C28] border border-white/10 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{copy.status}</span>
          </div>

          <div className="inline-flex items-center rounded-full bg-[#151C28] border border-white/10 p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => onSelectLang('id')}
              className={
                lang === 'id'
                  ? 'px-2.5 py-1 rounded-full bg-[#FF6B4A] text-white font-semibold transition'
                  : 'px-2.5 py-1 rounded-full text-slate-400 hover:text-white transition'
              }
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onSelectLang('en')}
              className={
                lang === 'en'
                  ? 'px-2.5 py-1 rounded-full bg-[#FF6B4A] text-white font-semibold transition'
                  : 'px-2.5 py-1 rounded-full text-slate-400 hover:text-white transition'
              }
            >
              EN
            </button>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-200 transition"
          >
            <span>{copy.cta}</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
