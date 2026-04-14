import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { useFetch } from '../hooks/useFetch';
import { Play, Info, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const { data: movies, loading } = useFetch('/movies/dummy');

  return (
    <div className="home-page hero-gradient">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-title"
          >
            Experience Cinema <br /> Like Never Before
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="hero-subtitle"
          >
            {/* Dive into thousands of movies, series, and awards-winning originals. 
            All in one place, starting at just $9.99/mo. */}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-actions"
          >
            <button className="primary-btn">
              <Play size={20} fill="white" />
              Watch Now
            </button>
            <button className="secondary-btn glass">
              <Info size={20} />
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="grid-section">
        <div className="section-header">
          <h2>Featured Movies</h2>
          <btn className="see-more">See All <ChevronRight size={16} /></btn>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="movie-grid">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
          padding-top: 80px;
        }
        .hero {
          height: 80vh;
          display: flex;
          align-items: center;
          padding: 0 5%;
          position: relative;
        }
        .hero-title {
          font-size: 72px;
          line-height: 1.1;
          font-weight: 800;
          margin-bottom: 24px;
        }
        .hero-subtitle {
          font-size: 18px;
          color: var(--muted);
          max-width: 600px;
          margin-bottom: 40px;
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
        }
        .secondary-btn {
          padding: 14px 28px;
          color: white;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .grid-section {
          padding: 80px 5%;
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
