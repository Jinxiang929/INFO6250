"use strict";

const crypto = require('crypto');

const sessions = {};

const isValidUsername = (username) => /^[a-zA-Z0-9]+$/.test(username) && (username !== 'dog');

const createSession = (username) => {
    const sid = crypto.randomUUID();
    sessions[sid] = { 
        username,
        game: {
            previousGuesses: [],
            lastGuess: '',
            lastGuessMatches: 0,
            attempts: 0,
            gameOver: false
        }
    };
    return sid;
};

const deleteSession = (sid) => delete sessions[sid];

const getSession = (sid) => {
    const session = sessions[sid] || null;
    if (session && !session.game) {
        session.game = { 
            previousGuesses: [], 
            lastGuess: '', 
            lastGuessMatches: 0, 
            attempts: 0, 
            gameOver: false 
        };
     }
    
    return session;
};

const sessionModel = {
    isValidUsername,
    createSession,
    deleteSession,
    getSession,
};

module.exports = sessionModel;