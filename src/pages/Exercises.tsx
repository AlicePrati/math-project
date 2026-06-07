import { useState, useMemo } from 'react';
import { SECTIONS, TOPIC_MAP } from '../data/topics';
import { getExercisesForSection, getExercisesForTopic } from '../data/exercises';
import { useExercises } from '../store/useExercises';
import { pickNext } from '../lib/adaptiveQuiz';
import type { Question, SelectionQuestion, TFQuestion, ArrangeQuestion } from '../data/questions';

// ── helpers ───────────────────────────────────────────────────────────────────

function initOptionOrder(q: Question): number[] {
  if (q.type === 'mcq') {
    return [...(q as SelectionQuestion).options.map((_, i) => i)].sort(() => Math.random() - 0.5);
  }
  if (q.type === 'tf') return [0, 1];
  return [];
}

function initShuffledBank(q: Question): string[] {
  if (q.type === 'arrange') return [...(q as ArrangeQuestion).bank].sort(() => Math.random() - 0.5);
  return [];
}

function getTopicLabel(topicId: string): string {
  return (
    TOPIC_MAP[topicId]?.label ??
    topicId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// ── ExerciseSession ───────────────────────────────────────────────────────────

function ExerciseSession({
  sectionId,
  exercises,
  startDifficulty,
  onBack,
  markComplete,
  isCompleted,
}: {
  sectionId: string;
  exercises: Question[];
  startDifficulty: number;
  onBack: () => void;
  markComplete: (id: string) => void;
  isCompleted: (id: string) => boolean;
}) {
  const [currentDifficulty, setCurrentDifficulty] = useState(startDifficulty);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [warmupDone, setWarmupDone] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  const [exercise, setExercise] = useState<Question | null>(() =>
    pickNext(exercises, new Set(), startDifficulty),
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [placed, setPlaced] = useState<number[]>([]);
  const [optionOrder, setOptionOrder] = useState<number[]>(() =>
    exercise ? initOptionOrder(exercise) : [],
  );
  const [shuffledBank, setShuffledBank] = useState<string[]>(() =>
    exercise ? initShuffledBank(exercise) : [],
  );

  const section = SECTIONS.find((s) => s.id === sectionId);

  const isArrange = exercise?.type === 'arrange';
  const isTF = exercise?.type === 'tf';
  const correctOriginalIdx = isTF ? (exercise as TFQuestion).correct : 0;
  const isCorrectSelected =
    !isArrange && selected !== null && optionOrder[selected] === correctOriginalIdx;
  const isArrangeCorrect =
    isArrange &&
    placed.length === (exercise as ArrangeQuestion).correct.length &&
    placed.every((bi, pos) => shuffledBank[bi] === (exercise as ArrangeQuestion).correct[pos]);
  const isCurrentCorrect = isArrange ? isArrangeCorrect : isCorrectSelected;
  const canConfirm =
    showFeedback ||
    (isArrange
      ? placed.length === (exercise as ArrangeQuestion)?.correct.length
      : selected !== null);
  const LABELS = isTF ? ['V', 'F'] : ['A', 'B', 'C', 'D'];

  function loadNext(nextDifficulty: number, nextUsedIds: Set<string>) {
    const next = pickNext(exercises, nextUsedIds, nextDifficulty);
    if (!next) {
      setSessionDone(true);
      return;
    }
    setExercise(next);
    setOptionOrder(initOptionOrder(next));
    setShuffledBank(initShuffledBank(next));
    setSelected(null);
    setPlaced([]);
    setShowFeedback(false);
  }

  function handleConfirm() {
    if (!exercise) return;

    if (!showFeedback) {
      if (!isArrange && selected === null) return;
      setShowFeedback(true);
      markComplete(exercise.id);
      return;
    }

    const wasCorrect = isCurrentCorrect;
    const nextUsedIds = new Set(usedIds);
    nextUsedIds.add(exercise.id);
    setUsedIds(nextUsedIds);
    setAnswered((n) => n + 1);
    if (wasCorrect) setCorrect((n) => n + 1);

    let nextDifficulty = currentDifficulty;
    let nextWarmupDone = warmupDone;
    let nextConsecCorrect = consecutiveCorrect;
    let nextConsecWrong = consecutiveWrong;

    if (!warmupDone) {
      if (wasCorrect) {
        nextDifficulty = Math.min(5, currentDifficulty + 1);
      } else {
        nextWarmupDone = true;
        nextConsecCorrect = 0;
        nextConsecWrong = 1;
      }
    } else {
      if (wasCorrect) {
        nextConsecCorrect = consecutiveCorrect + 1;
        nextConsecWrong = 0;
        if (nextConsecCorrect >= 2) {
          nextDifficulty = Math.min(5, currentDifficulty + 1);
          nextConsecCorrect = 0;
        }
      } else {
        nextConsecWrong = consecutiveWrong + 1;
        nextConsecCorrect = 0;
        if (nextConsecWrong >= 2) {
          nextDifficulty = Math.max(1, currentDifficulty - 1);
          nextConsecWrong = 0;
        }
      }
    }

    setCurrentDifficulty(nextDifficulty);
    setWarmupDone(nextWarmupDone);
    setConsecutiveCorrect(nextConsecCorrect);
    setConsecutiveWrong(nextConsecWrong);

    loadNext(nextDifficulty, nextUsedIds);
  }

  // ── Session done screen ───────────────────────────────────────────────────
  if (sessionDone) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 max-w-sm w-full text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Session complete!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            No more questions at difficulty level {currentDifficulty}.
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">{answered}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">answered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{correct}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">correct</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-500">{currentDifficulty}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">final level</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl font-semibold text-base bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white transition-colors"
          >
            Back to topics
          </button>
        </div>
      </div>
    );
  }

  if (!exercise) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Topics
            </button>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">{section?.label}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                {getTopicLabel(exercise.topicId)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 w-16 justify-end">
              <span className="tabular-nums">{answered + 1}</span>
              <span className="text-xs">· lv{currentDifficulty}</span>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: answered + 1 }).map((_, i) => (
              <div
                key={i}
                className={[
                  'flex-1 h-1 rounded-full transition-colors',
                  i < answered
                    ? 'bg-amber-400'
                    : showFeedback
                    ? 'bg-amber-300'
                    : 'bg-amber-200',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-32">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              Difficulty {exercise.difficulty}
            </span>
            {isCompleted(exercise.id) && !showFeedback && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                ✓ done
              </span>
            )}
          </div>
          <p className="text-gray-900 dark:text-gray-100 text-base leading-relaxed font-medium">
            {exercise.question}
          </p>
        </div>

        {!isArrange && (
          <div className="space-y-3 mb-4">
            {optionOrder.map((originalIdx, displayPos) => {
              const allOpts = (exercise as SelectionQuestion | TFQuestion).options;
              const option = allOpts[originalIdx];
              const isThisCorrect = originalIdx === correctOriginalIdx;
              let cls = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200';
              if (!showFeedback && selected === displayPos)
                cls = 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-gray-900 dark:text-gray-100 ring-1 ring-amber-400';
              if (showFeedback && isThisCorrect)
                cls = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200';
              if (showFeedback && selected === displayPos && !isThisCorrect)
                cls = 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200';

              return (
                <button
                  key={displayPos}
                  onClick={() => !showFeedback && setSelected(displayPos)}
                  disabled={showFeedback}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all ${cls} ${
                    !showFeedback ? 'hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10' : ''
                  }`}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold mt-0.5">
                    {LABELS[displayPos]}
                  </span>
                  <span className="text-sm leading-relaxed flex-1">{option}</span>
                  {showFeedback && isThisCorrect && (
                    <svg className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {showFeedback && selected === displayPos && !isThisCorrect && (
                    <svg className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {isArrange && (
          <>
            <div className="min-h-14 flex flex-wrap gap-2 p-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 mb-3">
              {placed.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 self-center">Tap the words below…</p>
              ) : (
                placed.map((bankIdx, pos) => {
                  const word = shuffledBank[bankIdx];
                  const isWordCorrect = word === (exercise as ArrangeQuestion).correct[pos];
                  const cls = showFeedback
                    ? isWordCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                      : 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    : 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300';
                  return (
                    <button
                      key={pos}
                      onClick={() => !showFeedback && setPlaced((prev) => prev.filter((_, i) => i !== pos))}
                      disabled={showFeedback}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border-2 transition-all ${cls}`}
                    >
                      {word}
                    </button>
                  );
                })
              )}
            </div>
            {!showFeedback && (
              <div className="flex flex-wrap gap-2 mb-4">
                {shuffledBank.map((word, bankIdx) =>
                  placed.includes(bankIdx) ? null : (
                    <button
                      key={bankIdx}
                      onClick={() => setPlaced((prev) => [...prev, bankIdx])}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                    >
                      {word}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}

        {showFeedback && (
          <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
            isCurrentCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
          }`}>
            <p className="font-semibold mb-1">{isCurrentCorrect ? '✓ Correct!' : '✗ Wrong'}</p>
            {isArrange && !isCurrentCorrect && (
              <p className="mb-1">Correct answer: <strong>{(exercise as ArrangeQuestion).correct.join(' ')}</strong></p>
            )}
            <p>{exercise.explanation}</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={[
              'w-full py-3 rounded-xl font-semibold text-base transition-colors',
              !canConfirm
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white',
            ].join(' ')}
          >
            {!showFeedback ? 'Check answer' : 'Next exercise →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Exercises page ───────────────────────────────────────────────────────

type Screen = 'select' | 'topics' | 'session';

export default function Exercises() {
  const { markComplete, isCompleted, completedCountForSection, getQuizDifficulty } = useExercises();
  const [screen, setScreen] = useState<Screen>('select');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const sessionExercises = useMemo(
    () => (activeTopic ? getExercisesForTopic(activeTopic) : []),
    [activeTopic],
  );

  // ── Topic list screen ──────────────────────────────────────────────────────
  if (screen === 'topics' && activeSection) {
    const allExercises = getExercisesForSection(activeSection);
    const section = SECTIONS.find((s) => s.id === activeSection)!;
    const topicIds = [...new Set(allExercises.map((e) => e.topicId))];

    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <button
          onClick={() => setScreen('select')}
          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Sections
        </button>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{section.label}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Choose a topic to practice.</p>

        <div className="space-y-3">
          {topicIds.map((topicId) => {
            const exercises = allExercises.filter((e) => e.topicId === topicId);
            const total = exercises.length;
            const done = completedCountForSection(exercises.map((e) => e.id));

            return (
              <div
                key={topicId}
                className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 ${section.colors.border} flex items-center gap-3 px-4 py-3`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {getTopicLabel(topicId)}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {done}/{total} completed
                  </p>
                </div>

                {done === total && (
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓</span>
                )}

                <button
                  onClick={() => { setActiveTopic(topicId); setScreen('session'); }}
                  className={[
                    'flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors',
                    done > 0
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'bg-amber-500 hover:bg-amber-400 text-white',
                  ].join(' ')}
                >
                  {done > 0 ? 'Continue' : 'Start'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Session screen ─────────────────────────────────────────────────────────
  if (screen === 'session' && activeSection && activeTopic) {
    return (
      <ExerciseSession
        sectionId={activeSection}
        exercises={sessionExercises}
        startDifficulty={getQuizDifficulty(activeSection)}
        onBack={() => setScreen('topics')}
        markComplete={markComplete}
        isCompleted={isCompleted}
      />
    );
  }

  // ── Section select screen ──────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Exercises</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Free practice — answers don't affect your star ratings.
      </p>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const exercises = getExercisesForSection(section.id);
          const total = exercises.length;
          const done = completedCountForSection(exercises.map((e) => e.id));
          const isEmpty = total === 0;

          return (
            <div
              key={section.id}
              className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 ${section.colors.border} flex items-center gap-3 px-4 py-3`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {section.label}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {isEmpty ? 'Coming soon' : `${done}/${total} completed`}
                </p>
              </div>

              {!isEmpty && done === total && (
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓</span>
              )}

              <button
                onClick={() => { if (!isEmpty) { setActiveSection(section.id); setScreen('topics'); } }}
                disabled={isEmpty}
                className={[
                  'flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors',
                  isEmpty
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : done > 0
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-amber-500 hover:bg-amber-400 text-white',
                ].join(' ')}
              >
                {isEmpty ? 'Soon' : done > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
