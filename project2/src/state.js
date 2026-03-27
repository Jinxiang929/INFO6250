import { MESSAGES } from './constants';

const state = {
  isLoggedIn: false,
  isLoginPending: true,
  isDataPending: false,
  username: '',
  messages: [],
  activeUsers: [],
  error: '',
  pollingId: null,
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = [];
  state.activeUsers = [];
  state.error = '';
  stopPolling();
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.activeUsers = [];
  state.error = '';
  stopPolling();
}

export function waitOnData() {
  state.isDataPending = true;
  state.error = '';
}

export function setMessages(messages) {
  state.messages = messages;
  state.isDataPending = false;
  state.error = '';
}

export function setActiveUsers(users) {
  state.activeUsers = users;
  state.isDataPending = false;
  state.error = '';
}

export function startPolling(pollFn, interval) {
  if (state.pollingId) {
    stopPolling();
  }
  state.pollingId = setInterval(pollFn, interval);
}

export function stopPolling() {
  if (state.pollingId) {
    clearInterval(state.pollingId);
    state.pollingId = null;
  }
}

export function setError(error) {
  console.error(error);
  state.isLoginPending = false;
  state.isDataPending = false;
  state.error = MESSAGES[error] || MESSAGES.default;
}

export function setValidationError(error) {
  console.error(error);
  state.isDataPending = false;
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;