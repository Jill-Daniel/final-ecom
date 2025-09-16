// src/components/ProductCard.jsx
import React from "react";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="product-card">
      {/* Sale Badge */}
      {product.sale && <span className="sale-badge">-{product.sale}%</span>}

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <button
          className="wishlist-btn"
          onClick={() => onAddToWishlist(product)}
        >
          <FaHeart />
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>

        {/* Price */}
        <div className="product-price">
          {product.oldPrice && (
            <span className="old-price">KSh {product.oldPrice}</span>
          )}
          <span className="current-price">KSh {product.price}</span>
        </div>

        {/* Ratings */}
        <div className="product-rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={index < product.rating ? "star filled" : "star"}
            />
          ))}
        </div>
      </div>

      {/* Action */}
      <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart(product)}
      >
        <FaShoppingCart className="cart-icon" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
