"use strict";

const users = {};

const setUserData = (username, data) => {
    users[username] = data;
};

const getUserData = (username) => users[username] || "";

module.exports = {
    setUserData,
    getUserData,
};
