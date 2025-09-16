// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sc_user"));
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Keep localStorage in sync with Supabase Auth session
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile, error: profileErr } = await supabase
            .from("users")
            .select("id, full_name, email, role")
            .eq("id", session.user.id)
            .single();

          if (!profileErr && profile) {
            const payload = {
              id: profile.id,
              email: profile.email,
              name: profile.full_name,
              role: profile.role,
            };
            localStorage.setItem("sc_user", JSON.stringify(payload));
            setUser(payload);
          }
        } else {
          localStorage.removeItem("sc_user");
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Admin login
  const loginAdmin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
      if (authErr) throw authErr;

      // Fetch role from 'users' table
      const { data: profile, error: profileErr } = await supabase
        .from("users")
        .select("id, full_name, email, role")
        .eq("id", data.user.id)
        .single();

      if (profileErr || !profile) {
        setError("Profile not found");
        setLoading(false);
        return false;
      }

      if (profile.role !== "admin") {
        setError("Not an admin user");
        setLoading(false);
        return false;
      }

      const payload = {
        id: profile.id,
        email: profile.email,
        name: profile.full_name,
        role: profile.role,
      };

      localStorage.setItem("sc_user", JSON.stringify(payload));
      setUser(payload);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      return false;
    }
  };

  // Regular user login (optional)
  const loginUser = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
      if (authErr) throw authErr;

      const { data: profile, error: profileErr } = await supabase
        .from("users")
        .select("id, full_name, email, role")
        .eq("id", data.user.id)
        .single();

      if (profileErr || !profile) throw new Error("Profile not found");

      const payload = {
        id: profile.id,
        email: profile.email,
        name: profile.full_name,
        role: profile.role,
      };

      localStorage.setItem("sc_user", JSON.stringify(payload));
      setUser(payload);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("sc_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, loginAdmin, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
