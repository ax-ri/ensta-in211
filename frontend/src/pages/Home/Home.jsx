import './Home.css';
import { useState, useEffect } from 'react';
import { apiGet } from '../../utils/api.js';
import Movie from '../../components/Movie/Movie.jsx';

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  useEffect(() => {
    apiGet('/movie/popular')
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occurred while fetching movies.');
        console.log(error);
      });
    return () => {};
  });

  return { movies, moviesLoadingError };
};

function Home() {
  const [search, setSearch] = useState('');
  const { movies, moviesLoadingError } = useFetchMovies();

  return (
    <div className="home">
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

      <div className="movies">
        {movies
          .filter(({ title }) => {
            return search.length
              ? title.toLowerCase().includes(search.toLowerCase())
              : true;
          })
          .map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              posterUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
