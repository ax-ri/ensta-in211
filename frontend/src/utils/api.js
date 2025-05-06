import axios from 'axios';

export function apiGet(route) {
  return axios.get(`${import.meta.env.VITE_API_URL}${route}`);
}

export function apiPost(route, data) {
  return axios.post(`${import.meta.env.VITE_API_URL}${route}`, data);
}

export function apiDelete(route, data) {
  return axios.delete(`${import.meta.env.VITE_API_URL}${route}`, data);
}
