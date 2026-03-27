import { CLIENT } from './constants';

export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(error => Promise.reject({ error }))
      .then(err => Promise.reject(err));
  });
}

export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE',
  })
  .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(error => Promise.reject({ error }))
      .then(err => Promise.reject(err));
  });
}

export function fetchSession() {
  return fetch('/api/v1/session')
    .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchMessages() {
  return fetch('/api/v1/messages')
    .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchUsers() {
  return fetch('/api/v1/users')
    .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchSendMessage(text) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ text }),
  })
  .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(error => Promise.reject({ error }))
      .then(err => Promise.reject(err));
  });
}