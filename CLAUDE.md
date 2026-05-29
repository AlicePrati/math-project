# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ripasso_mate** is a study progress tracker for Analysis 1 (Analisi 1) mathematics. React/TypeScript SPA frontend + optional FastAPI backend. All frontend config files and `src/` live at the repository root; backend lives in `backend/`.

## Commands

### Frontend (run from repository root)
```bash
npm run dev       # Vite dev server on :5173 (hot reload)
npm run build     # tsc -b + Vite production build
npm run lint      # ESLint across all .ts/.tsx files
npm run preview   # Serve the dist/ build locally
```

### Backend (run from `backend/`)
```bash
venv\Scripts\activate
uvicorn main:app --port 8001 --reload
```

### One-click launcher
Double-click `start.bat` — opens two cmd windows: backend on `:8001`, frontend on `:5173`.

The frontend reads `VITE_API_URL` from `.env.local` (`.env.local` sets `http://localhost:8001`; the hardcoded fallback in `api.ts` is `http://localhost:8000`). Backend requires Python 3.12 with **pydantic v1** (pydantic v2 needs Rust, not available). Pin `bcrypt==4.0.1` — v5 breaks passlib 1.7.4.

There are no tests. Type checking is part of `npm run build` (`tsc -b`).

## Architecture

### Tech Stack
- **React 19** + **TypeScript ~6** + **Vite 8**
- **Tailwind CSS 3** (class-based dark mode via `html.dark` — `useTheme.ts` + `ThemeContext` exist as a stub but have no provider; the toggle is not yet wired up)
- **react-router-dom 7** (BrowserRouter, 7 routes)
- **FastAPI** + **SQLAlchemy 2** + **SQLite** (`backend/analisi1.db`, auto-created on first run)
- No Redux/Zustand — all state in `localStorage` + custom hooks

### Routing ([src/App.tsx](src/App.tsx))
`AuthProvider` wraps the entire tree. `AppShell` shows a spinner while the auth token is being validated, then renders the full app with no login gate.

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/assessment` | Assessment (quiz hub) |
| `/tracker` | Tracker |
| `/plan` | Study plan phases |
| `/history` | History |
| `/topic/:topicId` | Section study plan (`:topicId` is actually a **sectionId**) |
| `/login` | Login / register |

### State Management ([src/store/useTracker.ts](src/store/useTracker.ts))
Single custom hook persisting to `localStorage('analisi1_v1')`:
```typescript
{
  ratings: Record<string, number>;       // topicId → 1–5 star
  history: RatingChange[];
  notes: Record<string, string>;
  sessions: { topicId: string; date: string }[];
  onboardingComplete: boolean;
  lastAssessmentDate: string | null;
  assessmentCount: number;               // 0=never, 1=initial, 2+=reassessments
}
```
- `completeAssessment(ratings)` merges a `Record<appTopicId, rating>` map and appends history
- Reassessment intervals: 28 days after initial, 42 days for subsequent
- On login, `useAuth` calls `syncBackendToStorage()` which overwrites localStorage with backend data

### Auth ([src/store/useAuth.tsx](src/store/useAuth.tsx))
Optional JWT auth. Token stored at `localStorage('analisi1_token')`. On app load, if a token exists it calls `/auth/me` and syncs backend progress. Login/register both sync immediately after. Logout clears both token and tracker keys. All API calls in [src/lib/api.ts](src/lib/api.ts) attach `Authorization: Bearer <token>` automatically.

### Plan ([src/pages/Plan.tsx](src/pages/Plan.tsx))
Buckets every topic into one of four priority phases based on its current rating, then a "Fatto" group for completed topics:

| Phase | Label | Condition |
|-------|-------|-----------|
| 1 | Fondamentali deboli | rating ≤ 1 **and** in a priority section (prerequisiti, successioni, limiti) |
| 2 | Argomenti deboli | rating ≤ 1 in any other section |
| 3 | Da consolidare | rating == 2 |
| 4 | Da rafforzare | rating == 3 |
| — | Fatto | rating ≥ 4 |

Unrated topics (rating == 0) fall into Phase 1 or 2. Reassessment nudge appears when `isReassessmentDue()` is true.

### Assessment Levels ([src/data/assessmentLevels.ts](src/data/assessmentLevels.ts))
Two distinct label sets for the 1–5 star scale — `INITIAL_LEVELS` (first-ever assessment) and `REASSESSMENT_LEVELS` (periodic re-checks). Labels differ intentionally to reduce anchoring bias. Both export the same `value` range (1–5) and the same Tailwind `selectedClass`/`legendClass` tokens. Reassessment intervals are also exported here: `INITIAL_REASSESSMENT_DAYS = 28`, `SUBSEQUENT_REASSESSMENT_DAYS = 42`.

### Quiz / Assessment ([src/pages/Assessment.tsx](src/pages/Assessment.tsx))
The core interactive feature. Screen flow: `welcome → select → quiz → result → select`.

**Structure:**
- `APP_TO_QUIZ`: maps ~100 app topic IDs → ~54 question-set IDs (many-to-one; `null` = no quiz)
- `buildQuizSchedule()`: produces **one `QuizGroup` per section** (12 total). For each section it collects all questions from all mapped topic IDs, sorts by difficulty ascending, and takes the first 10.
- `QuizGroup`: `{ sectionId, appTopicIds[], label, sectionLabel, questions[] }`
- Completing a section quiz applies the **same rating to every app topic in that section**

**Scoring (10 questions per quiz):**
`computeRating(correctCount)`: 0-2→1★ | 3-4→2★ | 5-6→3★ | 7-9→4★ | 10→5★

**In `SingleTopicQuiz`:**
- TF questions (`type: 'tf'`) show `['V','F']` labels; MCQ shows `['A','B','C','D']`
- Fill questions (`type: 'fill'`) show `['A','B','C','D']` labels; question text contains `___` for the blank
- `handleFinish()` calls both `completeAssessment()` (local) and `api.ratings.completeAssessment()` (backend, silent fail)

### Question Data ([src/data/questions/](src/data/questions/))
Question types (discriminated union in [src/data/questions/types.ts](src/data/questions/types.ts)):

| type | Struttura | Note |
|------|-----------|------|
| `mcq` | `options: string[]`, nessun `correct` | Risposta corretta sempre a `options[0]`; usa `___` nel testo per fill-in-the-blank |
| `tf` | `options: string[]`, `correct: 0\|1` | `['Vero','Falso']` ordine fisso; V/F ha significato semantico |
| `arrange` | `bank: string[]`, `correct: string[]` | Word bank con distrattori; risposta = sequenza corretta |

I dati stanno in file **JSON** (`src/data/questions/*.json`), importati da `index.ts`. Per aggiungere domande: appendi oggetti al JSON corrispondente — nessun TypeScript richiesto. `index.ts` esporta `getQuestionsForTopic(topicId)` e `computeRating(n)`.

### Study Plans ([src/data/studyPlans/](src/data/studyPlans/))
Study plans are **section-level** (not per individual topic). There is one plan per section per star rating (12 sections × 5 ratings = 60 plans), stored in `sections.ts`.

```typescript
{ topicId, rating, timeEstimate, priority, label,
  whatYouNeed, approach[], keyPoints[], commonMistakes[], exercises[], nextStep }
```

Here `topicId` holds a **sectionId** (e.g. `'derivate'`, `'limiti'`). Public API:
- `getStudyPlanForSection(sectionId, rating)` — used by `TopicStudyPlan.tsx`
- `hasSectionPlan(sectionId)` — always true for all 12 sections

The older per-topic infrastructure (`APP_TO_PLAN`, `getStudyPlanForTopic`, `prereq.ts`, `analysis1.ts`, `analysis2.ts`, `missing.ts`) still exists in the codebase but is **no longer used by the UI**.

The section rating is read as the first non-zero rating among the section's topics (all topics in a section share the same rating after a quiz).

### Tracker ([src/pages/Tracker.tsx](src/pages/Tracker.tsx))
- Only shows sections and topics where at least one topic has rating > 0 (unassessed sections are hidden entirely)
- "Piano" button appears only on section headers (not on individual topic rows), navigating to `/topic/:sectionId`
- Individual topic rows (`TopicRow`) show only the topic label and star rating — no navigation

### Dashboard ([src/pages/Dashboard.tsx](src/pages/Dashboard.tsx))
All stats (progress ring, star distribution, average rating, "N/12 argomenti valutati") are **section-based**, not individual-topic-based. `SectionCard` is a `div` (not a `button`) with two separate clickable areas: the card body navigates to the tracker, and a "Piano di studio" button navigates to the section study plan.

### Data Topics ([src/data/topics.ts](src/data/topics.ts))
~100 topics in 12 `Section` objects (Prerequisiti → EDO). Each section carries Tailwind color token strings (`border`, `dot`, `badge`, `bar`, `chip`) used throughout the UI.

**Never construct Tailwind class names dynamically** — JIT will miss classes not written out in full. All color strings are inlined in `topics.ts`.

### Backend ([backend/](backend/))
FastAPI with three routers in `backend/routers/`: `auth_router`, `questions_router`, `ratings_router`. SQLite DB auto-created on first run. Models: `User`, `Question`, `UserRating`, `RatingHistory`, `UserProgress`. CORS allows `localhost:5173/4173/5174`.

### Key Tailwind Notes
- Dark mode is `class`-based (set in [tailwind.config.js](tailwind.config.js)), not `media`-based
- Sidebar nav visible at `md:` breakpoint; bottom bar navigation on mobile
