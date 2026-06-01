import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TOPIC_MAP, PRESEED_RATINGS } from '../data/topics';
import { useTracker } from '../store/useTracker';
import type { RatingChange } from '../store/useTracker';

function getISOWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function formatWeekLabel(isoWeek: string): string {
  const [year, weekPart] = isoWeek.split('-W');
  const w = parseInt(weekPart, 10);
  // Get Monday of that ISO week
  const jan4 = new Date(parseInt(year), 0, 4);
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7) + (w - 1) * 7);
  return monday.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
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

function buildChartData(history: RatingChange[]) {
  if (history.length === 0) return [];

  // Running state starting from preseed
  const state: Record<string, number> = { ...PRESEED_RATINGS };
  const weekMap = new Map<string, number>();

  const sorted = [...history].sort((a, b) => a.ts.localeCompare(b.ts));

  for (const event of sorted) {
    state[event.topicId] = event.to;
    const rated = Object.values(state).filter((r) => r > 0);
    const avg = rated.length > 0 ? rated.reduce((a, b) => a + b, 0) / rated.length : 0;
    const week = getISOWeek(new Date(event.ts));
    weekMap.set(week, avg);
  }

  return Array.from(weekMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, avg]) => ({ week: formatWeekLabel(week), avg: parseFloat(avg.toFixed(2)) }));
}

export default function History() {
  const { data } = useTracker();

  const chartData = useMemo(() => buildChartData(data.history), [data.history]);

  const sortedHistory = [...data.history].sort((a, b) => b.ts.localeCompare(a.ts));

  const gridColor = '#F3F4F6';
  const tickColor = '#6B7280';

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">History</h1>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Average rating over time
        </h2>

        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-sm text-gray-400 dark:text-gray-500">
            No changes yet — start rating topics in the Tracker.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: tickColor }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tick={{ fontSize: 11, fill: tickColor }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(v) => [`${v}★`, 'Average']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#E5E7EB',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#111827',
                }}
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#F59E0B"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#F59E0B', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Event list */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Recent changes{' '}
            <span className="font-normal text-gray-400">({data.history.length})</span>
          </h2>
        </div>

        {sortedHistory.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-400 dark:text-gray-500 text-center">
            No changes yet.
          </p>
        ) : (
          <ul className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {sortedHistory.slice(0, 50).map((event, i) => {
              const topic = TOPIC_MAP[event.topicId];
              return (
                <li
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {topic?.label ?? event.topicId}
                    </span>
                    <span className="ml-2 text-gray-400 dark:text-gray-500">
                      {event.from > 0 ? `${event.from}★` : '—'} → {event.to}★
                    </span>
                  </div>
                  <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
                    {relativeTime(event.ts)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
