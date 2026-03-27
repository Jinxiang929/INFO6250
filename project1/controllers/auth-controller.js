"use strict";

const sessionModel = require('../models/session-model');  
const senderLoginView = require('../views/login-view');    

const controllers = {};

controllers.showLogin = function( req, res ) {
    const sid = req.cookies.sid;
    const session = sessionModel.getSession(sid);

    if (sid && session) {
        return res.redirect('/game');
    }
    res.send(senderLoginView.loginPage());
};

controllers.handleLogin = function( req, res ) {
    const { username } = req.body;

    if (!username || !sessionModel.isValidUsername(username.trim())) {
        res.clearCookie('sid');
        const errorMessage = username === 'dog' ? "User not allowed!" : "Invalid Username! Please try again.";

        return res.send(senderLoginView.loginPage(errorMessage));
    }
    const sid = sessionModel.createSession(username.trim());
    res.cookie('sid', sid);
    res.redirect('/game');
};

controllers.handleLogout = function( req, res ) {
    const sid = req.cookies.sid;

    if (sid) {
        sessionModel.deleteSession(sid);
        res.clearCookie('sid');
    }
    res.redirect('/');
};

module.exports = controllers;