# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ripasso_mate** is a study progress tracker for Analysis 1 (Analisi 1) mathematics. The main product is a React/TypeScript SPA located in [analisi1-tracker/](analisi1-tracker/). The top-level Python project (`main.py`, `pyproject.toml`) is currently a stub.

## Commands

All commands run from within `analisi1-tracker/`:

```bash
npm run dev       # Vite dev server (hot reload)
npm run build     # tsc -b + Vite production build
npm run lint      # ESLint across all .ts/.tsx files
npm run preview   # Serve the dist/ build locally
```

There are no tests. Type checking is part of the build step (`tsc -b`).

## Architecture

### Tech Stack
- **React 19** + **TypeScript ~6** + **Vite 8**
- **Tailwind CSS 3** (class-based dark mode via `html.dark`)
- **react-router-dom 7** (BrowserRouter, 5 routes)
- **recharts** (imported but not yet used)
- No backend — all state lives in `localStorage`

### Routing & Guards ([src/App.tsx](analisi1-tracker/src/App.tsx))
- `/` → Dashboard, `/tracker` → Tracker, `/plan` → Plan, `/history` → History, `/assessment` → Assessment
- `OnboardingGuard` redirects every route to `/assessment` until `onboardingComplete` is true in localStorage
- Navigation (`Nav.tsx`) is hidden during the assessment flow

### State Management ([src/store/useTracker.ts](analisi1-tracker/src/store/useTracker.ts))
Single custom hook, no Redux/Zustand. Persists to `localStorage('analisi1_v1')`.

Key shape:
```typescript
{
  ratings: Record<string, number>;       // topicId → 1–5 star
  history: RatingChange[];               // all past changes
  notes: Record<string, string>;         // per-topic notes
  sessions: { topicId: string; date: string }[];
  onboardingComplete: boolean;
  lastAssessmentDate: string | null;
  assessmentCount: number;               // 0=never, 1=initial, 2+=reassessments
}
```
- `completeAssessment()` merges a full-section rating map and appends history
- `daysUntilReassessment()` / `isReassessmentDue()` drive the reassessment banner
- Reassessment intervals: 28 days after initial, 42 days for subsequent ones

### Data ([src/data/topics.ts](analisi1-tracker/src/data/topics.ts))
~100 topics organized in 12 `Section` objects (Prerequisiti → EDO). Each section carries Tailwind color tokens (border, dot, badge, bar, chip classes) used throughout the UI. `PRESEED_RATINGS` provides demo data.

### Assessment Levels ([src/data/assessmentLevels.ts](analisi1-tracker/src/data/assessmentLevels.ts))
Two distinct sets of 5 levels — initial onboarding uses one vocabulary, reassessments use different wording intentionally to reduce anchoring bias. Assessment drafts auto-save to `localStorage('analisi1_assessment_draft')`.

### Study Plan Logic ([src/pages/Plan.tsx](analisi1-tracker/src/pages/Plan.tsx))
Automatically buckets topics into 4 phases based on current ratings:
- Fase 1: unrated or 1★ topics from priority sections
- Fase 2: unrated or 1★ topics from remaining sections
- Fase 3: 2★ topics
- Fase 4: 3★ topics
- Fatto: ≥4★ (mastered)

### Dark Mode ([src/store/useTheme.ts](analisi1-tracker/src/store/useTheme.ts))
React Context. Reads `window.matchMedia('prefers-color-scheme: dark')` on first load, persists toggle to `localStorage('analisi1_dark')`, sets/removes the `dark` class on `<html>`. All color classes use Tailwind's `dark:` prefix variant.

### Key Tailwind Notes
- Dark mode is `class`-based (configured in [tailwind.config.js](analisi1-tracker/tailwind.config.js)), not `media`-based
- Responsive layout: sidebar nav is visible at `md:` breakpoint and hidden on mobile
- Color schemes per section are defined inline in `topics.ts` as Tailwind class strings — do not use dynamic class construction or Tailwind's JIT will miss them
