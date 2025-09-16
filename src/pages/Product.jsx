// src/pages/Product.jsx
import React, { useState } from "react";

const Product = () => {
  const [selectedImage, setSelectedImage] = useState("/images/product1.jpg");
  const [quantity, setQuantity] = useState(1);

  const images = [
    "/images/product1.jpg",
    "/images/product2.jpg",
    "/images/product3.jpg",
    "/images/product4.jpg",
  ];

  const relatedProducts = [
    { id: 1, name: "Classic Sneakers", price: "Ksh 2,999", image: "/images/product2.jpg" },
    { id: 2, name: "Leather Handbag", price: "Ksh 4,500", image: "/images/product3.jpg" },
    { id: 3, name: "Smart Watch", price: "Ksh 7,999", image: "/images/product4.jpg" },
  ];

  const handleQuantityChange = (type) => {
    if (type === "inc") setQuantity(quantity + 1);
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="product-page">
      {/* ================= HERO SECTION ================= */}
      <section className="product-hero">
        <div className="hero-content">
          <h1 className="product-title">Premium Designer Jacket</h1>
          <p className="product-subtitle">
            Stylish, durable, and crafted for comfort. Perfect for all seasons.
          </p>
        </div>
      </section>

      {/* ================= PRODUCT GALLERY ================= */}
      <section className="product-gallery">
        <div className="main-image">
          <img src={selectedImage} alt="Main Product" className="zoom-image" />
        </div>
        <div className="thumbnail-row">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* ================= PRODUCT DETAILS ================= */}
      <section className="product-details">
        <h2 className="detail-title">Product Details</h2>
        <p className="detail-description">
          This premium designer jacket combines fashion with function. Featuring
          a sleek modern design, durable fabric, and ultimate comfort, it’s
          perfect for both casual outings and formal gatherings. Available in
          multiple sizes and colors.
        </p>
        <p className="price">Price: <span>Ksh 5,999</span></p>
        <p className="availability">Availability: <span>In Stock</span></p>

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange("dec")}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange("inc")}>+</button>
        </div>

        {/* Buttons */}
        <div className="action-buttons">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="reviews">
        <h3>Customer Reviews</h3>
        <div className="review-card">
          <p><strong>Jane Doe</strong>: Amazing quality, fits perfectly!</p>
        </div>
        <div className="review-card">
          <p><strong>John Smith</strong>: Worth every penny. Stylish and comfortable.</p>
        </div>
        <div className="review-card">
          <p><strong>Amina K.</strong>: Love this jacket! Will order another soon.</p>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      <section className="related-products">
        <h3>Related Products</h3>
        <div className="related-grid">
          {relatedProducts.map((item) => (
            <div key={item.id} className="related-card">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <button className="view-btn">View</button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= EXTRA PLACEHOLDERS ================= */}
      <section className="extra-info">
        <h3>Shipping & Returns</h3>
        <p>We offer free shipping on orders above Ksh 5,000. Returns accepted within 14 days.</p>
      </section>

      <section className="faq">
        <h3>FAQs</h3>
        <p>Q: Is this jacket machine washable?</p>
        <p>A: Yes, wash on a gentle cycle.</p>
      </section>

      {/* ================= LOTS OF PLACEHOLDER SECTIONS ================= */}
      {Array.from({ length: 30 }).map((_, i) => (
        <section key={i} className="placeholder-block">
          <h3>Placeholder Section {i + 1}</h3>
          <p>This block is reserved for future content such as promotions, extra product info, or brand highlights.</p>
        </section>
      ))}
    </div>
  );
};

export default Product;
