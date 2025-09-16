// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Get current user on mount
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user || null);
      setLoading(false);
    };
    getUser();

    // ✅ Listen for auth state changes (login/logout/register)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
