// src/hooks/useCart.js
import { useEffect, useState } from "react";
import { cartService } from "../services/cartService";

export default function useCart() {
  const [items, setItems] = useState(cartService.get());

  // ✅ Listen for cart updates from anywhere in the app
  useEffect(() => {
    const handler = () => setItems(cartService.get());
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  // ✅ Add item to cart
  const add = (product, qty = 1) => {
    const current = cartService.get();
    const existing = current.find((i) => i.id === product.id);

    if (existing) {
      existing.quantity += qty;
    } else {
      current.push({ ...product, quantity: qty });
    }

    cartService.set(current);
    setItems(current);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Remove item from cart
  const remove = (id) => {
    const current = cartService.get().filter((i) => i.id !== id);
    cartService.set(current);
    setItems(current);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Clear cart
  const clear = () => {
    cartService.clear();
    setItems([]);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return { items, add, remove, clear };
}
