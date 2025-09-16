// src/hooks/useOrders.js
import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch orders from Supabase
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getOrders();
      setOrders(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, refresh: fetchOrders };
}
