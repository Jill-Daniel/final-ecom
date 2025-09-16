import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      setProduct(data || null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <main className="container"><p className="mut">Loading…</p></main>;
  if (!product) return <main className="container"><p className="mut">Product not found.</p></main>;

  return (
    <main className="container detail">
      <img src={product.image_url || product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <div className="price">KES {Number(product.price).toLocaleString()}</div>
        <p className="mut">{product.description}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          <button className="btn primary" onClick={() => addToCart(product, 1)}>Add to Cart</button>
          <a className="btn" href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "0793811786"}?text=${encodeURIComponent("I want to buy " + product.name)}`} target="_blank" rel="noreferrer">Order via WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
