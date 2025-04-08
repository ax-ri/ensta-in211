import axios from 'axios';

export function apiGet(route) {
  return axios.get(
    `${import.meta.env.VITE_TMDB_API_URL}${route}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
  );
}
