import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext } from './store/useTheme';
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

function AppShell() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Nav />
      <main className="md:ml-56 pb-20 md:pb-0 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/history" element={<History />} />
          <Route path="/topic/:topicId" element={<TopicStudyPlan />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
