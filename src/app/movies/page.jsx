import React from "react";
import Navbar from '../../components/Navbar';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';

import heroImage from '../images/image.png';

const MoviesPage = () => {
  const { data: movies, loading } = useFetch('/protected/movies');

  return (
    <div className="movies-page hero-gradient">
      <Navbar />
      
      <section 
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${heroImage})`,
        }}
      >
        <div className="container">
          <header className="page-header">
            <h1>Explore Movies</h1>
            <p>Find your next favorite cinematic masterpiece.</p>
          </header>
        </div>
      </section>

      <div className="container main-content">
        {loading ? (
          <Loader />
        ) : (
          <div className="movie-grid">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .movies-page {
          min-height: 100vh;
          background: var(--background);
        }
        .page-hero {
          padding-top: 160px;
          padding-bottom: 80px;
          background-size: cover;
          background-position: center;
          margin-bottom: 48px;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .main-content {
          padding-bottom: 80px;
        }
        .page-header h1 {
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 12px;
          color: white;
        }
        .page-header p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 18px;
        }
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, 240px);
          justify-content: center;
          gap: 30px;
        }
      `}</style>
    </div>
  );
};

export default MoviesPage;
