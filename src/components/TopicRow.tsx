import type { Topic } from '../courses/maths/data/topics';
import { StarRating } from './StarRating';

interface TopicRowProps {
  topic: Topic;
  rating: number;
  lastTs?: string;
}

function relativeTime(isoTs: string): string {
  const diff = Date.now() - new Date(isoTs).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function TopicRow({ topic, rating, lastTs }: TopicRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
      <div className="flex-1 min-w-0">
        <span className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
          {topic.label}
        </span>
        {lastTs && (
          <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {relativeTime(lastTs)}
          </span>
        )}
      </div>
      <StarRating rating={rating} size="sm" readonly />
    </div>
  );
}
