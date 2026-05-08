import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, MoreVertical, Pencil, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MediaFormModal from './MediaFormModal';

const MovieCard = ({ movie, type = 'movie' }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen(false);
    if (!window.confirm(`Are you sure you want to delete ${movie.title}?`)) return;

    setIsDeleting(true);
    const endpoint = type === 'movie' ? '/protected/movies' : '/protected/series';
    try {
      const response = await fetch(`http://localhost:5000/api${endpoint}/${movie.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // if applicable
        }
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to delete', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen(false);
    setIsEditModalOpen(true);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCardClick = () => {
    if (!isMenuOpen) {
      navigate(`/${type === 'movie' ? 'movies' : 'series'}/${movie.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="movie-card glass"
      onClick={handleCardClick}
    >
      <div className="image-container">
        <img src={movie.poster || movie.poster_path ? (movie.poster?.startsWith('http') ? movie.poster : `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.poster}`) : 'https://via.placeholder.com/500x750?text=No+Image'} alt={movie.title} />

        {movie.id && (
          <div className="menu-container" ref={menuRef}>
            <button onClick={toggleMenu} className="three-dots-btn" title="Options">
              <MoreVertical size={20} />
            </button>
            {isMenuOpen && (
              <div className="dropdown-menu">
                <button onClick={handleEdit} className="dropdown-item">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={handleDelete} disabled={isDeleting} className="dropdown-item delete-item">
                  <Trash size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
        <div className="overlay">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="play-btn"
          >
            <Play fill="white" size={24} />
          </motion.button>
        </div>
      </div>

      <div className="card-info">
        <div className="top-row">
          <span className="year">{movie.year || movie.release_date?.split('-')[0]}</span>
          <div className="rating">
            <Star color="#fbbf24" fill="#fbbf24" size={14} />
            <span>{movie.rating?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
        <h3 className="title">{movie.title}</h3>
        <p className="description">{movie.description || movie.overview?.slice(0, 80) + '...'}</p>
      </div>

      <style jsx>{`
        .movie-card {
          border-radius: 16px;
          overflow: hidden;
          transition: 0.3s;
          cursor: pointer;
          height: 100%;
        }
        .image-container {
          position: relative;
          aspect-ratio: 2/3;
          overflow: hidden;
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s;
        }
        .movie-card:hover .image-container img {
          transform: scale(1.1);
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .movie-card:hover .overlay {
          opacity: 1;
        }
        .play-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(229, 9, 20, 0.4);
        }
        .card-info {
          padding: 16px;
        }
        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .year {
          font-size: 13px;
          color: var(--muted);
          font-weight: 500;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
        }
        .title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .description {
          font-size: 13px;
          color: var(--muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
        }
        .menu-container {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 20;
        }
        .three-dots-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: black; /* Black dots */
          background: rgba(255, 255, 255, 0.9); /* White background */
          box-shadow: 0 2px 8px rgba(0,0,0,0.6);
          transition: 0.3s;
        }
        .three-dots-btn:hover {
          transform: scale(1.1);
          background: white;
        }
        .dropdown-menu {
          position: absolute;
          top: 40px;
          right: 0;
          background: var(--card, #1a1a1a);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.8);
          min-width: 120px;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
          font-size: 14px;
          border-radius: 4px;
          transition: 0.2s;
        }
        .dropdown-item:hover {
          background: rgba(255,255,255,0.1);
        }
        .delete-item:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
      `}</style>

      {isEditModalOpen && (
        <MediaFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={{ ...movie, type }}
          onSuccess={() => window.location.reload()}
        />
      )}
    </motion.div>
  );
};

export default MovieCard;
