import { LayoutIcon, DatabaseIcon, TerminalIcon } from './Icons';

const competencyIcons = {
  'comp-1': LayoutIcon,
  'comp-2': DatabaseIcon,
  'comp-3': TerminalIcon,
};

export function AboutSection({ copy }) {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 relative pl-8 border-l-2 border-white/10 space-y-8">
          {copy.competencies.map((comp) => {
            const IconComponent = competencyIcons[comp.id] || LayoutIcon;
            return (
              <div key={comp.id} className="relative surface-card rounded-2xl p-5">
                <span className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-[#FF6B4A] ring-4 ring-[#0C1017]" />
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B4A]/15 border border-[#FF6B4A]/30 flex items-center justify-center text-[#FF6B4A]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{comp.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{comp.tech}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {copy.heading}
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">{copy.p1}</p>
          <p className="text-slate-400 text-base leading-relaxed">{copy.p2}</p>

          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10">
            {copy.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {metric.value}
                  <span className="text-[#FF6B4A]">+</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
