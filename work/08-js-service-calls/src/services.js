export function fetchLogin(username) {

    return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', 
      },
      body: JSON.stringify( { username } ),
    })
    .then( response => {
      if(!response.ok) {  
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); 
    })
    .catch(err => {
      if (err.error === 'auth-insufficient') {
        return Promise.reject({ error: 'auth-insufficient', message: 'User not allowed!' });
      }
      if (err.message && err.message.includes('Failed to fetch')) {
        return Promise.reject({ error: 'network-error', message: 'You are offline. Please check your internet connection.' });
      }
      return Promise.reject({ error: 'unknown-error', message: 'An unexpected error occurred.' });
});
}

export function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
      credentials: 'include',  
      })
      .then( response => {
        if(response.ok) {
          return response.json();
        }
        return Promise.reject(response.json());
    });
}

export function fetchLogout() {
    return fetch('/api/session', {method: 'DELETE'})
      .then( response => {
        if(response.ok) {
          return response.json();
        }
        return Promise.reject(response.json());
      })
      .catch(err => {
        return Promise.reject(err); 
    })
}

export function fetchWord() {
    return fetch('/api/word')
      .then( response => {
        if(response.ok) {
          return response.json();
        }
        return Promise.reject(response.json());
    });
}

export function updateWord(word) {
    return fetch('/api/word', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ word }),
    })

    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {  
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); 
  });
}


