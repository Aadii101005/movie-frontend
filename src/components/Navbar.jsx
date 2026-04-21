import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, LogOut, PlayCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar glass">
      <div className="nav-container">

        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className="logo">
            <motion.div whileHover={{ scale: 1.05 }} className="logo-box">
              <span>M<PlayCircle color="var(--primary)" size={20} />VIEW</span>
            </motion.div>
          </Link>

          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}>Movies</Link>
            <Link to="/series" className={location.pathname === '/series' ? 'active' : ''}>Series</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="search-bar glass">
            <Search size={20} color="var(--muted)" />
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <Search size={20} color="black" />
            </button>
          </form>

          {/* USER SECTION */}
          {user ? (
            <div className="user-profile" ref={dropdownRef}>
              {/* 👤 ACCOUNT ICON - Click to toggle dropdown */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: "35px",
                  borderRadius: "50%",
                  cursor: "pointer"
                }}
              />

              {/* USER NAME */}
              <span className="user-name">
                {user.name || user.email.split('@')[0]}
              </span>

              {/* DROPDOWN MENU */}
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <p className="dropdown-user">
                    {user.name || user.email}
                  </p>
                  <button onClick={handleLogout} className="dropdown-logout">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link btn-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* STYLES */}
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
        }
        .nav-links {
          display: flex;
          gap: 30px;
        }
        .nav-links a {
          color: var(--muted);
          font-weight: 500;
          position: relative;
          transition: 0.3s;
        }
        .nav-links a:hover {
          color: white;
        }
        .nav-links a.active {
          color: white;
        }
        .nav-links a::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: 0.3s;
        }
        .nav-links a.active::after {
          width: 100%;
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
        }
        .user-profile {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-name {
          font-size: 14px;
          font-weight: 600;
        }
        .dropdown-menu {
          position: absolute;
          top: 50px;
          right: 0;
          background: var(--card);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 12px;
          width: 180px;
          box-shadow: var(--shadow);
          z-index: 1001;
        }
        .dropdown-user {
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          color: var(--foreground);
        }
        .dropdown-logout {
          width: 100%;
          padding: 8px 12px;
          border: none;
          background: var(--primary);
          color: white;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        .dropdown-logout:hover {
          background: var(--primary-hover);
        }
        .login-link {
          padding: 10px 24px;
          border-radius: 99px;
          color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;