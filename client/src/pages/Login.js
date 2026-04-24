import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaSeedling, FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://backend:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/weather");
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
      >
        <div className="auth-header">
          <FaSeedling className="auth-logo" />
          <h2>Welcome Back</h2>
          <p>Login to continue smart farming</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="auth-btn"
          >
            Login
          </motion.button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create account</Link>
        </p>
      </motion.div>

      {/* STYLES */}
      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #10b981, #34d399);
        }

        .auth-card {
          background: white;
          padding: 3rem;
          border-radius: 24px;
          width: 380px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-logo {
          font-size: 3rem;
          color: #10b981;
        }

        .auth-header h2 {
          margin-top: 0.5rem;
          color: #1e293b;
        }

        .auth-header p {
          color: #64748b;
          font-size: 0.9rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .input-group input {
          border: none;
          outline: none;
          width: 100%;
        }

        .auth-btn {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          padding: 0.75rem;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .auth-switch {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.9rem;
        }

        .auth-switch a {
          color: #10b981;
          font-weight: 600;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Login;
