// src/services/productService.js
import { supabase } from "./supabaseClient";

export const productService = {
  async getAll({ limit = 100, offset = 0 } = {}) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async getByFilter(filter = {}) {
    let q = supabase.from("products").select("*").order("created_at", { ascending: false });
    if (filter.category) q = q.eq("category", filter.category);
    if (filter.subcategory) q = q.eq("subcategory", filter.subcategory);
    if (filter.q) q = q.ilike("name", `%${filter.q}%`);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase.from("products").insert([payload]).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase.from("products").update(payload).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
};
