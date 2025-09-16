// src/pages/Contact.jsx
import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaQuestionCircle,
  FaTruck,
  FaUndo,
  FaCreditCard,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <main className="jumia-contact">
      {/* HERO */}
      <section className="contact-header">
        <h1>Help Center</h1>
        <p>Welcome to Sheryl Collections Support – How can we assist you?</p>
      </section>

      {/* QUICK HELP TOPICS */}
      <section className="help-topics">
        <h2>Popular Topics</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <FaTruck className="icon" />
            <h3>Track Your Order</h3>
            <p>Check the status of your deliveries easily.</p>
          </div>
          <div className="topic-card">
            <FaUndo className="icon" />
            <h3>Returns & Refunds</h3>
            <p>Learn about our 7-day return and refund process.</p>
          </div>
          <div className="topic-card">
            <FaCreditCard className="icon" />
            <h3>Payment Methods</h3>
            <p>Securely pay with Mpesa, Cards, or Cash on Delivery.</p>
          </div>
          <div className="topic-card">
            <FaQuestionCircle className="icon" />
            <h3>FAQs</h3>
            <p>Find quick answers to common questions.</p>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="contact-options">
        <h2>Contact Us</h2>
        <div className="options-grid">
          <div className="option-card">
            <FaPhone className="option-icon" />
            <h4>Call Us</h4>
            <p>Mon - Fri, 9AM - 6PM</p>
            <strong>+254793811786</strong>
          </div>
          <div className="option-card">
            <FaWhatsapp className="option-icon" />
            <h4>WhatsApp</h4>
            <p>Chat with us instantly</p>
            <a
              href="https://wa.me/254793811786"
              target="_blank"
              rel="noreferrer"
            >
              0793 811 786
            </a>
          </div>
          <div className="option-card">
            <FaEnvelope className="option-icon" />
            <h4>Email Support</h4>
            <p>24/7 assistance</p>
            <a href="mailto:support@sherylcollections.co.ke">
              support@sherylcollections.co.ke
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <h2>Send us a Message</h2>
        {!submitted ? (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        ) : (
          <div className="thank-you">
            <h3>Thank you!</h3>
            <p>We’ll get back to you shortly.</p>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How can I place an order?</h3>
          <p>Browse products, add to cart, and checkout in a few steps.</p>
        </div>
        <div className="faq-item">
          <h3>Do you offer returns?</h3>
          <p>Yes, our 7-day return policy applies to most items.</p>
        </div>
        <div className="faq-item">
          <h3>Can I track my order?</h3>
          <p>Yes! You’ll receive a tracking link after checkout.</p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
