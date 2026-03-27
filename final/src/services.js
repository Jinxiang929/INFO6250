export function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
    .catch(() => Promise.reject({ error: 'networkError'}))
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
    .catch(() => Promise.reject({ error: 'networkError'}))
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
    return fetch('/api/v1/session', {
        method: 'GET',
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchRegister(username, role) {
    return fetch('/api/v1/users', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username, role }),
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchAssignments() {
    return fetch('/api/v1/assignments')
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchAssignment(id) {
    return fetch(`/api/v1/assignments/${id}`)
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchCreateAssignment(title, description, allowedAttempts, dueDate) {
    return fetch('/api/v1/assignments', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ title, description, allowedAttempts, dueDate }),
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchUpdateAssignment(id, title, description, allowedAttempts, dueDate) {
    return fetch(`/api/v1/assignments/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ title, description, allowedAttempts, dueDate }),
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchDeleteAssignment(id) {
    return fetch(`/api/v1/assignments/${id}`, {
        method: 'DELETE',
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchSubmissions() {
    return fetch('/api/v1/submissions')
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchSubmission(id) {
    return fetch(`/api/v1/submissions/${id}`)
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchCreateSubmission(assignmentId, content) {
    return fetch('/api/v1/submissions', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ assignmentId, content }),
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchUpdateSubmission(id, content) {
    return fetch(`/api/v1/submissions/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ content }),
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}
  
export function fetchAddComment(id, comments) {

    return fetch(`/api/v1/submissions/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ comments }),
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchAssignmentSubmissions(assignmentId) {
    return fetch(`/api/v1/assignments/${assignmentId}/submissions`)
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}

export function fetchGetStudentSubmissions(assignmentId) {
    return fetch(`/api/v1/student/assignments/${assignmentId}/submissions`)
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
    });
}