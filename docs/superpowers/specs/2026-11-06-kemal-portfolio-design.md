# Kemal Melvin Ibrahim Bilingual Web Portfolio Design Spec

## Intent and Why
Build a personal software and AI engineering portfolio web application for Kemal Melvin Ibrahim (D4 Informatics Engineering at Politeknik Negeri Bandung, Asah 2026 Next-Gen AI Engineer Cohort) so recruiters can evaluate his projects, credentials, and contact channels in one place, while adding a modular React + Vite + Tailwind CSS project to his public GitHub profile.

## Goals, Non-Goals, and Anti-Goals
- **Goals:**
  - Deliver a responsive single-page application in React + Vite + Tailwind CSS matching the approved Figma layer `21:3` (hybrid of Dribbble Concept 1 and Concept 3).
  - Support instant bilingual switching (`ID` and `EN`, defaulting to `ID`).
  - Include crisp inline SVG brand icons for all tech stack items and social/contact channels (Email, LinkedIn, GitHub, Instagram `@melviinn_k`).
  - Showcase Kemal's 4 real projects (`darvaaph/bot-wa-jadwal`, `BeasiswaKu`, `dntdwp/ETS-PR`, `TubesMatdis_Case028` + Java OOP), education/organization timeline, and verified certifications/honors.
- **Non-Goals:**
  - Backend database or CMS (all portfolio data lives in a typed/structured local module).
- **Anti-Goals:**
  - Zero em-dash or en-dash characters anywhere in the UI copy or source files.
  - No AI buzzword filler copy ("spearheaded", "impactful", etc.).
  - No badge below the Hero portrait photo.
  - No external icon script dependencies that strip brand logos.

## Constraints
- Palette: Deep Midnight (`#0C1017`), Strip (`#111722`), Card Surface (`#151C28` to `#101620`), Signature Accent Warm Coral (`#FF6B4A` / `#FF856A`).
- Typography: `Plus Jakarta Sans` (body/headings), `Instrument Serif` italic (hero keyword emphasis), `JetBrains Mono` (tags/metadata).
- Portrait asset served from `public/assets/profile_0.png`.

## Approaches Considered
1. **React + Vite + Tailwind CSS (Selected):** Modular components, fast build, demonstrates React proficiency for frontend internship applications, and deploys directly to Vercel/Netlify/GitHub Pages.
2. **Next.js App Router:** Heavier boilerplate than needed for a static single-page portfolio.
3. **Plain HTML/CSS/JS:** Used for the Figma preview layer (`21:3`), now being promoted into a structured React + Vite codebase.

## Architecture & Component Breakdown
- `src/data/portfolioData.js`: Bilingual (`id` and `en`) copy, project entries, timeline items, certifications, and contact links without any em-dash or en-dash characters.
- `src/components/Icons.jsx`: Pure inline SVG components for GitHub, LinkedIn, Instagram, Email, Python, JavaScript, Java, Tailwind, Alpine.js, PyQt6, SQLite, Git, Trophy, and UI arrows.
- `src/components/Navbar.jsx`: Sticky top bar with `KM.` logo, section links, availability badge, and `ID` / `EN` toggle.
- `src/components/Hero.jsx`: Split hero with serif-italic accent, CTA buttons, social icon buttons, dot-matrix canvas, glowing coral portrait ring, and top-left/right curved SVG arrow callouts (clean bottom under photo).
- `src/components/TechStackBar.jsx`: Full-width horizontal tech strip with inline SVG logos.
- `src/components/AboutSection.jsx`: Vertical competency cards on the left + natural narrative and `15+`, `4+`, `3+` coral counters on the right.
- `src/components/ProjectsSection.jsx`: 12-column Bento Grid for the 4 projects.
- `src/components/JourneySection.jsx`: Education & organization timeline on the left + PEKAN IT 2026 award and Dicoding credential cards on the right.
- `src/components/ContactSection.jsx`: 4-card contact grid (Email with `break-all`, LinkedIn, GitHub, Instagram) and footer.
