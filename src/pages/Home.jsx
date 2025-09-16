/**
 * src/pages/Home.jsx
 *
 * World-class Home page for Sheryl Collections
 */

import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Home() {
  const heroSlides = [
    {
      title: "Men's Collection",
      subtitle: "Trendy outfits for every occasion",
      image: "https://ywedaggurnjdmxmddohe.supabase.co/storage/v1/object/sign/photos/mens%20col.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NThlZWZhOC1iNWM4LTQ0NTYtYTMzMy1jODJjYWJhNzk3YzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90b3MvbWVucyBjb2wuanBnIiwiaWF0IjoxNzU4MDIxMDU4LCJleHAiOjE3ODk1NTcwNTh9.nvjwDLH-9ZEkLn5yafjcU2KNvg-MyYq6mdPd-ARhl6Q",
      cta: "Shop Men",
      href: "/shop?cat=Men",
    },
    {
      title: "Women’s Collection",
      subtitle: "New arrivals — stylish & elegant",
      image: "https://ywedaggurnjdmxmddohe.supabase.co/storage/v1/object/sign/photos/ladies%20col.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NThlZWZhOC1iNWM4LTQ0NTYtYTMzMy1jODJjYWJhNzk3YzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90b3MvbGFkaWVzIGNvbC5qcGciLCJpYXQiOjE3NTgwMjEyMzcsImV4cCI6MTc4OTU1NzIzN30.2i78Y-QKZjcLVuRDuCck0gelQNO1Hg-GyrQfqpB3Ujw",
      cta: "Shop Women",
      href: "/shop?cat=Women",
    },
    {
      title: "Electronics & Gadgets",
      subtitle: "Latest tech at unbeatable prices",
        image: "https://ywedaggurnjdmxmddohe.supabase.co/storage/v1/object/sign/photos/electro.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NThlZWZhOC1iNWM4LTQ0NTYtYTMzMy1jODJjYWJhNzk3YzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90b3MvZWxlY3Ryby5qcGciLCJpYXQiOjE3NTgwMjEyODMsImV4cCI6MTc4OTU1NzI4M30.AtceJIxe9LGr6dUg68PF9q_EbdYMcvFw6KTIUC4a4dI",
      cta: "Shop Electronics",
      href: "/shop?cat=Electronics",
    },
  ];

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero-large">
        <div className="hero-left">
          <h1 className="brand-title">Sheryl Collections</h1>
          <p className="brand-subtitle">
            Trendy apparel and accessories for Women, Men, Kids, and Expectant Mothers also accessories and electronics.
            Explore quality products and enjoy fast delivery.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn primary glow">
              Shop Now
            </Link>
            <Link to="/shop" className="btn outline">
              Browse Categories
            </Link>
          </div>
        </div>
        <div className="hero-right">
          <Carousel items={heroSlides} />
        </div>
      </section>

      {/* Linked Sections */}
      <section className="collections-grid">
        <Link to="/shop" className="collection-card">
          <img
            src="https://ywedaggurnjdmxmddohe.supabase.co/storage/v1/object/sign/photos/featured.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NThlZWZhOC1iNWM4LTQ0NTYtYTMzMy1jODJjYWJhNzk3YzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90b3MvZmVhdHVyZWQuanBnIiwiaWF0IjoxNzU4MDIxNDg1LCJleHAiOjE3ODk1NTc0ODV9.-Z2t1PEM8srn4s2FFPm8f8uXyhaXJfwCG-jl7POa48o"
            alt="Featured"
          />
          <div className="overlay">
            <h2>Featured Products</h2>
            <span className="btn secondary">View All</span>
          </div>
        </Link>

        <Link to="/shop" className="collection-card">
          <img
          src="https://ywedaggurnjdmxmddohe.supabase.co/storage/v1/object/sign/photos/best%20sale.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NThlZWZhOC1iNWM4LTQ0NTYtYTMzMy1jODJjYWJhNzk3YzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90b3MvYmVzdCBzYWxlLmpwZyIsImlhdCI6MTc1ODAyMTQ1NSwiZXhwIjoxNzg5NTU3NDU1fQ.CGwTAmr1MXMEyKlHC7sG_83cAXvKhrIJYY_X_xwTH2M"
           alt="Best Sellers"
          />
          <div className="overlay">
            <h2>Best Sellers</h2>
            <span className="btn secondary">View All</span>
          </div>
        </Link>

        <Link to="/shop" className="collection-card">
          <img
           src="https://ywedaggurnjdmxmddohe.supabase.co/storage/v1/object/sign/photos/trend.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NThlZWZhOC1iNWM4LTQ0NTYtYTMzMy1jODJjYWJhNzk3YzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90b3MvdHJlbmQuanBnIiwiaWF0IjoxNzU4MDIxNDI1LCJleHAiOjE3ODk1NTc0MjV9.8dMuNrZI5S3IPYPZGIXpOynt8wf5L40JbjHPGWlKZgQ"
          alt="Trending Now"
          />
          <div className="overlay">
            <h2>Trending Now</h2>
            <span className="btn secondary">View All</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
