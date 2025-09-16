import React, { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { user } = await authService.login({ email, password });

      // IMPORTANT: match the exact email saved in Supabase
      if (user?.email === "jilldaniel1@gmail.com") {
        setSuccess("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/AdminDashboard"), 1200);
      } else {
        setError("⚠️ You are not authorized to access Admin Dashboard.");
        await authService.logout();
      }
    } catch (err) {
      setError("❌ Invalid login credentials. Please try again.");
      console.error("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-logo">
          <span className="logo-circle">A</span>
          <h1>Admin Panel</h1>
        </div>

        <h2>Secure Login</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <input
          type="email"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
