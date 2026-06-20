import { useNavigate } from 'react-router-dom';
import { SECTIONS } from '../data/topics';
import { useTracker } from '../store/useTracker';
import { hasSectionPlan } from '../data/studyPlans';

const STAR_COLOR: Record<number, string> = {
  1: 'text-red-400', 2: 'text-orange-400', 3: 'text-yellow-400',
  4: 'text-lime-400', 5: 'text-green-400',
};

function StarRow({ rating }: { rating: number }) {
  if (rating === 0) {
    return <span className="text-gray-300 dark:text-gray-600 text-sm tracking-wider">☆☆☆☆☆</span>;
  }
  return (
    <span className={`text-sm tracking-wider ${STAR_COLOR[rating] ?? 'text-amber-400'}`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function Plan() {
  const { data } = useTracker();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Study Plan</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Select a section to view its study plan.
      </p>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const sectionRating = section.topics
            .map((t) => data.ratings[t.id] ?? 0)
            .find((r) => r > 0) ?? 0;
          const hasPlans = hasSectionPlan(section.id);

          return (
            <div
              key={section.id}
              className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 ${section.colors.border} flex items-center gap-3 px-4 py-3`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {section.label}
                </p>
                <div className="mt-0.5">
                  <StarRow rating={sectionRating} />
                </div>
              </div>

              <button
                onClick={() => hasPlans && navigate(`/topic/${section.id}`)}
                disabled={!hasPlans}
                className={[
                  'flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors',
                  hasPlans
                    ? 'bg-amber-500 hover:bg-amber-400 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed',
                ].join(' ')}
              >
                {hasPlans ? 'View plan →' : 'Soon'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
