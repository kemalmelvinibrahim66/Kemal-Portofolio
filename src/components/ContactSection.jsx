import { MailIcon, LinkedInIcon, GitHubIcon, InstagramIcon } from './Icons';

export function ContactSection({ copy, profile }) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 pt-8 pb-24">
      <div className="surface-card rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B4A]">
            {copy.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {copy.heading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">{copy.desc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="p-4 rounded-2xl bg-[#0C1017]/90 border border-white/10 hover:border-[#FF6B4A]/50 transition flex items-center gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FF6B4A]/15 border border-[#FF6B4A]/25 flex items-center justify-center text-[#FF6B4A] shrink-0 group-hover:bg-[#FF6B4A] group-hover:text-white transition">
              <MailIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-slate-400">EMAIL</div>
              <div className="text-xs font-semibold text-white break-all">
                {profile.email}
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-[#0C1017]/90 border border-white/10 hover:border-[#FF6B4A]/50 transition flex items-center gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FF6B4A]/15 border border-[#FF6B4A]/25 flex items-center justify-center text-[#FF6B4A] shrink-0 group-hover:bg-[#0A66C2] group-hover:border-[#0A66C2] group-hover:text-white transition">
              <LinkedInIcon className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-slate-400">LINKEDIN</div>
              <div className="text-xs font-semibold text-white truncate">
                {profile.linkedinLabel}
              </div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-[#0C1017]/90 border border-white/10 hover:border-[#FF6B4A]/50 transition flex items-center gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FF6B4A]/15 border border-[#FF6B4A]/25 flex items-center justify-center text-[#FF6B4A] shrink-0 group-hover:bg-white group-hover:border-white group-hover:text-slate-950 transition">
              <GitHubIcon className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-slate-400">GITHUB</div>
              <div className="text-xs font-semibold text-white truncate">
                {profile.githubHandle}
              </div>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-[#0C1017]/90 border border-white/10 hover:border-[#FF6B4A]/50 transition flex items-center gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FF6B4A]/15 border border-[#FF6B4A]/25 flex items-center justify-center text-[#FF6B4A] shrink-0 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:border-pink-500 group-hover:text-white transition">
              <InstagramIcon className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-slate-400">INSTAGRAM</div>
              <div className="text-xs font-semibold text-white truncate">
                {profile.instagramHandle}
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
