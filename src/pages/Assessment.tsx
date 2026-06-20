import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SECTIONS } from '../data/topics';
import {
  INITIAL_REASSESSMENT_DAYS,
  SUBSEQUENT_REASSESSMENT_DAYS,
} from '../data/assessmentLevels';
import { getQuestionsForTopic, computeRating } from '../data/questions';
import { APP_TO_QUIZ } from '../data/questions/mapping';
import { api } from '../lib/api';
import { pickNext, pickAnyUnused } from '../lib/adaptiveQuiz';
import type { Question, SelectionQuestion, TFQuestion, ArrangeQuestion } from '../data/questions';
import { useTracker } from '../store/useTracker';
import { useExercises } from '../store/useExercises';


// ── Types ────────────────────────────────────────────────────────────────────

type Screen = 'welcome' | 'select' | 'quiz' | 'result';

interface QuizGroup {
  sectionId: string;
  appTopicIds: string[];
  label: string;
  sectionLabel: string;
  questions: Question[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function buildQuizSchedule(): QuizGroup[] {
  return SECTIONS.flatMap((section) => {
    const seenQuizIds = new Set<string>();
    const allQs: Question[] = [];

    for (const topic of section.topics) {
      const qId = APP_TO_QUIZ[topic.id];
      if (!qId || seenQuizIds.has(qId)) continue;
      seenQuizIds.add(qId);
      allQs.push(...getQuestionsForTopic(qId));
    }

    if (allQs.length === 0) return [];

    return [{
      sectionId: section.id,
      appTopicIds: section.topics.map((t) => t.id),
      label: section.label,
      sectionLabel: section.label,
      questions: allQs,
    }];
  });
}

// ── WelcomeScreen ─────────────────────────────────────────────────────────────

function WelcomeScreen({
  isReassessment,
  assessmentCount,
  onStart,
}: {
  isReassessment: boolean;
  assessmentCount: number;
  onStart: () => void;
}) {
  const nextInterval =
    assessmentCount <= 1 ? INITIAL_REASSESSMENT_DAYS : SUBSEQUENT_REASSESSMENT_DAYS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          {isReassessment ? (
            <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )}
        </div>

        {isReassessment ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Time to reassess!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Choose the sections you want to be tested on. Questions are randomised
              every time, so each quiz is always fresh. Do as many as you like and return
              to the dashboard whenever you want.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Welcome to Maths Tracker
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Choose the sections you want to be tested on: for each one you'll answer
              10 questions and receive a star rating automatically.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
              Do as many as you like and go to the dashboard whenever you want.
              The quiz repeats every {nextInterval} days.
            </p>
          </>
        )}

        <div className="grid grid-cols-5 gap-1.5 mb-8">
          {[
            { label: '1★', sub: '0-2 correct', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
            { label: '2★', sub: '3-4 correct', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
            { label: '3★', sub: '5-6 correct', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
            { label: '4★', sub: '7-9 correct', color: 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300' },
            { label: '5★', sub: '10 correct', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
          ].map((l) => (
            <div key={l.label} className={`rounded-lg py-2 px-1 text-center text-xs font-semibold ${l.color}`}>
              <div className="font-bold mb-0.5">{l.label}</div>
              <div className="text-[10px] opacity-70">{l.sub}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-base"
        >
          {isReassessment ? 'Choose sections' : 'Start'}
        </button>
      </div>
    </div>
  );
}

// ── TopicSelectScreen ─────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number | undefined }) {
  if (rating === undefined) {
    return <span className="text-gray-300 dark:text-gray-600 text-sm tracking-wider">☆☆☆☆☆</span>;
  }
  const STAR_COLOR: Record<number, string> = {
    1: 'text-red-400', 2: 'text-orange-400', 3: 'text-yellow-400', 4: 'text-lime-400', 5: 'text-green-400',
  };
  return (
    <span className={`text-sm tracking-wider ${STAR_COLOR[rating] ?? 'text-amber-400'}`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

function TopicSelectScreen({
  schedule,
  sessionRatings,
  existingRatings,
  onSelect,
  onFinish,
  isReassessment,
}: {
  schedule: QuizGroup[];
  sessionRatings: Record<string, number>;
  existingRatings: Record<string, number>;
  onSelect: (group: QuizGroup) => void;
  onFinish: () => void;
  isReassessment: boolean;
}) {
  const doneCount = schedule.filter((g) =>
    g.appTopicIds.some((id) => sessionRatings[id] !== undefined),
  ).length;

  const sectionColors = Object.fromEntries(
    SECTIONS.map((s) => [s.id, s.colors]),
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              {isReassessment ? 'Reassessment' : 'Initial assessment'}
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {doneCount}/{schedule.length} sections
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${schedule.length > 0 ? (doneCount / schedule.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </header>

      {/* Section cards */}
      <div className="max-w-2xl mx-auto px-4 py-5 pb-28 space-y-3">
        {schedule.map((group) => {
          const colors = sectionColors[group.sectionId];
          const sessionRating = group.appTopicIds
            .map((id) => sessionRatings[id])
            .find((r) => r !== undefined);
          const ratings = group.appTopicIds
            .map((id) => existingRatings[id])
            .filter((r): r is number => r !== undefined && r > 0);
          const avgPrev = ratings.length > 0
            ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
            : undefined;
          const isDone = sessionRating !== undefined;

          return (
            <div
              key={group.sectionId}
              className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 ${colors.border} flex items-center gap-3 px-4 py-3`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">
                  {group.label}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {group.questions.length} questions · increasing difficulty
                </p>
                {isReassessment && avgPrev !== undefined && !isDone && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Previous average: {avgPrev}★
                  </p>
                )}
              </div>

              <StarRow rating={sessionRating} />

              <button
                onClick={() => onSelect(group)}
                className={[
                  'flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors',
                  isDone
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-amber-500 hover:bg-amber-400 text-white',
                ].join(' ')}
              >
                {isDone ? 'Redo' : 'Start'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onFinish}
            className="w-full py-3 rounded-xl font-semibold text-base bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white transition-colors flex items-center justify-center gap-2"
          >
            {doneCount === 0 ? 'Skip for now' : 'Go to Dashboard'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {doneCount > 0 && (
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-1.5">
              {doneCount} section{doneCount !== 1 ? 's' : ''} completed · you can continue later
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SingleTopicQuiz ───────────────────────────────────────────────────────────

function initOptionOrder(q: Question): number[] {
  if (q.type === 'mcq') {
    return [...(q as SelectionQuestion).options.map((_, i) => i)].sort(() => Math.random() - 0.5);
  }
  if (q.type === 'tf') return [0, 1];
  return [];
}

const QUIZ_LENGTH = 10;

function SingleTopicQuiz({
  group,
  startDifficulty,
  onComplete,
  onBack,
}: {
  group: QuizGroup;
  startDifficulty: number;
  onComplete: (correctCount: number, finalDifficulty: number) => void;
  onBack: () => void;
}) {
  const [currentDifficulty, setCurrentDifficulty] = useState(startDifficulty);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [warmupDone, setWarmupDone] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);

  // group.questions is always non-empty (buildQuizSchedule filters empty sections)
  const firstQ = (pickNext(group.questions, new Set(), startDifficulty)
    ?? pickAnyUnused(group.questions, new Set()))!;
  const [question, setQuestion] = useState<Question>(firstQ);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [placed, setPlaced] = useState<number[]>([]);
  const [shuffledBank, setShuffledBank] = useState<string[]>(() =>
    firstQ.type === 'arrange' ? [...(firstQ as ArrangeQuestion).bank].sort(() => Math.random() - 0.5) : [],
  );
  const [optionOrder, setOptionOrder] = useState<number[]>(() => initOptionOrder(firstQ));

  const isArrange = question.type === 'arrange';
  const isTF = question.type === 'tf';
  const correctOriginalIdx = isTF ? (question as TFQuestion).correct : 0;
  const isCorrectSelected = !isArrange && selected !== null && optionOrder[selected] === correctOriginalIdx;
  const isArrangeCorrect = isArrange &&
    placed.length === (question as ArrangeQuestion).correct.length &&
    placed.every((bankIdx, pos) => shuffledBank[bankIdx] === (question as ArrangeQuestion).correct[pos]);
  const isCurrentCorrect = isArrange ? isArrangeCorrect : isCorrectSelected;
  const canConfirm = showFeedback || (isArrange
    ? placed.length === (question as ArrangeQuestion).correct.length
    : selected !== null);
  const LABELS = isTF ? ['V', 'F'] : ['A', 'B', 'C', 'D'];
  const isLastQuestion = answered === QUIZ_LENGTH - 1;

  function handleConfirm() {
    if (!showFeedback) {
      if (!isArrange && selected === null) return;
      setShowFeedback(true);
      return;
    }

    const wasCorrect = isCurrentCorrect;
    const nextCorrect = wasCorrect ? correct + 1 : correct;
    const nextAnswered = answered + 1;
    const nextUsedIds = new Set(usedIds);
    nextUsedIds.add(question.id);

    // Adaptive difficulty update
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

    if (isLastQuestion) {
      onComplete(nextCorrect, nextDifficulty);
      return;
    }

    // Pick next question: prefer current difficulty, fallback to any unused
    const next = pickNext(group.questions, nextUsedIds, nextDifficulty)
      ?? pickAnyUnused(group.questions, nextUsedIds);

    if (!next) {
      onComplete(nextCorrect, nextDifficulty);
      return;
    }

    setUsedIds(nextUsedIds);
    setAnswered(nextAnswered);
    setCorrect(nextCorrect);
    setCurrentDifficulty(nextDifficulty);
    setWarmupDone(nextWarmupDone);
    setConsecutiveCorrect(nextConsecCorrect);
    setConsecutiveWrong(nextConsecWrong);
    setQuestion(next);
    setOptionOrder(initOptionOrder(next));
    setShuffledBank(next.type === 'arrange' ? [...(next as ArrangeQuestion).bank].sort(() => Math.random() - 0.5) : []);
    setSelected(null);
    setPlaced([]);
    setShowFeedback(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
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
              Sections
            </button>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">Section quiz</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{group.label}</p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 w-16 text-right tabular-nums">
              {answered + 1}/{QUIZ_LENGTH} · lv{currentDifficulty}
            </span>
          </div>
          {/* Progress dots (fixed 10) */}
          <div className="flex gap-1">
            {Array.from({ length: QUIZ_LENGTH }).map((_, i) => (
              <div
                key={i}
                className={[
                  'flex-1 h-1 rounded-full transition-colors',
                  i < answered
                    ? 'bg-amber-400'
                    : i === answered && showFeedback
                    ? 'bg-amber-300'
                    : i === answered
                    ? 'bg-amber-200'
                    : 'bg-gray-200 dark:bg-gray-700',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-32">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-4">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 inline-block mb-4">
            Difficulty {question.difficulty}
          </span>
          <p className="text-gray-900 dark:text-gray-100 text-base leading-relaxed font-medium">
            {question.question}
          </p>
        </div>

        {/* Options (mcq / tf) */}
        {!isArrange && (
          <div className="space-y-3 mb-4">
            {optionOrder.map((originalIdx, displayPos) => {
              const allOptions = (question as SelectionQuestion | TFQuestion).options;
              const option = allOptions[originalIdx];
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
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all ${cls} ${!showFeedback ? 'hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10' : ''}`}
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

        {/* Answer area + word bank (arrange) */}
        {isArrange && (
          <>
            <div className="min-h-14 flex flex-wrap gap-2 p-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 mb-3">
              {placed.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 self-center">Tap the words below…</p>
              ) : (
                placed.map((bankIdx, pos) => {
                  const word = shuffledBank[bankIdx];
                  const isWordCorrect = word === (question as ArrangeQuestion).correct[pos];
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

        {/* Explanation */}
        {showFeedback && (
          <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
            isCurrentCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
          }`}>
            <p className="font-semibold mb-1">{isCurrentCorrect ? '✓ Correct!' : '✗ Wrong'}</p>
            {isArrange && !isCurrentCorrect && (
              <p className="mb-1">
                Correct answer: <strong>{(question as ArrangeQuestion).correct.join(' ')}</strong>
              </p>
            )}
            <p>{question.explanation}</p>
          </div>
        )}
      </main>

      {/* Bottom bar */}
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
            {!showFeedback
              ? 'Check answer'
              : isLastQuestion
              ? 'See result →'
              : 'Next question →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TopicResultScreen ─────────────────────────────────────────────────────────

const STAR_COLOR: Record<number, string> = {
  1: 'text-red-400', 2: 'text-orange-400', 3: 'text-yellow-400',
  4: 'text-lime-400', 5: 'text-green-400',
};


function TopicResultScreen({
  group,
  rating,
  onNext,
  onFinish,
}: {
  group: QuizGroup;
  rating: 1 | 2 | 3 | 4 | 5;
  onNext: () => void;
  onFinish: () => void;
}) {
  const RATING_MSG: Record<number, string> = {
    1: 'This section needs a lot of work. Start from the beginning.',
    2: 'Foundations are there but fragile. Review the core concepts.',
    3: 'Decent understanding. Consolidate the uncertain points.',
    4: 'Good preparation. Polish the details.',
    5: 'Excellent! Section mastered.',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-4 py-6 pb-32 space-y-4">

        {/* Risultato */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
            Section complete
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            {group.label}
          </p>
          <p className="text-4xl tracking-wider my-3 font-bold">
            <span className={STAR_COLOR[rating]}>{'★'.repeat(rating)}</span>
            <span className="text-gray-200 dark:text-gray-700">{'★'.repeat(5 - rating)}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
            {RATING_MSG[rating]}
          </p>
        </div>

        {/* Info argomenti */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">
            Stars assigned
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            The rating has been applied to all {group.appTopicIds.length} topics in this section.
            You can view detailed study plans for each topic in the Tracker.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 z-50">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={onFinish}
            className="flex-1 py-3 rounded-xl font-semibold text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-3 rounded-xl font-semibold text-sm bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white transition-colors"
          >
            Next section →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Assessment() {
  const { data, completeAssessment } = useTracker();
  const { getQuizDifficulty, setQuizDifficulty } = useExercises();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isReassessment = data.onboardingComplete;

  const schedule = useMemo(
    () => buildQuizSchedule(),
    [isReassessment],
  );

  // Se arriva con ?section=sectionId salta direttamente al quiz
  const autoSectionId = searchParams.get('section');
  const autoGroup = autoSectionId
    ? schedule.find((g) => g.sectionId === autoSectionId) ?? null
    : null;

  const [screen, setScreen] = useState<Screen>(() => autoGroup ? 'quiz' : 'welcome');
  const [sessionRatings, setSessionRatings] = useState<Record<string, number>>({});
  const [activeGroup, setActiveGroup] = useState<QuizGroup | null>(() => autoGroup);
  const [lastResult, setLastResult] = useState<{ group: QuizGroup; rating: 1|2|3|4|5 } | null>(null);

  function handleSelectTopic(group: QuizGroup) {
    setActiveGroup(group);
    setScreen('quiz');
  }

  function handleTopicComplete(correctCount: number, finalDifficulty: number) {
    if (!activeGroup) return;
    setQuizDifficulty(activeGroup.sectionId, finalDifficulty);
    const rating = computeRating(correctCount);
    const newRatings: Record<string, number> = {};
    for (const appId of activeGroup.appTopicIds) newRatings[appId] = rating;
    setSessionRatings((prev) => ({ ...prev, ...newRatings }));
    setLastResult({ group: activeGroup, rating });
    setActiveGroup(null);
    setScreen('result');
  }

  function handleFinish() {
    completeAssessment(sessionRatings);
    api.ratings.completeAssessment(sessionRatings).catch(() => {
      // fallback silenzioso: i dati sono già in localStorage
    });
    navigate('/');
  }

  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        isReassessment={isReassessment}
        assessmentCount={data.assessmentCount}
        onStart={() => setScreen('select')}
      />
    );
  }

  if (screen === 'quiz' && activeGroup) {
    return (
      <SingleTopicQuiz
        group={activeGroup}
        startDifficulty={getQuizDifficulty(activeGroup.sectionId)}
        onComplete={handleTopicComplete}
        onBack={() => { setActiveGroup(null); setScreen('select'); }}
      />
    );
  }

  if (screen === 'result' && lastResult) {
    return (
      <TopicResultScreen
        group={lastResult.group}
        rating={lastResult.rating}
        onNext={() => setScreen('select')}
        onFinish={handleFinish}
      />
    );
  }

  return (
    <TopicSelectScreen
      schedule={schedule}
      sessionRatings={sessionRatings}
      existingRatings={data.ratings}
      onSelect={handleSelectTopic}
      onFinish={handleFinish}
      isReassessment={isReassessment}
    />
  );
}
