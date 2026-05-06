const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('analisi1_token');
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? 'Errore di rete');
  }
  return res.json() as Promise<T>;
}

// ── Tipi risposta backend ─────────────────────────────────────────────────────

export interface BackendQuestion {
  id: string;
  topic_id: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface BackendProgress {
  onboarding_complete: boolean;
  assessment_count: number;
  last_assessment_date: string | null;
  ratings: Record<string, number>;
  history: Array<{
    topic_id: string;
    from_rating: number;
    to_rating: number;
    timestamp: string;
  }>;
}

// ── API client ────────────────────────────────────────────────────────────────

export const api = {
  auth: {
    register: (email: string, password: string) =>
      request<{ access_token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    login: (email: string, password: string) =>
      request<{ access_token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    me: () => request<{ id: number; email: string }>('/auth/me'),
  },

  questions: {
    byTopic: (topicId: string) =>
      request<BackendQuestion[]>(`/questions/topic/${topicId}`),
    all: () => request<BackendQuestion[]>('/questions'),
  },

  ratings: {
    progress: () => request<BackendProgress>('/ratings/me'),

    completeAssessment: (ratings: Record<string, number>) =>
      request<{ ok: boolean; assessment_count: number }>(
        '/ratings/complete-assessment',
        { method: 'POST', body: JSON.stringify({ ratings }) },
      ),

    reset: () => request<{ ok: boolean }>('/ratings/reset', { method: 'DELETE' }),
  },
};
