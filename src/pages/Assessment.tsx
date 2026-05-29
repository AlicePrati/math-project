import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SECTIONS } from '../data/topics';
import {
  INITIAL_REASSESSMENT_DAYS,
  SUBSEQUENT_REASSESSMENT_DAYS,
} from '../data/assessmentLevels';
import { getQuestionsForTopic, computeRating } from '../data/questions';
import { api } from '../lib/api';
import type { Question, SelectionQuestion, TFQuestion, ArrangeQuestion } from '../data/questions';
import { useTracker } from '../store/useTracker';

// ── Mapping: app topic ID → question topic ID ────────────────────────────────
const APP_TO_QUIZ: Record<string, string | null> = {
  logica_quantificatori: 'logica_quantificatori',
  implicazione_contronominale: 'implicazione',
  dimostrazione_ind: 'dimostrazione',
  insiemi_reali: 'insiemi_operazioni',
  intervalli_intorni: 'intervalli_intorni',
  disug_valore_assoluto: 'valore_assoluto',
  disug_notevoli: null,
  funzioni_base: 'funzioni_base',
  iniettivita: 'iniettivita',
  funzione_composta: 'composta_inversa',
  potenze_radicali: null,
  esponenziale_log: 'exp_log',
  trig: 'trigonometria',
  insiemi_numerici: 'insiemi_numerici',
  estremo_sup_inf: 'estremo_sup',
  principio_induzione: 'principio_induzione',
  valore_assoluto: 'valore_assoluto',
  numeri_complessi: null,
  successioni_def: null,
  limite_successione: 'limite_successione',
  successioni_monotone: 'successioni_monotone',
  teorema_carabinieri: null,
  cauchy_successione: 'cauchy_successione',
  numero_eulero: 'numero_eulero',
  limite_eps_delta: 'limite_eps_delta',
  limiti_ds: null,
  limiti_infinito: null,
  algebra_limiti: 'algebra_limiti',
  forme_indeterminate: 'forme_indeterminate',
  limiti_notevoli: 'limiti_notevoli',
  confronto_infiniti: 'confronto_infiniti',
  teorema_confronto: null,
  continuita_def: 'continuita_def',
  continuita_intervallo: null,
  bolzano: 'bolzano',
  weierstrass: 'weierstrass',
  tvi: null,
  discontinuita: 'discontinuita',
  derivata_def: 'derivata_def',
  derivate_fondamentali: 'regole_derivazione',
  regole_derivazione: 'regole_derivazione',
  chain_rule: 'chain_rule',
  derivata_inversa: null,
  fermat: 'teoremi_derivate',
  rolle: 'teoremi_derivate',
  lagrange: 'teoremi_derivate',
  cauchy_derivate: 'teoremi_derivate',
  de_lhopital: 'de_lhopital',
  derivate_superiori: null,
  monotonia: 'monotonia',
  massimi_minimi: 'massimi_minimi',
  concavita_flessi: 'concavita',
  studio_funzione: null,
  asintoti: 'asintoti',
  taylor_peano: 'taylor_peano',
  taylor_lagrange: null,
  maclaurin_notevoli: 'taylor_notevoli',
  taylor_limiti: 'taylor_limiti',
  riemann_def: 'integrale_def',
  integrale_prop: 'proprieta_integrali',
  teorema_media: null,
  torricelli: 'torricelli',
  primitiva_indefinito: 'int_immediate',
  int_immediate: 'int_immediate',
  sostituzione: 'int_sostituzione',
  int_parti: 'int_parti',
  razionali_fratte: 'razionali_fratte',
  int_radicali: null,
  improprio_illimitato: 'improprio_illimitato',
  improprio_funzione: 'improprio_funzione',
  criteri_conv: 'criteri_conv',
  edo_separabili: 'ode_separabili',
  edo_lineari_1: 'ode_lineari_1',
  edo_lineari_2: 'ode_lineari_2',
  problema_cauchy: 'cauchy_problema',
  sovrapposizione: null,
};

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

function sampleStratified(pool: Question[], total: number): Question[] {
  const byDiff: Record<number, Question[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const q of pool) byDiff[q.difficulty].push(q);
  for (const tier of Object.values(byDiff)) tier.sort(() => Math.random() - 0.5);

  const result: Question[] = [];
  const tiers = ([1, 2, 3, 4, 5] as const).filter((d) => byDiff[d].length > 0);
  let i = 0;
  while (result.length < total && tiers.some((d) => byDiff[d].length > 0)) {
    const tier = byDiff[tiers[i % tiers.length]];
    if (tier.length > 0) result.push(tier.pop()!);
    i++;
  }
  return result;
}

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

    const questions = sampleStratified(allQs, 10);

    return [{
      sectionId: section.id,
      appTopicIds: section.topics.map((t) => t.id),
      label: section.label,
      sectionLabel: section.label,
      questions,
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
              Tempo di rivalutarti!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Scegli gli argomenti su cui vuoi testarti. Le domande vengono mescolate
              ogni volta, così il test è sempre fresco. Puoi farne quanti vuoi e tornare
              alla dashboard in qualsiasi momento.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Benvenuta in Analisi 1 Tracker
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Scegli gli argomenti su cui vuoi testarti: per ognuno risponderai a
              10 domande e riceverai le stelline automaticamente.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
              Puoi farne quanti vuoi e procedere alla dashboard quando vuoi.
              Il test si ripete ogni {nextInterval} giorni.
            </p>
          </>
        )}

        <div className="grid grid-cols-5 gap-1.5 mb-8">
          {[
            { label: '1★', sub: '0-2 giuste', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
            { label: '2★', sub: '3-4 giuste', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
            { label: '3★', sub: '5-6 giuste', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
            { label: '4★', sub: '7-9 giuste', color: 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300' },
            { label: '5★', sub: '10 giuste', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
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
          {isReassessment ? 'Scegli gli argomenti' : 'Inizia'}
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
              {isReassessment ? 'Rivalutazione' : 'Valutazione iniziale'}
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {doneCount}/{schedule.length} sezioni
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
                  {group.questions.length} domande · difficoltà crescente
                </p>
                {isReassessment && avgPrev !== undefined && !isDone && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Media precedente: {avgPrev}★
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
                {isDone ? 'Rifai' : 'Inizia'}
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
            {doneCount === 0 ? 'Salta per ora' : 'Vai alla Dashboard'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {doneCount > 0 && (
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-1.5">
              {doneCount} sezione{doneCount !== 1 ? 'i' : ''} completata{doneCount !== 1 ? 'e' : ''} · puoi continuare in seguito
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

function SingleTopicQuiz({
  group,
  onComplete,
  onBack,
}: {
  group: QuizGroup;
  onComplete: (correctCount: number) => void;
  onBack: () => void;
}) {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [placed, setPlaced] = useState<number[]>([]);
  const [shuffledBank, setShuffledBank] = useState<string[]>(() => {
    const q = group.questions[0];
    return q.type === 'arrange' ? [...q.bank].sort(() => Math.random() - 0.5) : [];
  });
  const [optionOrder, setOptionOrder] = useState<number[]>(() => initOptionOrder(group.questions[0]));

  useEffect(() => {
    if (questionIdx === 0) return;
    const q = group.questions[questionIdx];
    setShuffledBank(q.type === 'arrange' ? [...q.bank].sort(() => Math.random() - 0.5) : []);
    setOptionOrder(initOptionOrder(q));
    setPlaced([]);
  }, [questionIdx]);

  const question: Question = group.questions[questionIdx];
  const isLastQuestion = questionIdx === group.questions.length - 1;
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

  function handleConfirm() {
    if (!showFeedback) {
      if (isArrange) {
        if (isArrangeCorrect) setCorrect((c) => c + 1);
      } else {
        if (selected === null) return;
        if (isCorrectSelected) setCorrect((c) => c + 1);
      }
      setShowFeedback(true);
      return;
    }

    const finalCorrect = isCurrentCorrect ? correct + 1 : correct;

    if (!isLastQuestion) {
      setQuestionIdx((i) => i + 1);
      setSelected(null);
      setPlaced([]);
      setOptionOrder([]);
      setShowFeedback(false);
      return;
    }

    onComplete(finalCorrect);
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
              Sezioni
            </button>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">Quiz sezione</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{group.label}</p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 w-16 text-right tabular-nums">
              {questionIdx + 1}/{group.questions.length}
            </span>
          </div>
          {/* Question dots */}
          <div className="flex gap-1">
            {group.questions.map((_, i) => (
              <div
                key={i}
                className={[
                  'flex-1 h-1 rounded-full transition-colors',
                  i < questionIdx || (i === questionIdx && showFeedback)
                    ? 'bg-amber-400'
                    : i === questionIdx
                    ? 'bg-amber-300'
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
            Difficoltà {question.difficulty}
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
                <p className="text-sm text-gray-400 dark:text-gray-500 self-center">Tocca le parole qui sotto…</p>
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
            <p className="font-semibold mb-1">{isCurrentCorrect ? '✓ Corretto!' : '✗ Sbagliato'}</p>
            {isArrange && !isCurrentCorrect && (
              <p className="mb-1">
                Risposta corretta: <strong>{(question as ArrangeQuestion).correct.join(' ')}</strong>
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
              ? 'Conferma risposta'
              : isLastQuestion
              ? 'Vedi risultato →'
              : 'Prossima domanda →'}
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
    1: 'Questa sezione ha bisogno di molto lavoro. Inizia dall\'inizio.',
    2: 'Basi presenti ma fragili. Ripassa i concetti fondamentali.',
    3: 'Discreta padronanza. Consolida i punti ancora incerti.',
    4: 'Buona preparazione. Rifinisci i dettagli.',
    5: 'Ottimo! Sezione padroneggiata.',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-4 py-6 pb-32 space-y-4">

        {/* Risultato */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
            Sezione completata
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
            Stelline assegnate
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            Il voto è stato applicato a tutti gli {group.appTopicIds.length} argomenti di questa sezione.
            Puoi vedere i piani di studio dettagliati per argomento nel Tracker.
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
            Vai alla Dashboard
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-3 rounded-xl font-semibold text-sm bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white transition-colors"
          >
            Prossima sezione →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Assessment() {
  const { data, completeAssessment } = useTracker();
  const navigate = useNavigate();

  const isReassessment = data.onboardingComplete;

  const schedule = useMemo(
    () => buildQuizSchedule(),
    [isReassessment],
  );

  const [screen, setScreen] = useState<Screen>('welcome');
  const [sessionRatings, setSessionRatings] = useState<Record<string, number>>({});
  const [activeGroup, setActiveGroup] = useState<QuizGroup | null>(null);
  const [lastResult, setLastResult] = useState<{ group: QuizGroup; rating: 1|2|3|4|5 } | null>(null);

  function handleSelectTopic(group: QuizGroup) {
    setActiveGroup(group);
    setScreen('quiz');
  }

  function handleTopicComplete(correctCount: number) {
    if (!activeGroup) return;
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
