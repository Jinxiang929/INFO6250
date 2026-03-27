export const POLLING_DELAY = 5000;

export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const USER_ROLES = {
    TEACHER: 'teacher',
    STUDENT: 'student',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_FIELDS: 'required-fields',
    USERNAME_EXISTS: 'username-exists',
    INVALID_ROLE: 'invalid-role',
    NOT_AUTHORIZED: 'not-authorized',
    ASSIGNMENT_NOT_FOUND: 'assignment-not-found',
    NO_SUBMISSION: 'no-submission',
    REQUIRED_CONTENT: 'required-content',
    USER_NOT_FOUND: 'user-not-found',
    MAX_ATTEMPTS_REACHED: 'max-attempts-reached',
    INVALID_ATTEMPTS: 'invalid-attempts',
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const PAGES = {
    LOGIN: 'login',
    REGISTER: 'register',
    ASSIGNMENTS: 'assignments',
    CREATE_ASSIGNMENT: 'create-assignment',
    EDIT_ASSIGNMENT: 'edit-assignment',
    VIEW_SUBMISSIONS: 'view-submissions',
    SUBMIT_ASSIGNMENT: 'submit-assignment',
};

export const REGISTRATION_SUCCESS = 'registration-success';
  
export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again',
    [CLIENT.NO_SESSION]: 'Your session has expired. Please log in again.',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username is not allowed',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters, numbers and/or underscores) username',
    [SERVER.REQUIRED_FIELDS]: 'Please fill in all required fields',
    [SERVER.USER_NOT_FOUND]: 'This username does not exist. Please register first.',
    [SERVER.NOT_AUTHORIZED]: 'You are not authorized to perform this action',
    [SERVER.REQUIRED_CONTENT]: 'Submission cannot be empty.',
    [SERVER.ASSIGNMENT_NOT_FOUND]: 'This assignment is not available.',
    [SERVER.MAX_ATTEMPTS_REACHED]: 'You have reached the maximum allowed submission attempts',
    [SERVER.INVALID_ATTEMPTS]: 'The number of allowed attempts must at least 1',
    [SERVER.USERNAME_EXISTS]: 'This username already exists. Please login or choose another username.',
    [REGISTRATION_SUCCESS]: 'Registration successful! Wait to go back login page',
    default: 'Something wrong. Please try again',
};