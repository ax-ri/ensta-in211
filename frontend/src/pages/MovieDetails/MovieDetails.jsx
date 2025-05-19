import './MovieDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPost } from '../../utils/api.js';
import { getUserSession } from '../../session.js';

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
  }, []);

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
  }, []);

  return { credits, creditsLoadingError };
};

const useFetchComments = (id) => {
  const [comments, setComments] = useState([]);
  const [commentsLoadingError, setCommentsLoadingError] = useState(null);

  useEffect(() => {
    apiGet(`/comments?movie=${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        setCommentsLoadingError(
          'An error occurred while fetching movie comments.',
        );
        console.log(error);
      });
    return () => {};
  }, []);

  return { comments, setComments, commentsLoadingError };
};

function MovieDetails() {
  const params = useParams();

  const { details, detailsLoadingError } = useFetchDetails(params.id);
  const { credits, creditsLoadingError } = useFetchCredits(params.id);
  let { comments, setComments, commentsLoadingError } = useFetchComments(
    params.id,
  );

  const [newComment, setNewComment] = useState('');

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

  function addComment(id) {
    apiPost(`/comments/new`, { movie: id, content: newComment })
      .then((res) => {
        // return window.location.reload();
        setComments([res.data].concat(comments));
      })
      .catch((error) => {
        alert(`Unable to add comment! (error: ${error})`);
      });
  }

  function deleteComment(id) {
    apiDelete(`/comments/${id}`)
      .then((res) => {
        // return window.location.reload();
        setComments(comments.filter((c) => c.id !== id));
      })
      .catch((error) => {
        alert(`Unable to delete comment! (error: ${error})`);
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
          {details.genres &&
          details.genres.length &&
          details.spoken_languages &&
          details.spoken_languages.length ? (
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
                {durationM ? `${durationM}m` : ''}
              </span>
              |
              <span>
                {details.spoken_languages
                  ? details.spoken_languages.map(({ name }) => name).join(' ')
                  : ''}
              </span>
            </div>
          ) : (
            ''
          )}

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
      {credits.cast && credits.cast.length ? (
        <h2 className="title-2">Cast</h2>
      ) : (
        ''
      )}
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

      {details.production_companies && details.production_companies.length ? (
        <h2 className="title-2">Production</h2>
      ) : (
        ''
      )}
      <div className="production-wrapper">
        {details.production_companies
          ? details.production_companies.map(({ name, logo_path }) => (
              <div className="producer-company" key={name}>
                {
                  <img
                    src={
                      logo_path
                        ? `${import.meta.env.VITE_IMG_URL}${logo_path}`
                        : 'https://placehold.co/300x200?text=Producer'
                    }
                    alt="producer-logo"
                  />
                }
                {name}
              </div>
            ))
          : ''}
      </div>

      <h2 className="title-2">Comments</h2>

      <div className="new-comment-wrapper">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => addComment(params.id)}>Add comment</button>
      </div>

      <div className="comments-wrapper">
        {comments && comments.length ? (
          comments
            .toSorted(
              (a, b) => new Date(a.date).getTime() - new Date(b).getTime(),
            )
            .map((comment) => (
              <div className="comment">
                <div className="comment-header">
                  <span>
                    {comment.user.firstname} {comment.user.lastname}
                  </span>
                  <span>
                    {new Date(comment.date).toLocaleDateString()} -
                    {new Date(comment.date).toLocaleTimeString()}
                    {comment.user.id == getUserSession().id ? (
                      <span
                        className="link"
                        style={{ 'margin-left': '10px' }}
                        onClick={() => deleteComment(comment.id)}
                      >
                        Delete
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
                <div className="comment-body">{comment.content}</div>
              </div>
            ))
        ) : (
          <em>No comment found.</em>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
