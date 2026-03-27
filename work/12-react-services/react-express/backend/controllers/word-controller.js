"use strict";

import sessions from '../models/session-model.js';
import users from '../models/user-model.js';


    export const wordController = {};

    wordController.getWord = function(req, res) {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';

        if(!sid || !users.isValidUsername(username)) {
            res.status(401).json({ error: 'auth-missing '});
            return;
        }

        const word = users.getUserWord(username);
        res.json({ word });
    };

    wordController.addWord = function(req, res) {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';

        if(!sid || !username) {
            res.status(401).json({ error: 'auth-missing' });
            return;
        }

        const { word } = req.body;

        if(!word && word !== '') {
            res.status(400).json({ error: 'required-word' });
            return;
        }

        if(!users.isValidWord(word)) {
            res.status(400).json({ error: 'invalid-word' });
            return;
        }
        users.wordFor[username] = word;
        res.json({ username, storedWord: word });
    };
