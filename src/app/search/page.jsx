import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/Navbar';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import heroImage from '../images/image.png';

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const { data: results, loading, error } = useFetch(`/search?q=${encodeURIComponent(query || "")}`);

    const allResults = results ? [...(results.movies || []), ...(results.series || [])] : [];

    return (
        <div className="search-page hero-gradient">
            <Navbar />

            <section
                className="page-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${heroImage})`,
                }}
            >
                <div className="container">
                    <header className="page-header">
                        <h1>Search Results</h1>
                        <p>Showing results for: <span style={{ color: "var(--primary)" }}>"{query}"</span></p>
                    </header>
                </div>
            </section>

            <div className="container main-content">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="error-message">Error fetching search results.</div>
                ) : allResults.length === 0 ? (
                    <div className="no-results">
                        <h3>No matches found.</h3>
                        <p>Try different keywords or check out our trending section.</p>
                    </div>
                ) : (
                    <div className="movie-grid">
                        {allResults.map((item) => (
                            <MovieCard key={`${item.type}-${item.id}`} movie={item} type={item.type || 'movie'} />
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .search-page {
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
                .no-results {
                    text-align: center;
                    padding: 80px 0;
                    color: white;
                }
                .error-message {
                    color: #ef4444;
                    text-align: center;
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
};

export default SearchPage;
