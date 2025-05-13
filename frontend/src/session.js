import localforage from 'localforage';

let user = null;

export async function restoreUserSession() {
  user = JSON.parse(await localforage.getItem('user'));
}

export function getUserSession() {
  return user;
}

export async function saveUserSession(user) {
  await localforage.setItem('user', JSON.stringify(user));
  await restoreUserSession();
}

export async function removeUserSession() {
  await localforage.removeItem('user');
  user = null;
}
