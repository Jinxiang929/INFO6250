"use strict";

const gameView = {
    renderGamePage: function( model, stats, words, error ) {

      return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Word Guess Game</title>
            <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
            <div class="container">
              <h1>Word Guess Game</h1>
              <div class="stats">
                <p>Attempts: ${model.attempts || 0}</p> 
                <p>Games Played: ${stats.gamesPlayed}</p>
                <p>Games Won: ${stats.gamesWon}</p>
                <p>Personal Best: ${stats.lowestAttempts}</p>
                <p>Highest Attempts: ${stats.highestAttempts}</p>
              </div>

              <p>Previous Guesses: ${gameView.renderPreviousGuesses(model.previousGuesses)}</p>

              ${model.gameOver ? '<p class="congratulations-message">Congratulations, You won!</p>' : ''}
              ${error ? `<p class="error">${error}</p>` : ''}

              <div class="word-list">
                <h2>Possible Word List</h2>
                <span class="word">${words.join(', ')}</span>
              </div>

              ${gameView.getGuessForm(model)}
              ${gameView.getResetButton()}
              ${gameView.getLogoutButton()} 
            </div>
          </body>
        </html>
      `;
    },

    renderPreviousGuesses: function( previousGuesses ) {
      return `
        <ul>
          ${previousGuesses.map((guess) => {
            return `<li>${guess.guess} (Matched: ${guess.matchCount} letters)</li>`;
          }).join('')}
        </ul>
      `;
    },
  
    getGuessForm: function( model ) {
      return `
        <form action="/game/guess" method="POST">
          <label for="guess">Enter your guess:</label>
          <input type="text" id="guess" name="guess" required>

          <!-- make sure after success guess user cannot submit guess -->
          <button type="submit" ${model.gameOver ? 'disabled' : ''}>Submit Guess</button> 

        </form>
      `;
    },
  
    getResetButton: function() {
      return `
        <form action="/game/new-game" method="POST">
          <button type="submit">Reset Game</button>
        </form>
      `;
    },

    getLogoutButton: function() {
      return `
        <form action="/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      `;
    }
  };
  
  module.exports = gameView;