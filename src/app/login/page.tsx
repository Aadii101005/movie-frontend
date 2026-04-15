import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authApi";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;
      if (!user) {
        throw new Error("Login did not return user data.");
      }
      localStorage.setItem("token", token);
      login(user);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page hero-gradient">
      <Navbar />
      <div className="auth-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="auth-card glass"
        >
          <div className="auth-header">
            <h2>Welcome Back</h2>
           {/* <p>Access your curated movie collection</p> */}
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <label><Mail size={16} /> Email Address</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label><Lock size={16} /> Password</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                />
              </div>
            </div>

            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-msg">{error}</motion.p>}

            <button type="submit" disabled={loading} className="auth-btn btn-primary">
              {loading ? "Authenticating..." : <>Sign In <LogIn size={18} /></>}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register"> Create Account<ArrowRight size={14} /></Link>
          </p>
        </motion.div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .auth-container {
          width: 100%;
          max-width: 440px;
          margin-top: 80px;
        }
        .auth-card {
          padding: 40px;
          border-radius: 24px;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .auth-header h2 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .auth-header p {
          color: var(--muted);
          font-size: 15px;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
        }
        .input-wrapper {
          position: relative;
        }
        .input-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 12px 16px;
          border-radius: 12px;
          color: white;
          font-family: inherit;
          transition: 0.3s;
        }
        .input-wrapper input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.08);
        }
        .error-msg {
          color: #ef4444;
          font-size: 13px;
          text-align: center;
        }
        .auth-btn {
          margin-top: 10px;
          padding: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 16px;
        }
        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: var(--muted);
        }
        .auth-footer a {
          color: var(--primary);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}