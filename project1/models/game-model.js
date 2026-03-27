"use strict";

const words = require('../words');
const compare = require('../compare');

const games = {};

function createNewGame( username ) {
    
    if (!games[username]) {
        games[username] = {
            wordToGuess: pickWord(),
            attempts: 0,
            previousGuesses: [],
            lastGuess: null,
            lastGuessMatches: 0,
            lastInvalidGuess: null,
            gameOver: false,
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                lowestAttempts: 0,  
                highestAttempts: 0,
            }
        }
    };

    games[username].wordToGuess = pickWord();
    games[username].attempts = 0;
    games[username].previousGuesses = [];
    games[username].lastGuess = null;
    games[username].lastGuessMatches = 0;
    games[username].lastInvalidGuess = null;
    games[username].gameOver = false;

    console.log(`New game started for username: ${username}`);
    console.log(`Secret Word: ${games[username].wordToGuess}`);

    games[username].stats.gamesPlayed += 1;
}

function pickWord() {
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
}

function getGame( username ) {
    return games[username] || null;
}

function makeGuess({ username, guessWord }) {
    const game = getGame(username);

    const currentGuess = guessWord.toLowerCase();
    
    if (game.previousGuesses.some(item => item.guess === currentGuess)) {
        game.lastInvalidGuess = "Word already guessed!"; //store error in the server
        return { game };
    }

    if (!words.some(word => word.toLowerCase() === currentGuess)) {
        game.lastInvalidGuess = "Invalid guess. Word not in the list, please try again.";
        return { game };
    }

    const matchCount = compare(game.wordToGuess, currentGuess);
    game.previousGuesses.push({ guess: currentGuess, matchCount }); 
    game.lastGuess = currentGuess;
    game.lastGuessMatches = matchCount;
    game.lastInvalidGuess = null;
    game.attempts += 1;
    
    if (currentGuess === game.wordToGuess) {
        game.stats.gamesWon += 1;
        if (game.attempts < game.stats.lowestAttempts || game.stats.lowestAttempts === 0) {
            game.stats.lowestAttempts = game.attempts;
        }
        if (game.attempts > game.stats.highestAttempts) {
            game.stats.highestAttempts = game.attempts;
        }
        game.gameOver = true;
    }

    return { game };
}

const gameModel = {
    games,
    createNewGame,
    pickWord,
    getGame,
    makeGuess,
};

module.exports = gameModel;