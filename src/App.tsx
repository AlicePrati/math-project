import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/useAuth';
import { Nav } from './components/Nav';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Plan from './pages/Plan';
import History from './pages/History';
import Assessment from './pages/Assessment';
import TopicStudyPlan from './pages/TopicStudyPlan';
import Login from './pages/Login';


function AppShell() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-gray-50">
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

  return (
      <AuthProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AuthProvider>
  );
}
