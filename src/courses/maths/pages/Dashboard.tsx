import { useNavigate } from 'react-router-dom';
import { SECTIONS } from '../data/topics';
import { useTracker, daysUntilReassessment, isReassessmentDue } from '../store/useTracker';
import { ProgressRing } from '../../../components/ProgressRing';
import { SectionCard } from '../../../components/SectionCard';

const STAR_COLORS: Record<number, string> = {
  1: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  2: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  3: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  4: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  5: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

function ReassessmentBanner({ daysLeft, onStart }: { daysLeft: number; onStart: () => void }) {
  const overdue = daysLeft <= 0;

  return (
    <div
      className={[
        'rounded-xl border p-4 mb-6 flex items-start gap-3',
        overdue
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      ].join(' ')}
    >
      <div
        className={[
          'w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5',
          overdue ? 'bg-amber-200 dark:bg-amber-800' : 'bg-blue-200 dark:bg-blue-800',
        ].join(' ')}
      >
        <svg
          className={`w-4 h-4 ${overdue ? 'text-amber-700 dark:text-amber-300' : 'text-blue-700 dark:text-blue-300'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${overdue ? 'text-amber-800 dark:text-amber-200' : 'text-blue-800 dark:text-blue-200'}`}>
          {overdue
            ? 'Reassessment available!'
            : `Next reassessment in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`}
        </p>
        <p className={`text-xs mt-0.5 ${overdue ? 'text-amber-700 dark:text-amber-300' : 'text-blue-700 dark:text-blue-300'}`}>
          {overdue
            ? "See how much you've improved with a fresh set of questions."
            : "Keep studying! Soon you'll be able to reassess your skills to measure your progress."}
        </p>
        {overdue && (
          <button
            onClick={onStart}
            className="mt-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Start reassessment
          </button>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data } = useTracker();
  const navigate = useNavigate();

  const sectionRating = (s: typeof SECTIONS[number]) =>
    s.topics.map((t) => data.ratings[t.id] ?? 0).find((r) => r > 0) ?? 0;

  const ratedSections = SECTIONS.filter((s) => sectionRating(s) > 0);
  const solidCount = ratedSections.filter((s) => sectionRating(s) >= 4).length;
  const pct = SECTIONS.length > 0 ? (solidCount / SECTIONS.length) * 100 : 0;

  const countByStar = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count: ratedSections.filter((s) => sectionRating(s) === star).length,
  }));

  const avgRating =
    ratedSections.length > 0
      ? ratedSections.reduce((sum, s) => sum + sectionRating(s), 0) / ratedSections.length
      : 0;

  const daysLeft = daysUntilReassessment(data);
  const reassessmentDue = isReassessmentDue(data);

  // Show the countdown banner when <= 7 days left or overdue
  const showBanner = daysLeft !== null && daysLeft <= 7;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard</h1>


      {showBanner && (
        <ReassessmentBanner
          daysLeft={daysLeft!}
          onStart={() => navigate('/assessment')}
        />
      )}

      {/* Hero row */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <ProgressRing percentage={pct} size={128} />

        <div className="flex-1 w-full">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {ratedSections.length} / {SECTIONS.length} sections rated
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Overall average:{' '}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {avgRating > 0 ? avgRating.toFixed(2) : '—'}★
            </span>
          </p>

          {/* Star distribution */}
          <div className="flex gap-2 flex-wrap">
            {countByStar.map(({ star, count }) => (
              <div
                key={star}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${STAR_COLORS[star]}`}
              >
                <span>{star}★</span>
                <span className="opacity-70">·</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last assessment info */}
      {data.lastAssessmentDate && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
          Last assessment:{' '}
          {new Date(data.lastAssessmentDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          {data.assessmentCount > 1 && ` · ${data.assessmentCount} assessments total`}
          {!reassessmentDue && daysLeft !== null && daysLeft > 7 && (
            <> · next reassessment in {daysLeft} days</>
          )}
        </p>
      )}

      {/* Section list */}
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Sections
      </h2>
      <div className="space-y-2">
        {SECTIONS.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            rating={sectionRating(section)}
            onTest={() => navigate(`/assessment?section=${section.id}`)}

          />
        ))}
      </div>
    </div>
  );
}
