import React from "react";
import Navbar from '../../components/Navbar';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import heroImage from '../images/image.png';

const ExplorePage = () => {
    const { data: movies, loading: moviesLoading } = useFetch('/protected/movies');
    const { data: series, loading: seriesLoading } = useFetch('/protected/series');

    const loading = moviesLoading || seriesLoading;
    const allContent = [
        ...(movies?.map(m => ({ ...m, type: 'movie' })) || []),
        ...(series?.map(s => ({ ...s, type: 'series' })) || [])
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="explore-page hero-gradient">
            <Navbar />

            <section
                className="page-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${heroImage})`,
                }}
            >
                <div className="container">
                    <header className="page-header">
                        <h1>All Collections</h1>
                        <p>Movies and TV Series curated just for you.</p>
                    </header>
                </div>
            </section>

            <div className="container main-content">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="movie-grid">
                        {allContent.map((item) => (
                            <MovieCard key={`${item.type}-${item.id}`} movie={item} type={item.type} />
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .explore-page {
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

export default ExplorePage;
