import { fetchLogin, fetchSession, fetchLogout, fetchWord, updateWord } from './services.js';
import { render } from './view.js';


let state = { 
    username: '',
    storedWord: '',
    errorMessage: '', 
    successMessage: '' 
};

export function updateState(newState) {
    state = { ...state, ...newState };
}

document.querySelector('#app').addEventListener('click', (event) => {

    if (event.target.id === 'login-button') {
    const username = document.querySelector('#username').value;

    fetchLogin(username)
      .then(() => {
        updateState({ errorMessage: '' });
        checkSession();
      })

      .catch(err => {

        let errorMessage = '';

            if (err.error === 'auth-insufficient') {
                errorMessage = "User not allowed!";
            } 
            else if (err.error === 'required-username') {
                errorMessage = "Username is required!";
            } 
            else if (err.error === 'network-error') {
                errorMessage = "You are offline. Please check your internet connection.";
            } 
            else {
                errorMessage = "Invalid Username!";
            }
        updateState({ errorMessage });
        render(state);
      });
    }
  
    if (event.target.id === 'update-button') {

        fetchSession()
            .then(() => {
                const newWord = document.querySelector('#input-word').value;

                updateWord(newWord)
                    .then(({ storedWord }) => {
                        updateState({ storedWord, successMessage: "Update successful!", errorMessage: '' });
                        render(state);
                    })
                    .catch(err => {

                        if (err.error === 'network-error') {
                            updateState({ errorMessage: "You are offline. Please check your internet connection.", successMessage: '' });
                        } 
            
                        else {
                            updateState({ errorMessage: "Invalid word!", successMessage: '' });
                        }
                        render(state);
                    });
            })
            .catch(err => {
                if (err.message && err.message.includes('Failed to fetch')) {
                    updateState({ errorMessage: "You are offline. Please check your internet connection.", successMessage: '' });
                } 
                else {
                    updateState({ errorMessage: "Login is required!", successMessage: '' });
                }
                render(state);
            });
    }

    if (event.target.id === 'logout-button') {
        fetchLogout().then(() => {
            updateState({ username: '', storedWord: '', errorMessage: '', successMessage: '' });
            render(state);
         });
    }
});

function checkSession() {
    fetchSession()
        .then(({ username }) => {
        fetchWord().then(({ storedWord }) => {
        updateState({ username, storedWord });
        render(state);
        });
    })
    .catch(err => {

        if (err.message && err.message.includes('Failed to fetch')) {
            updateState({ username: '', storedWord: '', errorMessage: 'You are offline. Please check your internet connection.' });
        } else {
            updateState({ username: '', storedWord: '', errorMessage: 'Please login to continue.' });
        }
        render(state);
    });
}

checkSession();
