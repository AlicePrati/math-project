import type { Section } from '../data/topics';

const STAR_COLOR: Record<number, string> = {
  1: 'text-red-400',
  2: 'text-orange-400',
  3: 'text-yellow-400',
  4: 'text-lime-400',
  5: 'text-green-400',
};

interface SectionCardProps {
  section: Section;
  rating: number;
  onTest: () => void;
}

export function SectionCard({ section, rating, onTest }: SectionCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 border-l-4 ${section.colors.border} flex items-center gap-3 px-4 py-3`}
    >
      <span className="flex-1 text-sm font-semibold text-gray-800 leading-snug">
        {section.label}
      </span>

      <span
        className={`text-base tracking-wider flex-shrink-0 ${rating > 0 ? STAR_COLOR[rating] : 'text-gray-300'}`}
      >
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </span>

      <button
        onClick={onTest}
        className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white transition-colors"
      >
        Take the quiz →
      </button>
    </div>
  );
}
