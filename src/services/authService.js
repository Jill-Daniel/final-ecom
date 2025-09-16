// src/services/authService.js
import { supabase } from "./supabaseClient";

export const authService = {
  async login({ email, password }) {
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      throw new Error("Invalid credentials");
    }

    // ✅ Store the logged-in admin in localStorage
    localStorage.setItem("adminUser", JSON.stringify(data));

    return { user: data };
  },

  async getUser() {
    const user = JSON.parse(localStorage.getItem("adminUser"));
    return user || null;
  },

  async logout() {
    localStorage.removeItem("adminUser");
  }
};
