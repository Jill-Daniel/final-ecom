// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export default function useProducts(filter = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch products from Supabase when filter changes
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getByFilter(filter);
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching products:", err.message);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(filter)]); // re-fetch if filter changes

  return { products, loading, error };
}
