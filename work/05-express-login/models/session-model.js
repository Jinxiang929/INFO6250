"use strict";

const crypto = require('crypto');

const sessions = {};
const users = {};

const isValidUsername = (username) => /^[a-zA-Z0-9]+$/.test(username) && (username !== 'dog');

const createSession = (username) => {
    const sid = crypto.randomUUID();
    sessions[sid] = { username };
    if (!users[username]) {
        users[username] = "";
    }
    return sid;
};

const deleteSession = (sid) => {
    delete sessions[sid];
};

const getSession = (sid) => sessions[sid];

module.exports = {
    isValidUsername,
    createSession,
    deleteSession,
    getSession,
};

