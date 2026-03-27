const users = {};

function isValidUsername(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
};

function isPermitted(username) {
    return username !== 'dog';
};

function getUserData(username) {
    return users[username];

};

function getUserRole(username) {
    return users[username]?.role;
}

function addUserData(username, userData) {
    users[username] = userData;
};

function usernameExists(username) {
    return !!users[username];
}

export default {
    isValidUsername,
    isPermitted,
    getUserData,
    getUserRole,
    addUserData,
    usernameExists,
};