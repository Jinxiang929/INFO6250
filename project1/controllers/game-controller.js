"use strict";

const words = require('../words');
const gameModel = require('../models/game-model');
const sessionModel = require('../models/session-model');
const gameView = require('../views/game-view');

const controllers = {};

controllers.showGame = function( req, res ) {
    const sid = req.cookies.sid;
    const session = sessionModel.getSession(sid);

    if (!session) {
        res.redirect('/');
        return;
    }

    let game = gameModel.getGame(session.username);

    if (!game) {
        gameModel.createNewGame(session.username);
        game = gameModel.getGame(session.username); 
    }

    const errorMessage = game.lastInvalidGuess || '';

    res.send(gameView.renderGamePage(game, game.stats, words, errorMessage));

};

controllers.makeGuess = function( req, res ) {
    const sid = req.cookies.sid;
    const session = sessionModel.getSession(sid);

    if (!session) {
        res.redirect('/');
        return;
    }

    const { guess } = req.body;
    const game = gameModel.getGame(session.username);
    const result = gameModel.makeGuess({ username: session.username, guessWord: guess }); 

    if (!game) {
        res.redirect('/');
        return;
    }

    if (game.previousGuesses.includes(guess.toLowerCase())) {
        return res.send(gameView.renderGamePage(game, game.stats, words, result.error));
    }

    //very important to make sure after reload page nothing changed, should not resend
    return res.redirect('/game'); 
    
};    

controllers.resetGame = function( req, res ) {
    const sid = req.cookies.sid;
    const session = sessionModel.getSession(sid);

    if (!session) {
        res.redirect('/');
    }
    gameModel.createNewGame(session.username);
    return res.redirect('/game');

};

module.exports = controllers;

