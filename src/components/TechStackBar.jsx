import {
  PythonIcon,
  JsIcon,
  JavaIcon,
  TailwindIcon,
  AlpineIcon,
  QtIcon,
  DatabaseIcon,
  GitIcon,
} from './Icons';

export function TechStackBar() {
  return (
    <section className="border-y border-white/[0.07] bg-[#111722]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs sm:text-sm font-mono text-slate-300">
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <PythonIcon className="w-4 h-4 text-[#3776AB] fill-current" />
          Python
        </span>
        <span className="text-white/15">/</span>
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <JsIcon className="w-4 h-4 text-[#F7DF1E] fill-current" />
          JavaScript
        </span>
        <span className="text-white/15">/</span>
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <JavaIcon className="w-4 h-4 text-[#FF6B4A]" />
          Java (OOP)
        </span>
        <span className="text-white/15">/</span>
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <TailwindIcon className="w-4 h-4 text-[#38BDF8] fill-current" />
          Tailwind CSS
        </span>
        <span className="text-white/15">/</span>
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <AlpineIcon className="w-4 h-4 text-[#77C1D2] fill-current" />
          Alpine.js
        </span>
        <span className="text-white/15">/</span>
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <QtIcon className="w-4 h-4 text-[#41CD52] fill-current" />
          PyQt6
        </span>
        <span className="text-white/15">/</span>
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <DatabaseIcon className="w-4 h-4 text-emerald-400" />
          SQLite &amp; BS4
        </span>
        <span className="text-white/15">/</span>
        <span className="inline-flex items-center gap-2 hover:text-white transition">
          <GitIcon className="w-4 h-4 text-[#F05032] fill-current" />
          Git &amp; Pytest
        </span>
      </div>
    </section>
  );
}

export default TechStackBar;
