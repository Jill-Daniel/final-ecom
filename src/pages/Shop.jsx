// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { FaSearch } from "react-icons/fa";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    "Women",
    "Men",
    "Kids",
    "Shoes",
    "Electronics",
    "Kitchen",
    "Bedding",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === "All" || product.category === filter;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <section className="shop-section">
      {/* Header */}
      <div className="shop-header">
        <h1>🛍️ Shop Our Collection</h1>
        <p>Discover the latest trends and timeless essentials.</p>
      </div>

      {/* Filters + Search */}
      <div className="shop-controls">
        <div className="filter-buttons">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon1" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="loading">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="no-products">No products found. Try another search 🔍</p>
      ) : (
        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="shop-card">
              <div className="shop-img-container">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="shop-img"
                />
              </div>
              <div className="shop-card-content">
                <h3>{product.name}</h3>
                <p className="shop-description">{product.description}</p>
                <p className="shop-price">
                  Ksh {Number(product.price).toLocaleString()}
                </p>
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
