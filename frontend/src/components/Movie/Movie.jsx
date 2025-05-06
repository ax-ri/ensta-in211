import './Movie.css';
import { useNavigate } from 'react-router-dom';

function Movie({ id, title, date, posterUrl }) {
  const navigate = useNavigate();
  const redirectToDetails = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-container" onClick={() => redirectToDetails()}>
      <img
        className="movie-poster"
        src={
          posterUrl
            ? `${import.meta.env.VITE_IMG_URL}${posterUrl}`
            : 'https://placehold.co/400x600?text=No+Poster+Provided'
        }
        alt={title}
      />

      <div className="movie-details">
        <span className="movie-details-title">{title}</span>
        <span className="movie-details-date">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default Movie;
