import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authApi";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Try a different email.");
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
            <h2>Join the Club</h2>
            <p>Start your cinematic journey today</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="input-group">
              <label><User size={16} /> Full Name</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
              {loading ? "Creating Account..." : <>Get Started <UserPlus size={18} /></>}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in here <ArrowRight size={14} /></Link>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
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
