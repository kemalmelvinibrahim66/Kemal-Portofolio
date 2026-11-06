# Kemal Melvin Ibrahim Web Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (`ID` / `EN`) React + Vite + Tailwind CSS portfolio web app matching the approved Figma layer `21:3` with inline SVG brand logos, natural copy, and automated Vitest verification.

**Architecture:** A Vite + React single-page application driven by a pure data module (`src/data/portfolioData.js`) and modular section components (`Navbar`, `Hero`, `TechStackBar`, `AboutSection`, `ProjectsSection`, `JourneySection`, `ContactSection`) with zero external icon runtime dependencies. Language state (`id` default, `en` toggle) is managed in `App.jsx` and passed to each section.

**Tech Stack:** React 18, Vite, Tailwind CSS, Vitest, React Testing Library (`@testing-library/react`, `jsdom`).

**Spec:** `docs/superpowers/specs/2026-11-06-kemal-portfolio-design.md`

## Global Constraints

- Zero em-dash or en-dash characters anywhere in UI copy or source files (use `-`, `•`, or `:`).
- Palette: `#0C1017` main background, `#111722` strip, `#151C28` card surface, `#FF6B4A` coral accent.
- Hero portrait (`public/assets/profile_0.png`) must have no floating badge below the photo.
- Contact section must render inline SVG logos and links for Email (`kemal.melvin.tif425@polban.ac.id`), LinkedIn, GitHub (`@kemalmelvinibrahim66`), and Instagram (`@melviinn_k`).

## Review Focus

- Language toggle switches every section (`Hero`, `About`, `Projects`, `Journey`, `Contact`) cleanly between `ID` and `EN` without missing keys or falling back to undefined.
- No em-dash (`\u2014`) or en-dash (`\u2013`) exists anywhere in `portfolioData.js` or rendered DOM text.
- All 4 contact cards (Email, LinkedIn, GitHub, Instagram) render an `<svg>` icon and valid `href`.
- Long university email (`kemal.melvin.tif425@polban.ac.id`) uses `break-all` so it never truncates with ellipsis.
- Hero portrait container renders top-left and right callouts with curved `<svg>` arrows and leaves the bottom area free of any finalist badge.

---

### Task 1: Project Scaffolding, Assets, and Bilingual Data Module

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `public/assets/profile_0.png`
- Create: `src/index.css`
- Create: `src/data/portfolioData.js`
- Test: `src/__tests__/portfolioData.test.js`

**Interfaces:**
- Produces: `export const portfolioData = { id: { ... }, en: { ... }, profile: { email, github, linkedin, instagram, photo } }` in `src/data/portfolioData.js`

- [ ] **Step 1: Write the failing test in `src/__tests__/portfolioData.test.js`**

```javascript
import { describe, it, expect } from 'vitest';
import { portfolioData } from '../data/portfolioData';

describe('portfolioData contract', () => {
  it('provides matching top-level keys for id and en locales and contains zero em/en dashes', () => {
    expect(Object.keys(portfolioData.id)).toEqual(Object.keys(portfolioData.en));
    const serialized = JSON.stringify(portfolioData);
    expect(serialized).not.toMatch(/[\u2013\u2014]/);
    expect(portfolioData.profile.instagram).toBe('https://www.instagram.com/melviinn_k');
    expect(portfolioData.profile.email).toBe('kemal.melvin.tif425@polban.ac.id');
    expect(portfolioData.id.projects).toHaveLength(4);
    expect(portfolioData.en.projects).toHaveLength(4);
  });
});
```

- [ ] **Step 2: Scaffold Vite + Tailwind + Vitest files, copy `profile_0.png` to `public/assets/profile_0.png`, and run test to verify it fails**

Run: `npx vitest run src/__tests__/portfolioData.test.js`
Expected: FAIL with module `../data/portfolioData` not found.

- [ ] **Step 3: Implement `src/data/portfolioData.js` with complete bilingual content (`id` and `en`)**

Populate `portfolioData` using the exact approved copy from Figma layer `21:3` (projects: `darvaaph/bot-wa-jadwal`, `BeasiswaKu`, `dntdwp/ETS-PR`, `TubesMatdis_Case028`; timeline: `Asah 2026`, `HIMAKOM Polban`, `D4 Teknik Informatika Polban`; credentials: `Finalis PEKAN IT 2026`, Dicoding `ERZR71YEMZYV`, Dicoding `53XEMWRQVPRN`).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/portfolioData.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git init && git add . && git commit -m "feat: scaffold react vite project and bilingual portfolio data"
```

---

### Task 2: Inline SVG Brand Icons & UI Components (`Navbar`, `Hero`, `TechStackBar`)

**Files:**
- Create: `src/components/Icons.jsx`
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Hero.jsx`
- Create: `src/components/TechStackBar.jsx`
- Test: `src/__tests__/HeroAndNav.test.jsx`

**Interfaces:**
- Consumes: `portfolioData` from `src/data/portfolioData.js`
- Produces:
  - `Icons`: `{ GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon, PythonIcon, JsIcon, JavaIcon, TailwindIcon, AlpineIcon, QtIcon, DatabaseIcon, GitIcon, TrophyIcon, ArrowUpRightIcon, ArrowRightIcon, DownloadIcon, CodeIcon, LayoutIcon, TerminalIcon, CurvedArrowLeft, CurvedArrowRight }`
  - `Navbar({ lang, onSelectLang, copy })`
  - `Hero({ copy, profile })`
  - `TechStackBar()`

- [ ] **Step 1: Write the failing test in `src/__tests__/HeroAndNav.test.jsx`**

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TechStackBar } from '../components/TechStackBar';
import { portfolioData } from '../data/portfolioData';

describe('Navbar, Hero, and TechStackBar', () => {
  it('switches language when EN button is clicked and renders Hero without finalist badge under photo', () => {
    const onSelectLang = vi.fn();
    render(
      <>
        <Navbar lang="id" onSelectLang={onSelectLang} copy={portfolioData.id.nav} />
        <Hero copy={portfolioData.id.hero} profile={portfolioData.profile} />
        <TechStackBar />
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(onSelectLang).toHaveBeenCalledWith('en');
    expect(screen.getByAltText('Kemal Melvin Ibrahim')).toBeTruthy();
    expect(screen.queryByText(/PEKAN IT/i)).toBeNull();
    expect(screen.getByText('Tailwind CSS')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/HeroAndNav.test.jsx`
Expected: FAIL with missing component imports.

- [ ] **Step 3: Implement `Icons.jsx`, `Navbar.jsx`, `Hero.jsx`, and `TechStackBar.jsx`**

Use inline SVG vectors matching layer `21:3` (including `CurvedArrowLeft` and `CurvedArrowRight` on the dot-matrix canvas and coral ring `#FF6B4A`).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/HeroAndNav.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ src/__tests__/HeroAndNav.test.jsx
git commit -m "feat: add inline SVG icons, navbar, hero, and tech stack bar"
```

---

### Task 3: Portfolio Content Sections (`AboutSection`, `ProjectsSection`, `JourneySection`, `ContactSection`) and `App.jsx`

**Files:**
- Create: `src/components/AboutSection.jsx`
- Create: `src/components/ProjectsSection.jsx`
- Create: `src/components/JourneySection.jsx`
- Create: `src/components/ContactSection.jsx`
- Create: `src/App.jsx`
- Create: `src/main.jsx`
- Test: `src/__tests__/App.test.jsx`

**Interfaces:**
- Consumes: `portfolioData` (`src/data/portfolioData.js`), `Icons` (`src/components/Icons.jsx`), `Navbar`, `Hero`, `TechStackBar`
- Produces: `App()` root component and production Vite bundle (`dist/`)

- [ ] **Step 1: Write the failing integration test in `src/__tests__/App.test.jsx`**

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Full App integration and review focus checks', () => {
  it('renders ID by default, switches all sections to EN, displays all 4 contact cards with SVGs, and has zero em/en dashes in DOM', () => {
    const { container } = render(<App />);
    expect(screen.getByText('Tentang Saya')).toBeTruthy();
    expect(screen.getByText('kemal.melvin.tif425@polban.ac.id').className).toContain('break-all');
    expect(screen.getByText('@melviinn_k')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByText('About Me')).toBeTruthy();
    expect(screen.getByText('Selected Projects')).toBeTruthy();

    const contactSection = container.querySelector('#contact');
    expect(contactSection.querySelectorAll('svg').length).toBeGreaterThanOrEqual(4);
    expect(container.textContent).not.toMatch(/[\u2013\u2014]/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/App.test.jsx`
Expected: FAIL with missing `App` / section components.

- [ ] **Step 3: Implement `AboutSection.jsx`, `ProjectsSection.jsx`, `JourneySection.jsx`, `ContactSection.jsx`, `App.jsx`, and `main.jsx`**

Assemble all sections in `App.jsx` with `useState('id')` for language switching and build the production bundle.

- [ ] **Step 4: Run full test suite and production build to verify everything passes**

Run: `npx vitest run && npm run build`
Expected: All 3 test suites PASS and `vite build` outputs `dist/` with exit code 0.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: complete bilingual portfolio sections and integration tests"
```
