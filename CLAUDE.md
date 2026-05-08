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
Double-click `start.bat` to open two cmd windows — backend on `:8001` and frontend on `:5173`.

The frontend reads `VITE_API_URL` from `.env.local` (default `http://localhost:8001`). Backend uses Python 3.12 with **pydantic v1** (pydantic v2 / Rust not available on this machine). Pin `bcrypt==4.0.1` — v5 breaks passlib 1.7.4.

There are no tests. Type checking is part of the build step (`tsc -b`).

## Architecture

### Tech Stack
- **React 19** + **TypeScript ~6** + **Vite 8**
- **Tailwind CSS 3** (class-based dark mode via `html.dark`)
- **react-router-dom 7** (BrowserRouter, 7 routes)
- **FastAPI** + **SQLAlchemy 2** + **SQLite** (`backend/analisi1.db`, auto-created)
- No Redux/Zustand — state in `localStorage` + custom hooks

### Routing ([src/App.tsx](src/App.tsx))
`AuthProvider` wraps the entire tree. `AppShell` shows a spinner while the auth token is being validated, then renders normally with no login gate.

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/assessment` | Assessment (quiz hub) |
| `/tracker` | Tracker |
| `/plan` | Study plan phases |
| `/history` | History |
| `/topic/:topicId` | Per-topic study plan |
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
- `completeAssessment(ratings)` merges ratings and appends history
- Reassessment intervals: 28 days after initial, 42 days for subsequent
- On login, `useAuth` calls `syncBackendToStorage()` to overwrite localStorage with backend data

### Auth ([src/store/useAuth.tsx](src/store/useAuth.tsx))
Optional JWT auth. Token stored at `localStorage('analisi1_token')`. On app load, if a token exists it calls `/auth/me` and syncs backend progress into the tracker's localStorage key. Login/register both sync immediately after. Logout clears both the token and tracker keys.

### Quiz / Assessment ([src/pages/Assessment.tsx](src/pages/Assessment.tsx))
The core interactive feature. Flow: Welcome → TopicSelect → SingleTopicQuiz → TopicResultScreen → back to TopicSelect.

- `APP_TO_QUIZ` maps the ~100 app topic IDs to the ~54 question-set IDs (many-to-one, some app topics have no quiz)
- `buildQuizSchedule()` creates one `QuizGroup` per question-set ID; each group gets `shuffle(allQs).slice(0, 5)` — always 5 questions, always random mix of MCQ + TF (+ fill when added)
- `computeRating(correctCount)`: 0→1★ | 1→2★ | 2→3★ | 3-4→4★ | 5→5★
- After each quiz, `TopicResultScreen` shows stars + the full `StudyPlan` for that topic/rating
- `handleFinish()` calls both local `completeAssessment()` and `api.ratings.completeAssessment()` (if logged in)

### Question Data ([src/data/questions/](src/data/questions/))
```typescript
type Question = {
  id: string; topicId: string; difficulty: 1|2|3|4|5;
  type: 'mcq' | 'tf' | 'fill';
  question: string;         // for 'fill': contains ___ for the blank
  options: string[];        // 4 for mcq/fill; ['Vero','Falso'] for tf
  correct: number;          // index into options
  explanation: string;
};
```
Files: `prereq.ts`, `analysis1.ts`, `analysis2.ts`, `analysis3.ts`, `tf.ts`. `index.ts` combines them and exports `getQuestionsForTopic(topicId)` and `computeRating(n)`.

In `SingleTopicQuiz`, TF questions use `['V','F']` labels; MCQ uses `['A','B','C','D']`. The `type: 'mcq'` field must be explicit on every MCQ object (not inferred).

### Study Plans ([src/data/studyPlans/](src/data/studyPlans/))
Each topic has 5 `StudyPlan` objects (one per star rating). Structure: `{ topicId, rating, timeEstimate, priority, label, whatYouNeed, approach[], keyPoints[], commonMistakes[], exercises[], nextStep }`. The `APP_TO_PLAN` map in `index.ts` mirrors `APP_TO_QUIZ` but covers all topics. `getStudyPlanForTopic(appTopicId, rating)` is the public API.

### Data Topics ([src/data/topics.ts](src/data/topics.ts))
~100 topics in 12 `Section` objects (Prerequisiti → EDO). Each section carries Tailwind color tokens (`border`, `dot`, `badge`, `bar`, `chip`) used throughout the UI. **Do not use dynamic class construction** — Tailwind JIT will miss those classes. `PRESEED_RATINGS` provides demo data.

### Backend ([backend/](backend/))
FastAPI with three routers (`auth_router`, `questions_router`, `ratings_router`). SQLite DB auto-created on first run. Models: `User`, `Question`, `UserRating`, `RatingHistory`, `UserProgress`. CORS is locked to `localhost:5173/4173/5174`.

### Key Tailwind Notes
- Dark mode is `class`-based (configured in [tailwind.config.js](tailwind.config.js))
- Sidebar nav visible at `md:` breakpoint, bottom bar on mobile
- Color token strings are inlined in `topics.ts` — never construct them dynamically
