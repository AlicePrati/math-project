import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SECTIONS, ALL_TOPICS, TOPIC_SECTION_MAP } from '../data/topics';
import type { Topic } from '../data/topics';
import { useTracker, isReassessmentDue } from '../store/useTracker';
import { PhaseCard } from '../components/PhaseCard';

// Sections whose 1★/unrated topics escalate to Fase 1 (foundational)
const PRIORITY_SECTION_IDS = new Set(['prerequisiti', 'successioni', 'limiti']);

interface Phase {
  phase: number;
  label: string;
  bgClass: string;
  borderClass: string;
  labelClass: string;
  topics: Topic[];
}

export default function Plan() {
  const { data } = useTracker();
  const navigate = useNavigate();
  const reassessmentDue = isReassessmentDue(data);

  const { phases, done } = useMemo(() => {
    const fase1: Topic[] = [];
    const fase2: Topic[] = [];
    const fase3: Topic[] = [];
    const fase4: Topic[] = [];
    const fatto: Topic[] = [];

    for (const topic of ALL_TOPICS) {
      const r = data.ratings[topic.id] ?? 0;
      const section = TOPIC_SECTION_MAP[topic.id];
      const sectionId = section?.id ?? '';

      if (r >= 4) {
        fatto.push(topic);
      } else if (r === 3) {
        fase4.push(topic);
      } else if (r === 2) {
        fase3.push(topic);
      } else {
        // r === 1 or unrated (0)
        if (PRIORITY_SECTION_IDS.has(sectionId)) {
          fase1.push(topic);
        } else {
          fase2.push(topic);
        }
      }
    }

    const phases: Phase[] = [
      {
        phase: 1,
        label: 'Fondamentali deboli',
        bgClass: 'bg-red-50 dark:bg-red-900/10',
        borderClass: 'border-red-200 dark:border-red-800',
        labelClass: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        topics: fase1,
      },
      {
        phase: 2,
        label: 'Argomenti deboli',
        bgClass: 'bg-orange-50 dark:bg-orange-900/10',
        borderClass: 'border-orange-200 dark:border-orange-800',
        labelClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
        topics: fase2,
      },
      {
        phase: 3,
        label: 'Da consolidare',
        bgClass: 'bg-yellow-50 dark:bg-yellow-900/10',
        borderClass: 'border-yellow-200 dark:border-yellow-800',
        labelClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
        topics: fase3,
      },
      {
        phase: 4,
        label: 'Da rafforzare',
        bgClass: 'bg-lime-50 dark:bg-lime-900/10',
        borderClass: 'border-lime-200 dark:border-lime-800',
        labelClass: 'bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300',
        topics: fase4,
      },
    ];

    return { phases, done: fatto };
  }, [data.ratings]);

  const chipClassFor = (topic: Topic) => {
    const section = TOPIC_SECTION_MAP[topic.id];
    return section?.colors.chip ?? 'bg-gray-100 border border-gray-200 text-gray-700';
  };

  const totalWeak = phases[0].topics.length + phases[1].topics.length;
  const totalMed = phases[2].topics.length;
  const totalGood = phases[3].topics.length;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Piano di studio</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Generato automaticamente dalla tua ultima valutazione.
      </p>

      {/* Reassessment nudge */}
      {reassessmentDue && (
        <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-3">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            Piano basato su dati vecchi. Rivaluta le tue competenze per aggiornarlo.
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="flex-shrink-0 text-xs px-2.5 py-1 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            Rivaluta
          </button>
        </div>
      )}

      {/* Quick stats */}
      <div className="flex gap-3 flex-wrap mb-6">
        {[
          { label: 'Da studiare', count: totalWeak, cls: 'text-red-600 dark:text-red-400' },
          { label: 'Da consolidare', count: totalMed, cls: 'text-yellow-600 dark:text-yellow-400' },
          { label: 'Da rafforzare', count: totalGood, cls: 'text-lime-600 dark:text-lime-400' },
          { label: 'Completati', count: done.length, cls: 'text-green-600 dark:text-green-400' },
        ].map(({ label, count, cls }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-center min-w-[5rem]"
          >
            <p className={`text-xl font-bold ${cls}`}>{count}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {phases.map((p) => (
          <PhaseCard
            key={p.phase}
            {...p}
            ratings={data.ratings}
            chipClass={chipClassFor}
          />
        ))}

        {/* Fatto */}
        {done.length > 0 && (
          <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Fatto
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Argomenti solidi
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({done.length})</span>
            </div>
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {done.map((topic) => {
                const section = SECTIONS.find((s) => s.id === topic.sectionId);
                return (
                  <span
                    key={topic.id}
                    className={`text-xs px-3 py-1 rounded-full ${section?.colors.chip ?? ''}`}
                  >
                    {topic.label} {data.ratings[topic.id]}★
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
