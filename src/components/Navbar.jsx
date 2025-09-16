import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Update cart count dynamically
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  return (
    <header className="site-header">
      <div className="header-wrapper">
        
        {/* Logo Design */}
        <Link to="/" className="brand-logo">
          <div className="logo-circle">S</div>
          <span className="logo-text">Sheryl</span>
          <span className="logo-highlight">Collections</span>
        </Link>

        {/* Hamburger Icon */}
        <button className="menu-button" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-panel ${menuOpen ? "show" : ""}`}>
          <ul className="nav-list">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/shop" onClick={toggleMenu}>Shop</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
             <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
            <li>
              <Link to="/cart" className="nav-cart" onClick={toggleMenu}>
                <FaShoppingCart size={22} />
                {cartCount > 0 && <span className="cart-indicator">{cartCount}</span>}
              </Link>
            </li>
            <li>
              <Link to="/AdminLogin" className="nav-profile" onClick={toggleMenu}>
                <FaUserCircle size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
