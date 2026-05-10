import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { SECTION_MAP } from '../data/topics';
import { useTracker } from '../store/useTracker';
import { getStudyPlanForSection, hasSectionPlan } from '../data/studyPlans';

const PRIORITY_BADGE: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  low: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const PRIORITY_LABEL: Record<string, string> = {
  critical: 'Priorità critica',
  high: 'Priorità alta',
  medium: 'Priorità media',
  low: 'Bassa priorità',
};

function Stars({ rating }: { rating: number }) {
  const COLORS: Record<number, string> = {
    1: 'text-red-400', 2: 'text-orange-400', 3: 'text-yellow-400', 4: 'text-lime-400', 5: 'text-green-400',
  };
  return (
    <span className={`text-xl tracking-wider ${COLORS[rating] ?? 'text-gray-400'}`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

function Section({ title, items, color }: { title: string; items: string[]; color: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className={`text-xs font-semibold uppercase tracking-wide mb-2 ${color}`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="flex-shrink-0 mt-1 text-gray-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TopicStudyPlan() {
  const { topicId: sectionId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { data } = useTracker();

  const [searchParams] = useSearchParams();

  const section = sectionId ? SECTION_MAP[sectionId] : undefined;

  // Section rating = the rating assigned to any topic in the section (all share the same value after quiz)
  const sectionRating = section
    ? section.topics.map((t) => data.ratings[t.id] ?? 0).find((r) => r > 0) ?? 0
    : 0;

  const queryRating = Number(searchParams.get('rating'));
  const displayRating = (queryRating >= 1 && queryRating <= 5 ? queryRating : sectionRating > 0 ? sectionRating : 1) as 1|2|3|4|5;
  const plan = sectionId ? getStudyPlanForSection(sectionId, displayRating) : undefined;
  const hasAnyPlan = sectionId ? hasSectionPlan(sectionId) : false;

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Argomento non trovato.</p>
          <button onClick={() => navigate('/tracker')} className="text-amber-500 hover:text-amber-400 font-medium">
            ← Torna al Tracker
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{section.label}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Piano di studio</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Rating card */}
        <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 border-l-4 p-5 ${section.colors.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                {sectionRating > 0 ? 'Livello attuale' : 'Non ancora valutato'}
              </p>
              <Stars rating={displayRating} />
              {plan && (
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{plan.label}</p>
              )}
            </div>
            {plan && (
              <div className="text-right">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${PRIORITY_BADGE[plan.priority]}`}>
                  {PRIORITY_LABEL[plan.priority]}
                </span>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">{plan.timeEstimate}</p>
              </div>
            )}
          </div>
        </div>

        {!hasAnyPlan && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-300">
            Piano di studio non ancora disponibile per questo argomento.
          </div>
        )}

        {plan && (
          <>
            {/* Cosa devi capire */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400 mb-2">
                Cosa devi capire
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{plan.whatYouNeed}</p>
            </div>

            {/* Approccio */}
            {plan.approach.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-500 dark:text-amber-400 mb-3">
                  Come procedere — passo dopo passo
                </h3>
                <ol className="space-y-3">
                  {plan.approach.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Concetti chiave + Errori comuni */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {plan.keyPoints.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                  <Section
                    title="Concetti chiave"
                    items={plan.keyPoints}
                    color="text-green-600 dark:text-green-400"
                  />
                </div>
              )}
              {plan.commonMistakes.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                  <Section
                    title="Errori comuni"
                    items={plan.commonMistakes}
                    color="text-red-500 dark:text-red-400"
                  />
                </div>
              )}
            </div>

            {/* Esercizi */}
            {plan.exercises.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <Section
                  title="Esercizi suggeriti"
                  items={plan.exercises}
                  color="text-purple-600 dark:text-purple-400"
                />
              </div>
            )}

            {/* Prossimo passo */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-2">
                Prossimo passo
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">{plan.nextStep}</p>
            </div>
          </>
        )}

        {/* Rating selector */}
        {hasAnyPlan && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              Visualizza il piano per un altro livello:
            </p>
            <div className="flex gap-2">
              {([1, 2, 3, 4, 5] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => navigate(`/topic/${sectionId}?rating=${r}`)}
                  className={[
                    'flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors border',
                    r === displayRating
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-amber-300',
                  ].join(' ')}
                >
                  {r}★
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
