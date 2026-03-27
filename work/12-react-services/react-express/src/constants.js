export const POLLING_DELAY = 2000;

export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    INVALID_WORD: 'invalid-word'
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username is not permitted. Please use another username.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
    [SERVER.REQUIRED_WORD]: 'Word cannot be empty!',
    [SERVER.INVALID_WORD]: 'Word can only contain letters',
    [CLIENT.NO_SESSION]: 'Session expired. Please login again.',
    default: 'Something went wrong. Please try again later.',
};
