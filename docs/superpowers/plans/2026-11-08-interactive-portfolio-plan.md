# Interactive Scrollytelling Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Kemal Melvin Ibrahim's React + Vite + Tailwind CSS portfolio into a 6-section interactive scrollytelling experience (Floating Mascot Navbar, 5-Layer Parallax Mountain Intro, Topographic About + Spotlight Portrait + 3D Glass Folders, Letter-Portal Zoom Transition, Tabbed Projects/Certificates/Awards Lightbox Showcase, and 3D Campus Activity Gallery) with humble, grounded bilingual (`ID`/`EN`) student copywriting.

**Architecture:** Single-page React 18 application enhanced with `framer-motion` and `lucide-react`. All bilingual copy, asset paths (`/assets/asterisk-dashboard.png`, `/assets/beasiswaku-dashboard.png`, `/assets/cert-*.png`, `/assets/activity-*.jpeg`), and code-preview snippets are centralized in `src/data/portfolioData.js`. Canvas-based procedural topography and CSS 3D transforms provide 60fps visual depth without external CMS dependencies.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Framer Motion, Lucide React, Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-08-interactive-portfolio-design.md`

## Global Constraints

- Zero em-dash (`—`) or en-dash (`–`) characters anywhere in UI copy or source files.
- Grounded, humble, natural student tone in both `id` and `en` locales (never claim exaggerated titles like "Senior Python Web Developer").
- Projects `p1` (Asterisk / Bot WA Jadwal) and `p2` (BeasiswaKu Desktop) display real screenshots from `/assets/`; `p3` (SQL Parser) and `p4` (Tubes Matdis & Java OOP) render interactive code/terminal preview cards instead of screenshots.
- No broken CV/Resume download links (CTAs scroll to `#projects` and `#contact`).

## Review Focus

- JSDOM canvas compatibility: `HTMLCanvasElement.prototype.getContext` returns `null` in Vitest JSDOM unless guarded, so `TopographyCanvas` must safely no-op when `ctx` is null.
- `window.scrollTo` and `IntersectionObserver` in JSDOM: components must guard browser APIs so unit tests pass cleanly without uncaught errors.
- Lightbox keyboard/backdrop dismissal: clicking the backdrop or pressing `Escape` closes the certificate/award lightbox modal.
- 3D Glass Folder toggle state: clicking a folder toggles its `data-open` state and clicking `"Explore"` switches the active tab in `#projects`.
- Bilingual switch completeness: toggling `ID` to `EN` updates Navbar, Parallax Intro, About, 3D Folders, Tabbed Showcase, Activity Gallery, and Contact copy.

---

### Task 1: Dependencies & Grounded Bilingual Portfolio Data

**Files:**
- Modify: `package.json`
- Modify: `src/data/portfolioData.js`
- Modify: `src/__tests__/portfolioData.test.js`

**Interfaces:**
- Produces: `portfolioData` with `profile`, `id`, and `en` containing:
  - `hero`: humble student intro copy (`pill`, `h1_a`, `h1_italic`, `h1_b`, `desc`, `btn_projects`, `btn_contact`)
  - `about`: grounded Polban & Asah 2026 narrative, `competencies`, `metrics`, and `folders` summary (`projects`, `certificates`, `awards`)
  - `projects`: 4 items (`p1` with `/assets/asterisk-dashboard.png` and `/assets/asterisk-login.png`, `p2` with `/assets/beasiswaku-dashboard.png`, `p3` and `p4` with `image: null` and `codePreview` snippet strings)
  - `journey`: `timeline`, `award` (with `image: '/assets/cert-pekan-it-2026.png'`), `certificates` (with `/assets/cert-dicoding-ml.png` and `/assets/cert-dicoding-python.png`)
  - `activities`: 3 campus organization photo entries (`/assets/activity-himakom-1.jpeg`, `/assets/activity-mpa-2.jpeg`, `/assets/activity-himakom-3.jpeg`)

- [ ] **Step 1: Install `framer-motion` and `lucide-react`**
  Run: `npm install framer-motion lucide-react`
- [ ] **Step 2: Update `src/__tests__/portfolioData.test.js` to assert humble copy, asset paths for `p1`/`p2`, null images + `codePreview` for `p3`/`p4`, certificate images, and 3 `activities` items**
- [ ] **Step 3: Update `src/data/portfolioData.js` with grounded student copywriting and all new asset references (zero em/en-dashes)**
- [ ] **Step 4: Run `npx vitest run src/__tests__/portfolioData.test.js` and verify PASS**

---

### Task 2: Floating Pill Navbar with Mascot & 5-Layer Parallax Hero

**Files:**
- Create: `src/components/TopographyCanvas.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Hero.jsx`
- Modify: `src/__tests__/HeroAndNav.test.jsx`

**Interfaces:**
- Consumes: `portfolioData[lang].nav`, `portfolioData[lang].hero`, `portfolioData.profile`
- Produces:
  - `<TopographyCanvas theme="dark" | "light" />`
  - `<Navbar lang={lang} onSelectLang={setLang} copy={currentCopy.nav} activeSection={activeSection} onSelectSection={setActiveSection} />`
  - `<Hero copy={currentCopy.hero} profile={profile} />` featuring the 5-layer scroll parallax mountain/forest header (`WELCOME TO MY PORTOFOLIO`) + grounded hero intro card.

- [ ] **Step 1: Update `src/__tests__/HeroAndNav.test.jsx` to test the Floating Pill Navbar mascot indicator, `WELCOME TO MY PORTOFOLIO` parallax banner, and humble Hero copy**
- [ ] **Step 2: Create `src/components/TopographyCanvas.jsx` with JSDOM-safe `<canvas>` topographic contour animation**
- [ ] **Step 3: Implement `src/components/Navbar.jsx` with Framer Motion `layoutId` active pill, kawaii companion bot mascot above active link, and `ID`/`EN` switcher**
- [ ] **Step 4: Implement `src/components/Hero.jsx` with the 5-layer scroll-driven parallax mountain/forest opener and grounded student hero introduction**
- [ ] **Step 5: Run `npx vitest run src/__tests__/HeroAndNav.test.jsx` and verify PASS**

---

### Task 3: Interactive About Section (Spotlight Portrait, Timelines & 3D Glass Folders)

**Files:**
- Create: `src/components/GlassFolders.jsx`
- Modify: `src/components/AboutSection.jsx`
- Modify: `src/components/JourneySection.jsx`

**Interfaces:**
- Consumes: `portfolioData[lang].about`, `portfolioData[lang].journey`, `portfolioData[lang].projects`, `portfolioData.profile`
- Produces:
  - `<AboutSection copy={currentCopy.about} journey={currentCopy.journey} projects={currentCopy.projects} profile={profile} onExploreTab={handleExploreTab} />`
  - Interactive cursor-spotlight mask over `/assets/profile_0.png` revealing a warm-coral blueprint engineering layer.
  - Interactive numbered Education & Organization timelines.
  - `<GlassFolders>` with 3 interactive 3D frosted-glass folders (`Projects`, `Certificates`, `Awards`) that tilt and fan out 4 preview cards when clicked or hovered.

- [ ] **Step 1: Create `src/components/GlassFolders.jsx` with 3D CSS perspective hinge and fan-out cards**
- [ ] **Step 2: Update `src/components/AboutSection.jsx` to include the Spotlight Portrait reveal, grounded bio, metrics, and `<GlassFolders>`**
- [ ] **Step 3: Update `src/components/JourneySection.jsx` with interactive hover spotlight timeline states**

---

### Task 4: Giant Letter-Portal Zoom, Tabbed Showcase with Lightbox & 3D Activity Gallery

**Files:**
- Create: `src/components/LetterPortal.jsx`
- Create: `src/components/ActivityGallery.jsx`
- Modify: `src/components/ProjectsSection.jsx`
- Modify: `src/App.jsx`
- Modify: `src/__tests__/App.test.jsx`

**Interfaces:**
- Consumes: `portfolioData[lang]`
- Produces:
  - `<LetterPortal word="PORTOFOLIO" />` interactive letter selector + scroll-zoom transition from `#0C1017` dark theme into `#FAFAFA` light showcase theme.
  - `<ProjectsSection>` with segmented tabs (`Projects`, `Certificates`, `Awards`), screenshot cards for `p1`/`p2`, interactive terminal/code preview cards for `p3`/`p4`, and a fullscreen Lightbox modal for certificates/awards.
  - `<ActivityGallery activities={currentCopy.activities} copy={currentCopy.gallery} />` 3D perspective floating campus activity gallery.

- [ ] **Step 1: Create `src/components/LetterPortal.jsx` with interactive letter picker (`P-O-R-T-O-F-O-L-I-O`) and scroll-zoom transition**
- [ ] **Step 2: Update `src/components/ProjectsSection.jsx` with `Projects` / `Certificates` / `Awards` tabs, real screenshots for `p1` & `p2`, terminal code previews for `p3` & `p4`, and Lightbox modal**
- [ ] **Step 3: Create `src/components/ActivityGallery.jsx` with 3D perspective cards for the 3 HIMAKOM/MPA organization photos**
- [ ] **Step 4: Wire all sections and tab navigation callbacks in `src/App.jsx` and update `src/__tests__/App.test.jsx`**
- [ ] **Step 5: Run `npx vitest run` and `npm run build` to verify all tests and production bundle succeed**
