import './MovieDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiDelete, apiGet } from '../../utils/api.js';

const useFetchDetails = (id) => {
  const [details, setDetails] = useState([]);
  const [detailsLoadingError, setDetailsLoadingError] = useState(null);

  useEffect(() => {
    apiGet(`/movies/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        setDetailsLoadingError(
          'An error occurred while fetching movie details.',
        );
        console.log(error);
      });
    return () => {};
  }, [import.meta.env.VITE_API_URL]);

  return { details, detailsLoadingError };
};

const useFetchCredits = (id) => {
  const [credits, setCredits] = useState([]);
  const [creditsLoadingError, setCreditsLoadingError] = useState(null);

  useEffect(() => {
    apiGet(`/movies/${id}/credits`)
      .then((response) => {
        setCredits(response.data);
      })
      .catch((error) => {
        setCreditsLoadingError(
          'An error occurred while fetching movie credits.',
        );
        console.log(error);
      });
    return () => {};
  }, [import.meta.env.VITE_API_URL]);

  return { credits, creditsLoadingError };
};

function MovieDetails() {
  const params = useParams();

  const { details, detailsLoadingError } = useFetchDetails(params.id);
  const { credits, creditsLoadingError } = useFetchCredits(params.id);

  const durationH = Math.trunc(details.runtime / 60);
  const durationM = details.runtime % 60;

  const navigate = useNavigate();

  function deleteMovie(id) {
    apiDelete(`/movies/${id}`)
      .then(() => {
        navigate(`/`);
      })
      .catch((error) => {
        alert(`Unable to delete movie! (error: ${error})`);
      });
  }

  return detailsLoadingError ? (
    `${detailsLoadingError}`
  ) : (
    <div className="wrapper">
      <div className="first-row">
        <div className="left-wrapper">
          <div className="title-wrapper">
            <h1 className="title-1">
              {details.title} ({new Date(details.release_date).getFullYear()})
            </h1>
            <span className="spacer"></span>
            <span className="link" onClick={() => deleteMovie(params.id)}>
              Delete
            </span>
          </div>
          <div className="details-line">
            <span className="genres">
              {details.genres
                ? details.genres.map(({ name }) => (
                    <span className="genre" key={name}>
                      {name}
                    </span>
                  ))
                : ''}
            </span>
            |
            <span>
              {durationH ? `${durationH}h` : ''}
              {`${durationM}m`}
            </span>
            |
            <span>
              {details.spoken_languages
                ? details.spoken_languages.map(({ name }) => name)
                : ''}
            </span>
          </div>

          <h2 className="title-2">Synopsis</h2>
          <div className="overview">{details.overview}</div>
        </div>
        <div className="right-wrapper">
          <img
            className="poster"
            src={
              details.poster_path
                ? `${import.meta.env.VITE_IMG_URL}${details.poster_path}`
                : 'https://placehold.co/400x600?text=No+Poster+Provided'
            }
            alt="poster"
          />
        </div>
      </div>
      <h2 className="title-2">Cast</h2>
      <div className="cast-wrapper">
        {credits.cast
          ? credits.cast.map((cast) => (
              <div className="cast" key={cast.id}>
                {cast.profile_path ? (
                  <img
                    className="picture"
                    src={`${import.meta.env.VITE_IMG_URL}${cast.profile_path}`}
                    alt="picture"
                  />
                ) : (
                  <span className="picture"></span>
                )}
                <strong>{cast.original_name}</strong>
                <em>{cast.character}</em>
              </div>
            ))
          : ''}
      </div>

      <h2 className="title-2">Production</h2>

      <div className="production-wrapper">
        {details.production_companies
          ? details.production_companies.map(({ name, logo_path }) => (
              <div className="producer-company" key={name}>
                {logo_path ? (
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${logo_path}`}
                    alt="producer-logo"
                  />
                ) : (
                  ''
                )}
                {name}
              </div>
            ))
          : ''}
      </div>
    </div>
  );
}

export default MovieDetails;
