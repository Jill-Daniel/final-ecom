import React from "react";

const About = () => {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1>About Sheryl Collections</h1>
        <p>
          At Sheryl Collections, we bring you trendy, affordable, and quality
          products with unmatched customer service. From fashion to lifestyle
          essentials, our mission is to make shopping simple, fun, and reliable.
        </p>
      </section>

      {/* OUR STORY */}
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded with the vision of revolutionizing online shopping in Africa,
          Sheryl Collections has grown into a trusted brand serving thousands of
          happy customers. We started with a small collection of fashion items
          and quickly expanded to electronics, home essentials, and more.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="about-values">
        <div className="value-card">
          <h3>Our Mission</h3>
          <p>
            To empower customers by giving them access to quality and affordable
            products while delivering excellent service every time.
          </p>
        </div>
        <div className="value-card">
          <h3>Our Vision</h3>
          <p>
            To be Africa’s most trusted and customer-centric online shopping
            destination, providing convenience and value to every household.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-why">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div className="why-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
              alt="Affordable Prices"
            />
            <h4>Affordable Prices</h4>
            <p>We bring you the best deals without compromising on quality.</p>
          </div>
          <div className="why-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
              alt="Fast Delivery"
            />
            <h4>Fast Delivery</h4>
            <p>Get your products delivered quickly and safely to your doorstep.</p>
          </div>
          <div className="why-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
              alt="Customer Support"
            />
            <h4>Customer Support</h4>
            <p>24/7 friendly support team to help you with any inquiries.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Join the Sheryl Collections Family</h2>
        <p>
          Shop with us today and enjoy affordable prices, great quality, and
          reliable delivery — all at your convenience.
        </p>
        <a href="/shop" className="btn primary">
          Start Shopping
        </a>
      </section>
    </main>
  );
};

export default About;
