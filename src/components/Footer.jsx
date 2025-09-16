// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Social Icons */}
        <div className="footer-top">
          <div className="footer-logo">
            <h2>Sheryl<span>Collections</span></h2>
          </div>
          <div className="footer-socials">
            <a href="https://facebook.com/sheryl life" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com/sheryl life" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com/sheryl life" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com/sheryl life" target="_blank" rel="noreferrer"><FaYoutube /></a>
            <a href="https://linkedin.com/sheryl life" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <ul className="footer-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/register">Register</Link></li>
 
          </ul>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sheryl Collections. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
