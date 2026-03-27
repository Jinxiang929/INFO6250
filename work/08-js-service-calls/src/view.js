export function render(state) {

    const app = document.querySelector('#app');
    
    if (!state.username) {
        app.innerHTML = `
            <div class="container">
                <h1>Login</h1>
                <label for="username">Username:</label>
                <input type="text" id="username">
                <button id="login-button">Login</button>
                <p id="error-message">${state.errorMessage || ''}</p>
            </div>
        `;
    } 
    
    else {
        app.innerHTML = `
            <div class="container">
                <p><button id="logout-button">Logout</button></p>
                <p>Hi, ${state.username}!</p>
                <p>Your stored word is: <span id="stored-word">${state.storedWord || ''}</span></p>
                <label for="input-word">Type a new word to store:</label>
                <input type="text" id="input-word">
                <p><button id="update-button">Update</button></p>
                <p id="error-message">${state.errorMessage || ''}</p>
                <p id="success-message">${state.successMessage || ''}</p>
            </div>
        `;
    }
}