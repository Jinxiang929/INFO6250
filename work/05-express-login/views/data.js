"use strict";

const userDataView = {
    renderData: function(model) {
      return `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>User Data</title>
            <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
            <div class="container">
              ${userDataView.getUserWelcome(model)}
              ${userDataView.getStoredWord(model)}
              ${userDataView.getUpdateForm(model)}
              ${userDataView.getLogoutForm()}
            </div>
          </body>
        </html>
      `;
    },
  
    getUserWelcome: function(model) {
      return `<h2>Welcome, ${model.username}!</h2>`;
    },
  
    getStoredWord: function(model) {
      return `<p>Stored Word: <span>${model.storedWord}</span></p>`;
    },
  
    getUpdateForm: function(model) {
      return `
        <form action="/data/update" method="POST">
          <label for="newWord">Updated Word:</label>
          <input type="text" id="newWord" name="newWord" value="${model.storedWord}"/>
          <button type="submit">Update</button>
        </form>
      `;
    },
  
    getLogoutForm: function() {
      return `
        <form action="/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      `;
    }
  };
  
  module.exports = userDataView;
  