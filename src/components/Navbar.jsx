import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User, LogOut, PlayCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">
            <motion.div whileHover={{ scale: 1.05 }} className="logo-box">
              <PlayCircle color="var(--primary)" size={32} />
              <span>MOVIE<span>WEB</span></span>
            </motion.div>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/series">Series</Link>
          </div>
        </div>

        <div className="nav-right">
          <div className="search-bar glass">
            <Search size={18} color="var(--muted)" />
            <input type="text" placeholder="Search movies..." />
          </div>
          
          {user ? (
            <div className="user-profile">
              <span className="user-name">{user.name || user.email.split('@')[0]}</span>
              <button onClick={handleLogout} className="logout-btn glass">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link btn-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 1000;
          display: flex;
          align-items: center;
          padding: 0 40px;
        }
        .nav-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .logo span span {
          color: var(--primary);
        }
        .nav-links {
          display: flex;
          gap: 30px;
        }
        .nav-links a {
          color: var(--muted);
          font-weight: 500;
          transition: 0.3s;
          font-size: 15px;
        }
        .nav-links a:hover, .nav-links a[data-active="true"] {
          color: var(--foreground);
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 99px;
          width: 300px;
        }
        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 14px;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--foreground);
        }
        .logout-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: 0.3s;
        }
        .logout-btn:hover {
          background: rgba(229, 9, 20, 0.1);
          color: var(--primary);
        }
        .login-link {
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 99px;
          color: white;
        }
        .logo-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
