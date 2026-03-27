"use strict";

const wordFor = {};

function isValidUsername(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function isValidWord(word) {
    let isValid = true;
    isValid = isValid && word.match(/^[A-Za-z]*$/);
    return isValid;
}

function isPermitted(username) {
    return username !== 'dog';
}

function getUserWord(username) {
    return wordFor[username] || null;
}

function addUserWord(username, userWord) {
    wordFor[username] = userWord;
}

export default {
    isValidUsername,
    isValidWord,
    isPermitted,
    getUserWord,
    addUserWord,
    wordFor,
};