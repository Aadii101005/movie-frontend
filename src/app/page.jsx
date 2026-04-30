import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { useFetch } from '../hooks/useFetch';
import { Play, ChevronRight } from 'lucide-react';
import heroImage from './images/image.png';

const HomePage = () => {
  const { data: movies, loading: moviesLoading } = useFetch('/protected/movies');
  const { data: series, loading: seriesLoading } = useFetch('/protected/series');

  const backgroundImage = heroImage;

  return (
    <div className="home-page hero-gradient">
      <Navbar />
      
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImage})`,
        }}
      >
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-title"
          >
            Experience Cinema <br /> Like Never Before
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-actions"
          >
            <Link to="/explore" className="primary-btn">
              <Play size={20} fill="white" />
              Watch Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="grid-section">
        <div className="section-header">
          <h2>Trending Movies</h2>
          <Link to="/movies" className="see-more">See All <ChevronRight size={16} /></Link>
        </div>

        {moviesLoading ? (
          <Loader />
        ) : (
          <div className="movie-grid">
            {movies?.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Series Section */}
      <section className="grid-section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2>Popular TV Series</h2>
          <Link to="/series" className="see-more">See All <ChevronRight size={16} /></Link>
        </div>

        {seriesLoading ? (
          <Loader />
        ) : (
          <div className="movie-grid">
            {series?.slice(0, 5).map((s) => (
              <MovieCard key={s.id} movie={s} />
            ))}
          </div>
        )}
      </section>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
          padding-top: 80px;
          background: var(--background);
        }
        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          padding: 0 5%;
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-bottom: 1px solid var(--glass-border);
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.15);
          z-index: 0;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 620px;
        }
        .hero-title {
          font-size: clamp(3rem, 5vw, 5.5rem);
          line-height: 1.04;
          font-weight: 800;
          margin-bottom: 24px;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
        }
        .primary-btn {
          background: var(--primary);
          color: white;
          padding: 14px 28px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 8px;
        }
        .grid-section {
          padding: 60px 5%;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .section-header h2 {
          font-size: 32px;
          font-weight: 700;
        }
        .see-more {
          color: var(--primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 30px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
