import './Movie.css';

function Movie({ title, date, posterUrl }) {
  return (
    <div className="movie-container">
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
