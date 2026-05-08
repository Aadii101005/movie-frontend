import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import { useFetch } from "../../../hooks/useFetch";
import { ArrowLeft, Star, Calendar } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, loading, error } = useFetch(`/protected/movies/${id}`);

  if (loading) return <div className="page-container"><Navbar /><Loader /></div>;
  if (error) return <div className="page-container"><Navbar /><div className="error-message">{error}</div></div>;
  if (!movie) return <div className="page-container"><Navbar /><div className="error-message">Movie not found</div></div>;

  return (
    <div className="details-page">
      <Navbar />
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        
        <div className="content-grid">
          <div className="image-container">
            <img 
              src={movie.poster || movie.poster_path ? (movie.poster?.startsWith('http') ? movie.poster : `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.poster}`) : 'https://via.placeholder.com/500x750?text=No+Image'} 
              alt={movie.title} 
            />
          </div>
          
          <div className="info-container">
            <h1 className="title">{movie.title}</h1>
            
            <div className="meta-info">
              <div className="meta-item">
                <Calendar size={18} />
                <span>{movie.year || 'N/A'}</span>
              </div>
              <div className="meta-item">
                <Star size={18} color="#fbbf24" fill="#fbbf24" />
                <span>{movie.rating ? movie.rating.toFixed(1) : 'N/A'}</span>
              </div>
            </div>

            {movie.genre && (
              <div className="genres">
                <span className="genre-tag">{movie.genre}</span>
              </div>
            )}
            
            <div className="description">
              <h3>Overview</h3>
              <p>{movie.description || 'No description available.'}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: var(--background);
        }
        .details-page {
          min-height: 100vh;
          background: var(--background);
          padding-top: 100px;
          color: white;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 30px;
          transition: color 0.3s;
        }
        .back-button:hover {
          color: white;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 50px;
          align-items: flex-start;
        }
        .image-container img {
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .info-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.1;
        }
        .meta-info {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
        }
        .genres {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .genre-tag {
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        .description h3 {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .description p {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }
        .error-message {
          text-align: center;
          margin-top: 100px;
          font-size: 20px;
          color: #ef4444;
        }
        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          .image-container {
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
