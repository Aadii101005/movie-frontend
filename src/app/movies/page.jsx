import React from "react";
import Navbar from '../../components/Navbar';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';

const MoviesPage = () => {
  const { data: movies, loading } = useFetch('/movies');

  return (
    <div className="movies-page">
      <Navbar />
      <div className="container">
        <header className="page-header">
          <h1>Explore Movies</h1>
          <p>Find your next favorite cinematic masterpiece.</p>
        </header>

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
          padding-top: 120px;
          min-height: 100vh;
          background: var(--background);
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .page-header {
          margin-bottom: 48px;
        }
        .page-header h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .page-header p {
          color: var(--muted);
          font-size: 18px;
        }
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 30px;
          padding-bottom: 80px;
        }
      `}</style>
    </div>
  );
};

export default MoviesPage;
