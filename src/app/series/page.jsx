import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

const SeriesPage = () => {
  return (
    <div className="series-page">
      <Navbar />
      <div className="container">
        <header className="page-header">
          <h1>TV Series</h1>
          <p>Binge-worthy shows from across the globe.</p>
        </header>
        
        <div className="empty-state glass">
          <h2>Coming Soon</h2>
          <p>We're currently curating the best series for you. Stay tuned!</p>
        </div>
      </div>

      <style jsx>{`
        .series-page {
          padding-top: 120px;
          min-height: 100vh;
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
