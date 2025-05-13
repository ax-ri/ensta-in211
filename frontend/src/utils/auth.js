import axios from 'axios';
import { removeUserSession, saveUserSession } from '../session.js';
import { apiPost } from './api.js';

const BASE_URL = import.meta.env.VITE_BACK_URL + '/auth';

export async function login(username, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      `username=${username}&password=${password}`,
    );
    switch (response.status) {
      case 200:
        await saveUserSession(response.data);
        return true;
      default:
        console.error('LOGIN FAILED');
        return false;
    }
  } catch (err) {
    console.error('LOGIN ERROR');
    console.error(err);
    return false;
  }
}

export async function signUp(firstname, lastname, email, password) {
  try {
    await apiPost(`/users/new`, { firstname, lastname, email, password });
    return true;
  } catch (_err) {
    return false;
  }
}

export async function logout() {
  try {
    await axios.post(`${BASE_URL}/logout`);
    await removeUserSession();
    return true;
  } catch (_err) {
    return false;
  }
}
