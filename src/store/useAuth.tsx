import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';

const TRACKER_KEY = 'analisi1_v1';
const TOKEN_KEY = 'analisi1_token';

interface AuthUser { id: number; email: string; }

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Sincronizza i dati del backend nel localStorage usato da useTracker
function syncBackendToStorage(progress: Awaited<ReturnType<typeof api.ratings.progress>>) {
  const existing = (() => {
    try { return JSON.parse(localStorage.getItem(TRACKER_KEY) ?? '{}'); } catch { return {}; }
  })();
  localStorage.setItem(TRACKER_KEY, JSON.stringify({
    ...existing,
    ratings: progress.ratings,
    history: progress.history.map(h => ({
      topicId: h.topic_id,
      from: h.from_rating,
      to: h.to_rating,
      ts: h.timestamp,
    })),
    onboardingComplete: progress.onboarding_complete,
    assessmentCount: progress.assessment_count,
    lastAssessmentDate: progress.last_assessment_date,
  }));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // All'avvio: verifica il token salvato
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setIsLoading(false); return; }

    api.auth.me()
      .then(async (u) => {
        setUser(u);
        const progress = await api.ratings.progress();
        syncBackendToStorage(progress);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    const { access_token } = await api.auth.login(email, password);
    localStorage.setItem(TOKEN_KEY, access_token);
    const u = await api.auth.me();
    setUser(u);
    const progress = await api.ratings.progress();
    syncBackendToStorage(progress);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    setError(null);
    const { access_token } = await api.auth.register(email, password);
    localStorage.setItem(TOKEN_KEY, access_token);
    const u = await api.auth.me();
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TRACKER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve essere usato dentro AuthProvider');
  return ctx;
}
