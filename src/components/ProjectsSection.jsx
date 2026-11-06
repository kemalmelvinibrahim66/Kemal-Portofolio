import { GitHubIcon, ArrowUpRightIcon } from './Icons';

export function ProjectsSection({ projects, navCopy, profile }) {
  return (
    <section
      id="projects"
      className="max-w-6xl mx-auto px-6 py-16 space-y-10 border-t border-white/[0.06]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B4A]">
            {navCopy.proj_label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            {navCopy.proj_heading}
          </h2>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
        >
          <GitHubIcon className="w-4 h-4 text-[#FF6B4A] fill-current" />
          <span>{profile.githubDomain}</span>
          <ArrowUpRightIcon className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {projects.map((project, idx) => {
          const isTopRow = idx < 2;
          return (
            <article
              key={project.id}
              className={`${project.spanClass} surface-card rounded-3xl ${
                isTopRow ? 'p-7 sm:p-8 space-y-6' : 'p-7 space-y-5'
              } flex flex-col justify-between`}
            >
              <div className={isTopRow ? 'space-y-4' : 'space-y-3'}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={
                      project.isFeatured
                        ? 'px-3 py-1 rounded-full bg-[#FF6B4A]/15 border border-[#FF6B4A]/30 text-[#FF856A] text-xs font-medium'
                        : 'px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-slate-200 text-xs font-medium'
                    }
                  >
                    {project.badge}
                  </span>

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
                    >
                      <GitHubIcon className="w-3.5 h-3.5 fill-current" />
                      <span>{project.repoLabel}</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    </a>
                  )}

                  {project.dateLabel && (
                    <span className="text-xs font-mono text-slate-400">
                      {project.dateLabel}
                    </span>
                  )}
                </div>

                <h3
                  className={`${
                    isTopRow ? 'text-2xl' : 'text-xl'
                  } font-bold text-white`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-slate-400 ${
                    isTopRow ? 'text-sm sm:text-base' : 'text-sm'
                  } leading-relaxed`}
                >
                  {project.desc}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {project.highlights.map((item) => (
                      <div
                        key={item.mono}
                        className="p-3 rounded-xl bg-[#0C1017]/80 border border-white/[0.06]"
                      >
                        <div className="text-xs font-mono text-[#FF6B4A]">
                          {item.mono}
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.07] text-xs font-mono text-slate-300">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsSection;
