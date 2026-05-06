import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const MediaFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'movie',
    title: '',
    year: '',
    genre: '',
    description: '',
    poster: '',
    rating: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type || 'movie',
        title: initialData.title || '',
        year: initialData.year || '',
        genre: initialData.genre || '',
        description: initialData.description || '',
        poster: initialData.poster || initialData.poster_path ? `https://image.tmdb.org/t/p/w500/${initialData.poster_path}` : '',
        rating: initialData.rating || '',
      });
    } else {
      setFormData({
        type: 'movie',
        title: '',
        year: '',
        genre: '',
        description: '',
        poster: '',
        rating: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = formData.type === 'movie' ? '/protected/movies' : '/protected/series';
    const url = initialData && initialData.id
      ? `http://localhost:5000/api${endpoint}/${initialData.id}`
      : `http://localhost:5000/api${endpoint}`;

    const method = initialData && initialData.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Saved successfully!");
        onSuccess && onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
        console.error('Failed to save media', errorData);
      }
    } catch (error) {
      alert("Error saving media. Is the backend running?");
      console.error('Error saving media', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content glass">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>{initialData ? 'Edit Media' : 'Add Media'}</h2>

        <form onSubmit={handleSubmit} className="media-form">
          <div className="form-group">
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              disabled={!!initialData}
            >
              <option value="movie">Movie</option>
              <option value="series">TV Series</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                required
                className="no-spin"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                className="no-spin"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Genre</label>
            <select
              required
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            >
              <option value="" disabled>Select a Genre</option>
              <option value="Movie">Movie</option>
              <option value="TV Series">TV Series</option>
            </select>
          </div>

          <div className="form-group">
            <label>Poster URL</label>
            <input
              type="text"
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          z-index: 2000;
          padding: 20px;
          box-sizing: border-box;
          overflow-y: auto; /* Allow the entire overlay to scroll */
        }
        .modal-content {
          width: 100%;
          max-width: 500px;
          background: var(--card, #141414);
          padding: 30px;
          border-radius: 16px;
          position: relative;
          margin: 5vh auto; /* Centers horizontally and adds nice top offset */
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          box-sizing: border-box;
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        h2 {
          margin-bottom: 24px;
        }
        .media-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-row {
          display: flex;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        label {
          font-size: 14px;
          color: var(--muted);
        }
        input, select, textarea {
          padding: 10px 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-family: inherit;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--primary);
        }
        select option {
          background: var(--background);
          color: white;
        }
        
        /* Hide spin buttons for Year input */
        .no-spin::-webkit-inner-spin-button, 
        .no-spin::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        .no-spin {
          -moz-appearance: textfield;
        }

        .submit-btn {
          margin-top: 20px;
          margin-bottom: 10px;
          padding: 14px;
          border-radius: 8px;
          border: none;
          background: var(--primary, #e50914);
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }
        .submit-btn:hover {
          background: var(--primary-hover, #f40612);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default MediaFormModal;
