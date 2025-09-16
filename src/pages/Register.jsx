// src/pages/Register.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="register-page">
      <motion.div
        className="register-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left side - Banner */}
        <div className="register-banner">
          <h1>Join <span>Sheryl Collections</span></h1>
          <p>Be part of the best fashion experience. Create an account to shop, save, and explore exclusive deals tailored for you.</p>
        </div>

        {/* Right side - Form */}
        <motion.div
          className="register-form"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Create Account</h2>
          <form>
            {/* Username */}
            <div className="form-group">
              <User className="input-icon" />
              <input type="text" placeholder="Full Name" required />
            </div>

            {/* Email */}
            <div className="form-group">
              <Mail className="input-icon" />
              <input type="email" placeholder="Email Address" required />
            </div>

            {/* Password */}
            <div className="form-group password-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="form-group password-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>

            {/* Button */}
            <motion.button
              type="submit"
              className="register-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </form>

          {/* Divider */}
          <div className="divider">or sign up with</div>

          {/* Social Logins */}
          <div className="social-buttons">
            <button className="google-btn">Google</button>
            <button className="facebook-btn">Facebook</button>
          </div>

          {/* Already have account */}
          <p className="login-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}


