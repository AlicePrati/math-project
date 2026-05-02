import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SECTIONS, ALL_TOPICS } from '../data/topics';
import type { Topic, Section } from '../data/topics';
import {
  INITIAL_LEVELS,
  REASSESSMENT_LEVELS,
  INITIAL_REASSESSMENT_DAYS,
  SUBSEQUENT_REASSESSMENT_DAYS,
} from '../data/assessmentLevels';
import type { AssessmentLevel } from '../data/assessmentLevels';
import { useTracker } from '../store/useTracker';

const DRAFT_KEY = 'analisi1_assessment_draft';

type Screen = 'welcome' | 'assess' | 'done';

// ── Sub-components ──────────────────────────────────────────────────────────

function WelcomeScreen({
  isReassessment,
  assessmentCount,
  onStart,
}: {
  isReassessment: boolean;
  assessmentCount: number;
  onStart: () => void;
}) {
  const nextInterval = assessmentCount <= 1 ? INITIAL_REASSESSMENT_DAYS : SUBSEQUENT_REASSESSMENT_DAYS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        {isReassessment ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Tempo di rivalutarti!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Sono passate alcune settimane. Valutiamo i tuoi progressi con un nuovo questionario
              — le domande sono formulate diversamente per darti un quadro fresco.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
              Vedrai la tua valutazione precedente accanto a ogni argomento, cosi potrai
              confrontare i miglioramenti.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Benvenuto in Analisi 1 Tracker
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Per costruire il tuo piano di studio personalizzato, devi prima valutare le
              tue competenze su ogni argomento.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
              Per ogni argomento scegli il livello che ti descrive meglio. Non ci sono risposte
              giuste o sbagliate — sii onesto con te stesso. Puoi fermarti e riprendere in qualsiasi momento.
            </p>
          </>
        )}

        <div className="grid grid-cols-5 gap-2 mb-8 text-xs">
          {INITIAL_LEVELS.map((l) => (
            <div key={l.value} className="text-center">
              <div className={`rounded-lg py-2 font-bold text-sm mb-1 ${l.selectedClass}`}>
                {l.value}
              </div>
              <span className="text-gray-500 dark:text-gray-400 leading-tight">{l.short}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-base"
        >
          {isReassessment ? 'Inizia la rivalutazione' : 'Inizia la valutazione'}
        </button>

        {!isReassessment && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            La valutazione si ripete ogni {nextInterval} giorni per misurare i tuoi progressi.
          </p>
        )}
      </div>
    </div>
  );
}

function TopicLevelPicker({
  topic,
  answer,
  previousRating,
  levels,
  onAnswer,
}: {
  topic: Topic;
  answer: number | undefined;
  previousRating: number | undefined;
  levels: AssessmentLevel[];
  onAnswer: (topicId: string, value: number) => void;
}) {
  return (
    <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{topic.label}</p>
        {previousRating !== undefined && previousRating > 0 && (
          <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500 tabular-nums">
            Prima: {previousRating}★
          </span>
        )}
      </div>
      <div className="flex gap-1">
        {levels.map((level) => {
          const selected = answer === level.value;
          return (
            <button
              key={level.value}
              onClick={() => onAnswer(topic.id, level.value)}
              title={level.full}
              className={[
                'flex-1 rounded-lg border py-1.5 px-0.5 text-center transition-all',
                selected
                  ? level.selectedClass
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600',
              ].join(' ')}
            >
              <div className="text-sm font-bold leading-none">{level.value}</div>
              <div className="text-[9px] leading-tight mt-0.5 font-medium">{level.short}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionAssessmentView({
  section,
  answers,
  previousRatings,
  levels,
  onAnswer,
}: {
  section: Section;
  answers: Record<string, number>;
  previousRatings: Record<string, number>;
  levels: AssessmentLevel[];
  onAnswer: (topicId: string, value: number) => void;
}) {
  return (
    <div
      className={[
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700',
        'border-l-4 overflow-hidden',
        section.colors.border,
      ].join(' ')}
    >
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{section.label}</h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {section.topics.filter((t) => answers[t.id] !== undefined).length}/{section.topics.length}
        </span>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
        {section.topics.map((topic) => (
          <TopicLevelPicker
            key={topic.id}
            topic={topic}
            answer={answers[topic.id]}
            previousRating={previousRatings[topic.id]}
            levels={levels}
            onAnswer={onAnswer}
          />
        ))}
      </div>
    </div>
  );
}

function ResultsScreen({
  answers,
  previousRatings,
  isReassessment,
  onContinue,
}: {
  answers: Record<string, number>;
  previousRatings: Record<string, number>;
  isReassessment: boolean;
  onContinue: () => void;
}) {
  const distribution = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count: Object.values(answers).filter((v) => v === star).length,
  }));
  const total = ALL_TOPICS.length;

  let improved = 0;
  let regressed = 0;
  if (isReassessment) {
    for (const [topicId, newVal] of Object.entries(answers)) {
      const prev = previousRatings[topicId] ?? 0;
      if (newVal > prev) improved++;
      if (newVal < prev) regressed++;
    }
  }

  const solidCount = Object.values(answers).filter((v) => v >= 4).length;

  const LEVEL_COLORS: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-lime-500',
    5: 'bg-green-500',
  };
  const LEVEL_LABELS: Record<number, string> = {
    1: 'Non conosco',
    2: 'Vago',
    3: 'Teoria',
    4: 'Applico',
    5: 'Padronanza',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {isReassessment ? 'Rivalutazione completata!' : 'Valutazione completata!'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {total} argomenti valutati · {solidCount} solidi ({Math.round((solidCount / total) * 100)}%)
          </p>
        </div>

        {/* Distribution bars */}
        <div className="space-y-2 mb-6">
          {distribution.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-20 text-right">
                {LEVEL_LABELS[star]}
              </span>
              <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${LEVEL_COLORS[star]}`}
                  style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-6 tabular-nums">
                {count}
              </span>
            </div>
          ))}
        </div>

        {/* Improvement summary for re-assessments */}
        {isReassessment && (
          <div className="flex gap-3 mb-6">
            <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-3 text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">+{improved}</p>
              <p className="text-xs text-green-700 dark:text-green-500">argomenti migliorati</p>
            </div>
            {regressed > 0 && (
              <div className="flex-1 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-3 text-center">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">-{regressed}</p>
                <p className="text-xs text-red-700 dark:text-red-500">argomenti calati</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={onContinue}
          className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
        >
          Vai alla Dashboard
        </button>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Assessment() {
  const { data, completeAssessment } = useTracker();
  const navigate = useNavigate();

  const isReassessment = data.onboardingComplete;
  const levels = isReassessment ? REASSESSMENT_LEVELS : INITIAL_LEVELS;

  const [screen, setScreen] = useState<Screen>('welcome');
  const [sectionIdx, setSectionIdx] = useState(0);

  // Load draft answers from localStorage so the session can be resumed
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      return draft ? (JSON.parse(draft) as Record<string, number>) : {};
    } catch {
      return {};
    }
  });

  // Persist draft as user answers
  useEffect(() => {
    if (screen === 'assess') {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
    }
  }, [answers, screen]);

  const handleAnswer = (topicId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [topicId]: value }));
  };

  const handleComplete = () => {
    completeAssessment(answers);
    localStorage.removeItem(DRAFT_KEY);
    setScreen('done');
  };

  const totalTopics = ALL_TOPICS.length;
  const answeredCount = Object.keys(answers).filter(
    (id) => answers[id] !== undefined,
  ).length;
  const allAnswered = answeredCount >= totalTopics;

  const currentSection = SECTIONS[sectionIdx];

  // Section progress: how many topics in the current section are answered
  const sectionAnsweredCount = currentSection
    ? currentSection.topics.filter((t) => answers[t.id] !== undefined).length
    : 0;
  const sectionComplete = currentSection
    ? sectionAnsweredCount === currentSection.topics.length
    : false;

  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        isReassessment={isReassessment}
        assessmentCount={data.assessmentCount}
        onStart={() => setScreen('assess')}
      />
    );
  }

  if (screen === 'done') {
    return (
      <ResultsScreen
        answers={answers}
        previousRatings={data.ratings}
        isReassessment={isReassessment}
        onContinue={() => navigate('/')}
      />
    );
  }

  const isLastSection = sectionIdx === SECTIONS.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sticky header with progress */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {isReassessment ? 'Rivalutazione' : 'Valutazione competenze'}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Sezione {sectionIdx + 1}/{SECTIONS.length} · {answeredCount}/{totalTopics} argomenti
              </p>
            </div>
            {!allAnswered && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {totalTopics - answeredCount} rimanenti
              </span>
            )}
            {allAnswered && (
              <span className="text-xs text-green-500 font-medium">Tutto risposto</span>
            )}
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalTopics) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
        {/* Level legend */}
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {levels.map((l) => (
            <span
              key={l.value}
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${l.legendClass}`}
            >
              {l.value} — {l.short}
            </span>
          ))}
        </div>

        {/* Section card */}
        <SectionAssessmentView
          section={currentSection}
          answers={answers}
          previousRatings={isReassessment ? data.ratings : {}}
          levels={levels}
          onAnswer={handleAnswer}
        />

        {/* Section jump dots */}
        <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
          {SECTIONS.map((s, i) => {
            const sAnswered = s.topics.filter((t) => answers[t.id] !== undefined).length;
            const sDone = sAnswered === s.topics.length;
            return (
              <button
                key={s.id}
                onClick={() => setSectionIdx(i)}
                title={s.label}
                className={[
                  'w-2.5 h-2.5 rounded-full transition-all',
                  i === sectionIdx
                    ? 'scale-125 bg-amber-500'
                    : sDone
                    ? 'bg-green-400 dark:bg-green-600'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600',
                ].join(' ')}
              />
            );
          })}
        </div>
      </div>

      {/* Fixed bottom nav bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setSectionIdx((i) => Math.max(0, i - 1))}
            disabled={sectionIdx === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Precedente
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              {currentSection.label}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {sectionAnsweredCount}/{currentSection.topics.length}
              {sectionComplete && ' ✓'}
            </p>
          </div>

          {isLastSection ? (
            <button
              onClick={handleComplete}
              disabled={!allAnswered}
              className={[
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                allAnswered
                  ? 'bg-amber-500 hover:bg-amber-400 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed',
              ].join(' ')}
            >
              Completa
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setSectionIdx((i) => Math.min(SECTIONS.length - 1, i + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Successiva
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
