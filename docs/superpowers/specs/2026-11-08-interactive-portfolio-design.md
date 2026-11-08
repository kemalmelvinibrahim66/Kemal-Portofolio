# Kemal Melvin Ibrahim Interactive Scrollytelling Portfolio Design Spec

## Intent and Why
Upgrade Kemal Melvin Ibrahim's personal web portfolio (`React 18 + Vite + Tailwind CSS`) into an interactive scrollytelling studio inspired by the reference TikTok walkthrough (`ekawahyu-portofolio.vercel.app`), while keeping Kemal's own visual identity (Midnight `#0C1017` + Warm Coral `#FF6B4A`, transitioning into a crisp Alabaster `#FAFAFA` showcase via a letter-portal zoom) and maintaining a humble, honest, grounded student tone (no exaggerated claims like "Senior Python Web Developer").

## Goals, Non-Goals, and Anti-Goals
- **Goals:**
  - Implement all 6 interactive sections using `framer-motion` and smooth scroll physics:
    1. **Floating Pill Navbar with Animated Mascot (`Navbar.jsx`):** Centered glass pill navbar that adapts to dark/light sections, featuring a bouncing companion mascot (`layoutId="active-mascot"`) above the active tab and an `ID / EN` language toggle.
    2. **5-Layer Parallax Mountain & Night Sky Intro (`ParallaxHero.jsx` / `Hero.jsx`):** Sticky scroll-driven 5-layer SVG parallax scene (night stars/moon, distant Bandung mountain ridge, giant `WELCOME TO MY PORTOFOLIO` typography sandwiched in depth, foreground student silhouette, and parting forest/pine canopy frame).
    3. **Interactive About Section (`AboutSection.jsx`):**
       - Procedural animated **Topographic Contour Canvas** background (`TopographyCanvas.jsx`).
       - Grounded, humble student bio + **Interactive Cursor Spotlight Portrait** (`profile_0.png` with radial-gradient cursor mask revealing a warm coral cyber-blueprint stylized layer).
       - Interactive **Education & Organization Timelines** (Polban, Asah 2026, HIMAKOM MPA, PERMATA) with hover spotlight states.
       - **3 Interactive 3D Glass Folders (`GlassFolders.jsx`):** `4 Projects`, `2 Certificates`, and `1 National Award` (or `3 Activities`), with 3D CSS perspective hinge tilt and fan-out thumbnail cards on hover/click.
    4. **Interactive Giant Letter-Portal Zoom Transition (`LetterPortal.jsx`):** Sticky scroll-pinned `PORTOFOLIO` giant typography where users can pick a letter and zoom through its stroke from Dark Mode (`#0C1017`) into Light Mode (`#FAFAFA`).
    5. **Tabbed Portfolio Showcase with Lightbox (`ProjectsSection.jsx`):**
       - Light-mode topographic background with a segmented pill tab bar: **Projects (`4`)**, **Certificates (`2`)**, and **Awards (`1`)**.
       - **Projects:** Real screenshots for `Asterisk (Bot WA Jadwal)` (`/assets/asterisk-dashboard.png`, `/assets/asterisk-login.png`) and `BeasiswaKu Desktop` (`/assets/beasiswaku-dashboard.png`), plus clean interactive terminal/code cards (no screenshot needed) for `SQL Recursive Descent Parser` and `Tubes Matdis & Java OOP`.
       - **Certificates & Awards:** High-res certificate cards (`/assets/cert-dicoding-ml.png`, `/assets/cert-dicoding-python.png`, `/assets/cert-pekan-it-2026.png`) with full-screen zoom **Lightbox Modal** and official verification links.
    6. **3D Perspective Campus Activity Gallery (`ActivityGallery.jsx`):** 3D Z-axis scroll + mouse-parallax floating photo gallery featuring Kemal's 3 real organization photos (`/assets/activity-himakom-1.jpeg`, `/assets/activity-mpa-2.jpeg`, `/assets/activity-himakom-3.jpeg`).
  - Keep bilingual support (`ID` and `EN`) with natural, non-exaggerated copywriting.
- **Non-Goals:**
  - External database dependency (all data is served reliably from `src/data/portfolioData.js` and `public/assets/`).
  - Resume PDF download link (Kemal has not created a CV yet; primary CTAs scroll to `#projects` and `#contact`).
- **Anti-Goals:**
  - Zero em-dash or en-dash characters anywhere in UI copy or source files.
  - Zero exaggerated developer titles or boastful AI buzzwords.

## Approaches
1. **Framer Motion + HTML5 Canvas + CSS 3D Perspective in React + Vite (Selected):** Provides buttery 60fps scroll/spring animations, zero fragile external CMS failures, and clean unit testing with Vitest.
2. **Pure CSS Only:** Cannot smoothly drive the scroll-scrubbed 5-layer parallax, letter-portal exponential zoom, or spring-physics cursor spotlight mask.
