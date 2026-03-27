import { CLIENT } from './constants';

export function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch(error => Promise.reject({ error }))
        .then( err => Promise.reject(err) );
    });
}

export function fetchLogout() {
    return fetch('/api/v1/session', {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }))
        .then( err => Promise.reject(err) );
    });
}

export function fetchSession() {
    return fetch('/api/v1/session')
    .catch( () => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }))
        .then( err => Promise.reject(err) );
    });
}

export function fetchWord() {
    return fetch('/api/v1/word')
    .catch( () => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }))
        .then( err => Promise.reject(err) );
    });
}

export function fetchUpdateWord(word) {
    return fetch('/api/v1/word', {
        method: 'PUT',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ word: word }),  
    })
    .catch( () => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }))
        .then( err => Promise.reject(err) );
    });
}