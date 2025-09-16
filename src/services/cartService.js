// src/services/cartService.js
const KEY = "sc_cart";

export const cartService = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  },
  set(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  },
  clear() {
    localStorage.removeItem(KEY);
  }
};
