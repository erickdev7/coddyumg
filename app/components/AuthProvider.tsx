'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabaseClient';
import type { Profile } from '@/lib/types';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseClient();

  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;

      if (!accessToken) {
        setProfile(null);
        return;
      }

      const response = await fetch('/api/me', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const body = await response.json();
        setProfile(body.data);
      }
    } catch {
      setProfile(null);
    }
  }, [supabase]);

  useEffect(() => {
    let mounted = true;
    const loadingFallback = window.setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 3000);

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      window.clearTimeout(loadingFallback);
      setSession(data.session);
      if (data.session) {
        queueMicrotask(() => {
          void refreshProfile();
        });
      }
      setLoading(false);
    }).catch(() => {
      if (!mounted) return;
      window.clearTimeout(loadingFallback);
      setSession(null);
      setProfile(null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        queueMicrotask(() => {
          void refreshProfile();
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      window.clearTimeout(loadingFallback);
      listener.subscription.unsubscribe();
    };
  }, [refreshProfile, supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      profile,
      loading,
      refreshProfile,
      signOut: async () => {
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
      },
    }),
    [loading, profile, refreshProfile, session, supabase],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
