# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:8080

# Build
npm run build        # Production build
npm run build:dev    # Development build

# Lint
npm run lint         # ESLint

# Preview
npm run preview      # Preview production build locally

# Deploy to GitHub Pages
npm run deploy       # Runs predeploy (vite build --base=/black-canvas-webfolio/) then gh-pages -d dist
```

No test suite is configured in this project.

## Architecture

Single-page portfolio site built with React + TypeScript + Vite. The entire site renders from one route (`/`) composed of stacked section components.

**Page composition** — `src/pages/Index.tsx` assembles all visible sections in order: `Navigation → Hero → About → Projects → Contact → Footer`. The `Hiring` and `Blog` components exist in `src/components/` but are commented out pending future implementation.

**Routing** — `src/App.tsx` uses React Router v6 with only two routes: `/` (Index) and `*` (NotFound). No dynamic routes.

**Animations** — Scroll-triggered reveal via `IntersectionObserver`. Elements with the `.fade-in-up` class start invisible (`opacity: 0, translateY(20px)`) and gain the `.visible` class when they enter the viewport. Each component sets up its own observer in a `useEffect`. When `activeFilter` changes in `Projects`, the observer is re-initialized to re-trigger animations on newly rendered cards.

**Styling system** — Dark-first design using CSS custom properties (all HSL) defined in `src/index.css`. Tailwind maps to these tokens via `tailwind.config.ts`. Key utility classes:
- `.glass-effect` — frosted glass cards (rgba + backdrop-blur)
- `.hover-lift` — card lift on hover with glow shadow
- `.text-gradient` — gradient text using background-clip
- `bg-gradient-primary` / `bg-gradient-accent` — mapped to CSS vars

**UI components** — shadcn/ui (Radix UI primitives + class-variance-authority). Component aliases resolve via `@/` → `src/` (configured in `vite.config.ts`).

**Contact form** — Uses EmailJS (`emailjs-com`) with hardcoded service/template/public-key credentials directly in `src/components/Contact.tsx:55-65`. Toast notifications via the custom `use-toast` hook.

**Projects data** — Hardcoded as a plain array inside `src/components/Projects.tsx`. Most entries are commented out; only the "Activity Booking" project is active. Filtering by category (`all`, `web`, `backend`) is handled client-side.

**Deployment** — GitHub Pages at `https://JohanSebastianPZ.github.io/black-canvas-webfolio`. The `predeploy` script sets `--base=/black-canvas-webfolio/`; dev server runs without a base path (the `base` option in `vite.config.ts` is commented out).

**Public assets** — Static files in `public/` (images, CV PDF, favicon). Project card images reference paths like `/Activity_booking.png` which resolve from `public/`. The `dist/` folder is the build output committed alongside source.
