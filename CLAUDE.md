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

The frontend reads `VITE_API_URL` from `.env.local` (defaults to `http://localhost:8001`). Backend requires Python 3.12 with **pydantic v1** (pydantic v2 needs Rust, not available). Pin `bcrypt==4.0.1` — v5 breaks passlib 1.7.4.

There are no tests. Type checking is part of `npm run build` (`tsc -b`).

## Architecture

### Tech Stack
- **React 19** + **TypeScript ~6** + **Vite 8**
- **Tailwind CSS 3** (class-based dark mode via `html.dark`)
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
| `/topic/:topicId` | Per-topic study plan detail |
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
```typescript
type Question = {
  id: string; topicId: string; difficulty: 1|2|3|4|5;
  type: 'mcq' | 'tf' | 'fill';
  question: string;         // 'fill' type: contains ___ for the blank
  options: string[];        // 4 for mcq/fill; ['Vero','Falso'] for tf
  correct: number;          // index into options
  explanation: string;
};
```
Files: `prereq.ts`, `analysis1.ts`, `analysis2.ts`, `analysis3.ts`, `tf.ts`. Each topic has exactly 10 questions (5 MCQ + 5 TF). `index.ts` combines all files and exports `getQuestionsForTopic(topicId)` and `computeRating(n)`.

The `type: 'mcq'` field must be **explicit** on every MCQ object — it is never inferred. Adding a new question file requires importing it in `index.ts` and spreading it into the `questions` array.

### Study Plans ([src/data/studyPlans/](src/data/studyPlans/))
Each topic has 5 `StudyPlan` objects (one per star rating 1–5). Structure:
```typescript
{ topicId, rating, timeEstimate, priority, label,
  whatYouNeed, approach[], keyPoints[], commonMistakes[], exercises[], nextStep }
```
`APP_TO_PLAN` in `index.ts` mirrors `APP_TO_QUIZ` but covers all app topics (no `null` entries). `getStudyPlanForTopic(appTopicId, rating)` is the public API used by `TopicStudyPlan.tsx` and `Tracker.tsx`.

### Data Topics ([src/data/topics.ts](src/data/topics.ts))
~100 topics in 12 `Section` objects (Prerequisiti → EDO). Each section carries Tailwind color token strings (`border`, `dot`, `badge`, `bar`, `chip`) used throughout the UI.

**Never construct Tailwind class names dynamically** — JIT will miss classes not written out in full. All color strings are inlined in `topics.ts`.

### Backend ([backend/](backend/))
FastAPI with three routers in `backend/routers/`: `auth_router`, `questions_router`, `ratings_router`. SQLite DB auto-created on first run. Models: `User`, `Question`, `UserRating`, `RatingHistory`, `UserProgress`. CORS allows `localhost:5173/4173/5174`.

### Key Tailwind Notes
- Dark mode is `class`-based (set in [tailwind.config.js](tailwind.config.js)), not `media`-based
- Sidebar nav visible at `md:` breakpoint; bottom bar navigation on mobile
