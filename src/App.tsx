import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './app/page';
import MoviesPage from './app/movies/page';
import SeriesPage from './app/series/page';
import Login from './app/login/page';
import Register from './app/register/page';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
