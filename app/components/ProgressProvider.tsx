'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import type { ProgressEntry } from '@/lib/types';

type ProgressContextValue = {
  isCompleted: (course: string, activity: string) => boolean;
  progress: ProgressEntry[];
  refreshProgress: () => Promise<void>;
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

function progressKey(course: string, activity: string) {
  return `${course}::${activity}`.toLowerCase();
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const accessToken = session?.access_token;
  const [progress, setProgress] = useState<ProgressEntry[]>([]);

  const refreshProgress = useCallback(async () => {
    if (!accessToken) {
      setProgress([]);
      return;
    }

    const response = await fetch('/api/progress', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const body = await response.json();

    if (response.ok) {
      setProgress(body.data || []);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      queueMicrotask(() => {
        setProgress([]);
      });
      return;
    }

    queueMicrotask(() => {
      void refreshProgress();
    });
  }, [accessToken, refreshProgress]);

  const completedKeys = useMemo(() => {
    return new Set(progress.filter((entry) => entry.completed).map((entry) => progressKey(entry.course, entry.activity)));
  }, [progress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      isCompleted: (course, activity) => completedKeys.has(progressKey(course, activity)),
      progress,
      refreshProgress,
    }),
    [completedKeys, progress, refreshProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error('useProgress debe usarse dentro de ProgressProvider');
  }

  return context;
}
