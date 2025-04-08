import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/popular';

export function apiGet(route) {
  return axios.get(
    `${import.meta.env.VITE_TMDB_API_URL}${route}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
  );
}
