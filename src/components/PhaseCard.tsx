import { useState } from 'react';
import type { Topic } from '../courses/maths/data/topics';

interface PhaseCardProps {
  phase: number;
  label: string;
  bgClass: string;
  borderClass: string;
  labelClass: string;
  topics: Topic[];
  ratings: Record<string, number>;
  chipClass: (topic: Topic) => string;
}

export function PhaseCard({
  phase,
  label,
  bgClass,
  borderClass,
  labelClass,
  topics,
  ratings,
  chipClass,
}: PhaseCardProps) {
  const [open, setOpen] = useState(true);

  if (topics.length === 0) return null;

  return (
    <div className={`rounded-xl border ${borderClass} ${bgClass} overflow-hidden`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${labelClass}`}>
            Fase {phase}
          </span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">({topics.length})</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {topics.map((topic) => {
            const r = ratings[topic.id] ?? 0;
            return (
              <span
                key={topic.id}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${chipClass(topic)}`}
              >
                {topic.label}
                <span className="opacity-60">{r > 0 ? `${r}★` : '—'}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
