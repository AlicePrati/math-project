import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SECTIONS } from '../data/topics';
import { useTracker, isReassessmentDue } from '../store/useTracker';
import { TopicRow } from '../components/TopicRow';

type Filter = 'tutti' | 'critici' | 'medi' | 'solidi';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'tutti', label: 'All' },
  { id: 'critici', label: 'Weak ≤2★' },
  { id: 'medi', label: 'Average 3★' },
  { id: 'solidi', label: 'Strong ≥4★' },
];

function matchesFilter(rating: number, filter: Filter): boolean {
  if (filter === 'tutti') return true;
  if (filter === 'critici') return rating > 0 && rating <= 2;
  if (filter === 'medi') return rating === 3;
  if (filter === 'solidi') return rating >= 4;
  return true;
}

function getLastTs(
  topicId: string,
  history: { topicId: string; ts: string }[],
): string | undefined {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].topicId === topicId) return history[i].ts;
  }
  return undefined;
}

export default function Tracker() {
  const { data } = useTracker();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [filter, setFilter] = useState<Filter>('tutti');
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const targetSection = params.get('section');
  const reassessmentDue = isReassessmentDue(data);

  useEffect(() => {
    if (targetSection) {
      setCollapsed((prev) => ({ ...prev, [targetSection]: false }));
      setTimeout(() => {
        sectionRefs.current[targetSection]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 80);
    }
  }, [targetSection]);

  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const q = search.toLowerCase().trim();

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Topics</h1>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="text-xs text-gray-400 dark:text-gray-500">Read only</span>
        </div>
      </div>

      {/* Reassessment nudge banner */}
      {reassessmentDue && (
        <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-3">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            A reassessment is available. Update your ratings!
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="flex-shrink-0 text-xs px-2.5 py-1 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            Reassess
          </button>
        </div>
      )}

      {/* Read-only notice */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Stars are assigned by the app based on your quiz results.
          To update your ratings, take the{' '}
          <button
            onClick={() => navigate('/assessment')}
            className="underline text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
          >
            reassessment quiz
          </button>.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search topic…"
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={[
              'flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors',
              filter === id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const assessedTopics = section.topics.filter((t) => (data.ratings[t.id] ?? 0) > 0);
          if (assessedTopics.length === 0) return null;

          const sectionTopics = assessedTopics.filter((topic) => {
            const r = data.ratings[topic.id] ?? 0;
            if (!matchesFilter(r, filter)) return false;
            if (q && !topic.label.toLowerCase().includes(q)) return false;
            return true;
          });

          if (sectionTopics.length === 0 && (filter !== 'tutti' || q)) return null;

          const isCollapsed = collapsed[section.id] ?? false;
          const displayTopics = filter !== 'tutti' || q ? sectionTopics : assessedTopics;

          return (
            <div
              key={section.id}
              ref={(el) => { sectionRefs.current[section.id] = el; }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className={`flex items-center border-l-4 ${section.colors.border}`}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex-1 flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="flex-1 font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {section.label}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {section.topics.filter((t) => (data.ratings[t.id] ?? 0) >= 4).length}/
                    {section.topics.length} strong
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate(`/topic/${section.id}`)}
                  title="View study plan"
                  className="flex-shrink-0 text-xs px-2.5 py-1 mr-3 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 font-medium"
                >
                  Plan
                </button>
              </div>

              {!isCollapsed && (
                <div className="divide-y divide-gray-50 dark:divide-gray-700/50 px-2 pb-2">
                  {displayTopics.map((topic) => {
                    const r = data.ratings[topic.id] ?? 0;
                    if (!matchesFilter(r, filter)) return null;
                    if (q && !topic.label.toLowerCase().includes(q)) return null;
                    return (
                      <TopicRow
                        key={topic.id}
                        topic={topic}
                        rating={r}
                        lastTs={getLastTs(topic.id, data.history)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
