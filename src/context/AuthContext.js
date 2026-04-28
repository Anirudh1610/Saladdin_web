import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.expires_at && session.expires_at * 1000 < Date.now()) {
        const { data } = await supabase.auth.refreshSession({ refresh_token: session.refresh_token });
        const fresh = data.session;
        setSession(fresh);
        setUser(fresh?.user ?? null);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = (email, password, name, phone) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, phone } },
    });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
