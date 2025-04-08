import './Movie.css';
import { useNavigate } from 'react-router-dom';

function Movie({ id, title, date, posterUrl }) {
  const navigate = useNavigate();
  const redirectToDetails = () => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="movie-container" onClick={() => redirectToDetails()}>
      <img className="movie-poster" src={posterUrl} alt={title} />
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
