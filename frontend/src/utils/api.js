import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export function apiGet(route) {
  return axios.get(`${API_BASE_URL}${route}`);
}

export function apiPost(route, data) {
  return axios.post(`${API_BASE_URL}${route}`, data);
}

export function apiDelete(route, data) {
  return axios.delete(`${API_BASE_URL}${route}`, data);
}
