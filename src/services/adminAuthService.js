// src/services/adminAuthService.js
import { supabase } from "./supabaseClient";

export const adminAuthService = {
  async login({ email, password }) {
    try {
      // Fetch admin from Supabase
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .eq("password", password) // match plain text for testing
        .single();

      if (error || !data) throw new Error("Invalid credentials");

      // Return admin payload
      return { user: { id: data.id, email: data.email, name: data.full_name, role: data.role } };
    } catch (err) {
      throw err;
    }
  },

  async logout() {
    // Simply remove local storage or handle state in context
    localStorage.removeItem("sc_admin");
  },
};
