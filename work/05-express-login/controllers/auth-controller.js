"use strict";

const sessionModel = require('../models/session-model');  
const senderLoginView = require('../views/login');  
const errorView = require('../views/error');  

const controllers = {};

controllers.showLogin = function(req, res) {
    const sid = req.cookies.sid;
    const session = sessionModel.getSession(sid);

    if (sid && session) {
        res.redirect('/data');
        return;
    }
    res.send(senderLoginView.loginPage());
};

controllers.handleLogin = function(req, res) {
    const { username } = req.body;
    if (!username || !sessionModel.isValidUsername(username)) {
        res.clearCookie('sid');
        const message = username === 'dog' ? "User not allowed!" : "Invalid Username! Please try again.";
        const statusCode = username === 'dog' ? 403 : 400;

        res.status(statusCode).send(errorView.renderError({ message, statusCode }));
        return;
    }
    const sid = sessionModel.createSession(username);
    res.cookie('sid', sid);
    res.redirect('/data');
};

controllers.handleLogout = function(req, res) {
    const sid = req.cookies.sid;
    if (sid) {
        sessionModel.deleteSession(sid);
        res.clearCookie('sid');
    }
    res.redirect('/');
};

module.exports = controllers;



