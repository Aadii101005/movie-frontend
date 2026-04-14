import { motion } from 'framer-motion';
import { Play, Star, Calendar, Clock } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="movie-card glass"
    >
      <div className="image-container">
        <img src={movie.image || `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
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
            <span>{movie.rating || movie.vote_average?.toFixed(1) || 'N/A'}</span>
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
      `}</style>
    </motion.div>
  );
};

export default MovieCard;
