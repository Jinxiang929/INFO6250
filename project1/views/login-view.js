"use strict";

const senderLoginView = {
  loginPage: function( errorMessage = '' ) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Login</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="container">
            ${errorMessage ? `<p class="error">${errorMessage}</p>` : ''}
            ${senderLoginView.getLoginForm()}
          </div>
        </body>
      </html>
    `;
  },

  getLoginForm: function() {
    return `
      <h1>Login Page</h1>
      <form action="/login" method="POST">
        ${senderLoginView.getUsernameField()}
        <button type="submit">Login</button>
      </form>
    `;
  },

  getUsernameField: function() {
    return `
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
    `;
  }
};

module.exports = senderLoginView;