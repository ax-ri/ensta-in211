import './Home.css';
import { useState, useEffect } from 'react';
import { apiGet } from '../../utils/api.js';
import Movie from '../../components/Movie/Movie.jsx';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../../session.js';

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  useEffect(() => {
    apiGet('/movies/popular')
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occurred while fetching movies.');
        console.log(error);
      });
    return () => {};
  }, []);

  return { movies, moviesLoadingError };
};

function Home() {
  const [search, setSearch] = useState('');
  const { movies, moviesLoadingError } = useFetchMovies();
  const [sortCriteria, setSortCriteria] = useState('');

  const searchFilter = ({ title }) => {
    return search.length
      ? title.toLowerCase().includes(search.toLowerCase())
      : true;
  };

  const navigate = useNavigate();

  const user = getUserSession();
  if (!user) {
    navigate('/auth');
  }

  return (
    <div className="home">
      <header>
        {user ? (
          <>
            <span>
              Hi, <strong>{`${user.firstname} ${user.lastname}`}</strong>
            </span>
            <span className="link" onClick={() => navigate('/auth?logout=1')}>
              Log out
            </span>
          </>
        ) : (
          <span className="link" onClick={() => navigate('/auth')}>
            Login
          </span>
        )}
      </header>
      <h1>YAML App - Yet Another Movie List application</h1>

      <h2 className="movie-list-title-wrapper">
        Movie list
        <button
          className="add-movie-button"
          onClick={() => {
            navigate('/movie/add');
          }}
        >
          Add
        </button>
      </h2>

      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          {search.length ? 'Showing results for:' : ''} {search}
        </div>
      </div>

      <div className="sort-criteria">
        <span>Sort by</span>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="by-name">Name</option>
          <option value="by-date-desc">Date (newest first)</option>
          <option value="by-date-asc">Date (oldest first)</option>
          <option value="by-likes">Likes</option>
        </select>
      </div>

      {moviesLoadingError ? (
        `${moviesLoadingError}`
      ) : movies.filter(searchFilter).length ? (
        <div className="movies">
          {movies
            .filter(searchFilter)
            .sort((a, b) => {
              switch (sortCriteria) {
                case 'by-name':
                  return a.title.localeCompare(b.title);
                case 'by-date-desc':
                  return (
                    new Date(b.release_date).getTime() -
                    new Date(a.release_date).getTime()
                  );
                case 'by-date-asc':
                  return (
                    new Date(a.release_date).getTime() -
                    new Date(b.release_date).getTime()
                  );
                default:
                  return a.popularity - b.popularity;
              }
            })
            .map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                date={movie.release_date}
                posterUrl={movie.poster_path}
                user={movie.user}
              />
            ))}
        </div>
      ) : (
        'No result found.'
      )}
    </div>
  );
}

export default Home;
