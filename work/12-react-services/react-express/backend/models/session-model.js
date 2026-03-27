"use strict";

import {randomUUID as uuid} from 'crypto';

const session = {};

function addSession(username) {
    const sid = uuid();
    session[sid] = {
        username,
    };
    return sid;
};

function getSessionUser(sid) {
    return session[sid]?.username;
}

function deleteSession(sid) {
    delete session[sid];
}

export default {
    addSession,
    deleteSession,
    getSessionUser,
};