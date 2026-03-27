"use strict";

const errorView = {
    renderError: function(model) {
      return `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Error</title>
            <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
            <div class="container error">
              ${errorView.getErrorHeader(model)}
              ${errorView.getErrorMessage(model)}
              ${errorView.getReturnLink()}
            </div>
          </body>
        </html>
      `;
    },
  
    getErrorHeader: function(model) {
      return `<h2>Error ${model.statusCode}</h2>`;
    },
  
    getErrorMessage: function(model) {
      return `<p>${model.message}</p>`;
    },
  
    getReturnLink: function() {
      return `<a href="/">Return to Login Page</a>`;
    }
  };
  
  module.exports = errorView;
  