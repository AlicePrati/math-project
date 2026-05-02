import type { Section } from '../data/topics';

interface SectionCardProps {
  section: Section;
  ratings: Record<string, number>;
  onClick: () => void;
}

export function SectionCard({ section, ratings, onClick }: SectionCardProps) {
  const topicRatings = section.topics.map((t) => ratings[t.id] ?? 0);
  const rated = topicRatings.filter((r) => r > 0);
  const avg = rated.length > 0 ? rated.reduce((a, b) => a + b, 0) / rated.length : 0;
  const critical = topicRatings.filter((r) => r > 0 && r <= 2).length;
  const pct = (avg / 5) * 100;

  return (
    <button
      onClick={onClick}
      className={[
        'bg-white dark:bg-gray-800 rounded-xl text-left',
        'border border-gray-200 dark:border-gray-700 border-l-4',
        section.colors.border,
        'p-4 hover:shadow-md transition-shadow w-full',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug">
          {section.label}
        </h3>
        {critical > 0 && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${section.colors.badge}`}>
            {critical} critici
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${section.colors.bar}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right tabular-nums">
          {avg > 0 ? avg.toFixed(1) : '—'}★
        </span>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
        {rated.length}/{section.topics.length} valutati
      </p>
    </button>
  );
}
