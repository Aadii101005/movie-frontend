import React from "react";
import Navbar from '../../components/Navbar';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import heroImage from '../images/image.png';

const SeriesPage = () => {
  const { data: series, loading } = useFetch('/protected/series');

  return (
    <div className="series-page hero-gradient">
      <Navbar />

      <section 
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${heroImage})`,
        }}
      >
        <div className="container">
          <header className="page-header">
            <h1>TV Series</h1>
            <p>Binge-worthy shows from across the globe.</p>
          </header>
        </div>
      </section>
      
      <div className="container main-content">
        {loading ? (
          <Loader />
        ) : series?.length > 0 ? (
          <div className="series-grid">
            {series.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state glass">
            <h2>No Series Found</h2>
            <p>Check back later for curated Netflix shows.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .series-page {
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
        .series-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 30px;
        }
        .empty-state {
          padding: 80px;
          text-align: center;
          border-radius: 24px;
        }
        .empty-state h2 {
          font-size: 32px;
          margin-bottom: 16px;
        }
        .empty-state p {
          color: var(--muted);
        }
      `}</style>
    </div>
  );
};

export default SeriesPage;
