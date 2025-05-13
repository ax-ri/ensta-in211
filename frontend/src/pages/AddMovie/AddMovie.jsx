import './AddMovie.css';
import { useState } from 'react';
import { apiPost } from '../../utils/api.js';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [overview, setOverview] = useState('');

  const navigate = useNavigate();

  async function add(evt) {
    evt.preventDefault();

    const res = await apiPost('/movies/new', {
      title,
      poster_path: '',
      release_date: releaseDate,
      overview: overview,
    });

    if (200 <= res.status && res.status < 300) {
      navigate('/');
    }
  }

  return (
    <div className="wrapper">
      <h1>Add movie</h1>

      <form>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="input-wrapper">
          <label htmlFor="release-date">Release date</label>
          <input
            type="date"
            placeholder="Release date"
            id="release-date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </span>
        <span className="input-wrapper">
          <label htmlFor="poster">Poster</label>
          <input type="file" placeholder="Poster" id="poster" />
        </span>
        <textarea
          placeholder="Synopsis"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />

        <div className="input-wrapper" style={{ justifyContent: 'center' }}>
          <input
            type="submit"
            value="Back"
            style={{ backgroundColor: 'grey' }}
            onClick={() => {
              navigate('/');
            }}
          />
          <input type="submit" value="Add" onClick={add} />
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
