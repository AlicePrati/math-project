import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/useAuth';
import { CourseProvider, useCourse } from './store/CourseContext';
import { Nav } from './components/Nav';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Plan from './pages/Plan';
import History from './pages/History';
import Assessment from './pages/Assessment';
import TopicStudyPlan from './pages/TopicStudyPlan';
import Exercises from './pages/Exercises';
import Login from './pages/Login';
import CoursePlaceholder from './pages/CoursePlaceholder';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

function CourseRoutes() {
  const { course } = useCourse();

  if (course.id === 'statistics' || course.id === 'networks') {
    return (
      <Routes>
        <Route path="*" element={<CoursePlaceholder />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/assessment" element={<RequireAuth><Assessment /></RequireAuth>} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/history" element={<History />} />
      <Route path="/topic/:topicId" element={<TopicStudyPlan />} />
      <Route path="/esercizi" element={<Exercises />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppShell() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="md:ml-56 pb-20 md:pb-0 min-h-screen">
        <CourseRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CourseProvider>
          <AppShell />
        </CourseProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
