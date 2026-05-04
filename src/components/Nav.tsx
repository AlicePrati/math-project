import { NavLink } from 'react-router-dom';
import { useTheme } from '../store/useTheme';

interface NavItem {
  to: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
    </svg>
  );
}

function TrackerIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6m-6 4h6m-6 4h6m-6 4h4" />
    </svg>
  );
}

function PlanIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function HistoryIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
    </svg>
  );
}

function TestIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: (a) => <HomeIcon active={a} /> },
  { to: '/assessment', label: 'Test', icon: (a) => <TestIcon active={a} /> },
  { to: '/tracker', label: 'Tracker', icon: (a) => <TrackerIcon active={a} /> },
  { to: '/plan', label: 'Piano', icon: (a) => <PlanIcon active={a} /> },
  { to: '/history', label: 'Storico', icon: (a) => <HistoryIcon active={a} /> },
];

function navLinkClass(active: boolean, sidebar: boolean) {
  const base = 'flex items-center gap-3 rounded-lg transition-colors font-medium text-sm';
  const padding = sidebar ? 'px-3 py-2' : '';
  if (active) {
    return `${base} ${padding} bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`;
  }
  return `${base} ${padding} text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100`;
}

export function Nav() {
  const { dark, toggle } = useTheme();

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40">
        <div className="px-4 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">Analisi 1</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500">Competency Tracker</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => navLinkClass(isActive, true)}
            >
              {({ isActive }) => (
                <>
                  {icon(isActive)}
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-4">
          <button
            onClick={toggle}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
            <span>{dark ? 'Tema chiaro' : 'Tema scuro'}</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40">
        <div className="flex items-center justify-around h-16 px-2">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => [
                'flex flex-col items-center gap-0.5 flex-1 py-2 rounded-lg transition-colors',
                isActive
                  ? 'text-amber-500'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
              ].join(' ')}
            >
              {({ isActive }) => (
                <>
                  {icon(isActive)}
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={toggle}
            className="flex flex-col items-center gap-0.5 flex-1 py-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
            <span className="text-[10px] font-medium">{dark ? 'Chiaro' : 'Scuro'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
