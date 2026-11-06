import { TrophyIcon, ArrowUpRightIcon } from './Icons';

export function JourneySection({ copy }) {
  return (
    <section
      id="journey"
      className="max-w-6xl mx-auto px-6 py-16 border-t border-white/[0.06]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B4A]">
              {copy.exp_label}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {copy.exp_heading}
            </h2>
          </div>

          <div className="relative pl-7 border-l-2 border-white/10 space-y-8">
            {copy.timeline.map((item) => (
              <div key={item.title} className="relative">
                <span
                  className={`absolute -left-[35px] top-1.5 w-3.5 h-3.5 rounded-full ${
                    item.isActive ? 'bg-[#FF6B4A]' : 'bg-slate-500'
                  } ring-4 ring-[#0C1017]`}
                />
                <div
                  className={`text-xs font-mono ${
                    item.isActive ? 'text-[#FF856A]' : 'text-slate-400'
                  }`}
                >
                  {item.date}
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B4A]">
              {copy.cert_label}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {copy.cert_heading}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="surface-card rounded-2xl p-5 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-block text-[11px] font-mono text-[#FF856A] bg-[#FF6B4A]/10 px-2.5 py-0.5 rounded-full">
                  {copy.award.meta}
                </span>
                <h3 className="text-base font-bold text-white pt-1">
                  {copy.award.title}
                </h3>
                <p className="text-xs text-slate-400">{copy.award.subtitle}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FF6B4A]/15 flex items-center justify-center text-[#FF6B4A] shrink-0">
                <TrophyIcon className="w-5 h-5" />
              </div>
            </div>

            {copy.certificates.map((cert) => (
              <a
                key={cert.credentialId}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="surface-card rounded-2xl p-5 flex items-start justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono text-slate-400">
                    {cert.meta}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FF856A] transition">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-500">
                    {cert.credentialId}
                  </div>
                </div>
                <ArrowUpRightIcon className="w-5 h-5 text-slate-400 group-hover:text-white shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
