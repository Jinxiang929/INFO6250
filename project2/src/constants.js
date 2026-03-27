export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_MESSAGE: 'required-message',
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
  };
  
  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'You are offline, please check your network connection.',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username is not permitted. Please use another username.',
    [SERVER.REQUIRED_USERNAME]: 'Username must only have letters, numbers and underscores within 20 characters!',
    [SERVER.REQUIRED_MESSAGE]: 'Message cannot be empty!',
    default: 'Session expired. Please login again.',
  };
  
  export const POLLING_INTERVAL = 5000;