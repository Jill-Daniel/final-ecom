// src/services/orderService.js
import { supabase } from "./supabaseClient";

export const orderService = {
  async createOrder({ userId, items = [], total }) {
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert([{ user_id: userId, total_amount: total }])
      .select()
      .single();
    if (orderErr) throw orderErr;

    const payload = items.map((it) => ({
      order_id: order.id,
      product_id: it.id,
      quantity: it.qty || it.quantity,
      price: it.price
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(payload);
    if (itemsErr) throw itemsErr;

    return order;
  },

  async getOrders() {
    const { data, error } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }
};
