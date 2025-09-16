// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder logic
    if (formData.email && formData.password) {
      setMessage("✅ Login successful!");
    } else {
      setMessage("❌ Please fill in all fields.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1>Welcome Back</h1>
          <p className="tagline">Sign in to continue shopping with us.</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn-login">
              Login
            </button>
            {message && <p className="form-message">{message}</p>}
          </form>
          <div className="login-links">
            <Link to="/register">Don’t have an account? Register</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
        <div className="login-right">
          <div className="overlay">
            <h2>Shop Smart, Shop Fast</h2>
            <p>Exclusive deals and offers await you every day.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
