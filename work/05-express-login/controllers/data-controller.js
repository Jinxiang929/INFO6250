"use strict";

const sessionModel = require('../models/session-model');  
const userModel = require('../models/user-model');  
const userDataView = require('../views/data');  

const controllers = {};

controllers.showData = function(req, res) {
    const sid = req.cookies.sid;
    const session = sessionModel.getSession(sid);

    if (!session) {
        res.clearCookie('sid');
        res.redirect('/');
        return;
    }
    const username = session.username;
    const storedWord = userModel.getUserData(username);
    res.send(userDataView.renderData({ username, storedWord }));
};

controllers.updateWord = function(req, res) {
    const sid = req.cookies.sid;
    const session = sessionModel.getSession(sid);

    if (!session) {
        res.redirect('/');
        return;
    }

    const username = session.username;
    userModel.setUserData(username, req.body.newWord || "");
    res.redirect('/');
};

module.exports = controllers;


