interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ percentage, size = 128, strokeWidth = 10 }: ProgressRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          className="dark:stroke-gray-700"
        />
        {/* fill */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute text-center select-none">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {Math.round(percentage)}%
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">solidi</p>
      </div>
    </div>
  );
}
