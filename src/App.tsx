import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeContext } from './store/useTheme';
import { useTracker } from './store/useTracker';
import { Nav } from './components/Nav';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Plan from './pages/Plan';
import History from './pages/History';
import Assessment from './pages/Assessment';
import TopicStudyPlan from './pages/TopicStudyPlan';

function getInitialDark(): boolean {
  const stored = localStorage.getItem('analisi1_dark');
  if (stored !== null) return stored === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Redirects to /assessment if onboarding is not complete
function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { data } = useTracker();
  const location = useLocation();

  if (!data.onboardingComplete && location.pathname !== '/assessment') {
    return <Navigate to="/assessment" replace />;
  }
  return <>{children}</>;
}

function AppShell() {
  const { data } = useTracker();
  const location = useLocation();

  const isAssessmentRoute = location.pathname === '/assessment';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hide nav during the assessment wizard */}
      {!isAssessmentRoute && data.onboardingComplete && <Nav />}

      <main className={!isAssessmentRoute && data.onboardingComplete ? 'md:ml-56 pb-20 md:pb-0 min-h-screen' : 'min-h-screen'}>
        <OnboardingGuard>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/history" element={<History />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/topic/:topicId" element={<TopicStudyPlan />} />
          </Routes>
        </OnboardingGuard>
      </main>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('analisi1_dark', String(dark));
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
