import { useNavigate } from 'react-router-dom';
import type { Topic } from '../data/topics';
import { StarRating } from './StarRating';
import { hasPlan } from '../data/studyPlans';

interface TopicRowProps {
  topic: Topic;
  rating: number;
  lastTs?: string;
}

function relativeTime(isoTs: string): string {
  const diff = Date.now() - new Date(isoTs).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'oggi';
  if (days === 1) return 'ieri';
  if (days < 7) return `${days} giorni fa`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} sett. fa`;
  return `${Math.floor(days / 30)} mesi fa`;
}

export function TopicRow({ topic, rating, lastTs }: TopicRowProps) {
  const navigate = useNavigate();
  const canShowPlan = hasPlan(topic.id);

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
      {canShowPlan && (
        <button
          onClick={() => navigate(`/topic/${topic.id}`)}
          title="Vedi piano di studio"
          className="flex-shrink-0 text-xs px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 font-medium"
        >
          Piano
        </button>
      )}
    </div>
  );
}
