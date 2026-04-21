import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './app/page';
import MoviesPage from './app/movies/page';
import SeriesPage from './app/series/page';
import Login from './app/login/page';
import Register from './app/register/page';
import SearchPage from './app/search/page';
import ExplorePage from './app/explore/page';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './ErrorBoundary';
import './styles/globals.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
