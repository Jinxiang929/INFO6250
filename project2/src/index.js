import { CLIENT, SERVER } from './constants';

import state, {
  login,
  logout,
  setMessages,
  setActiveUsers,
  setError,
} from './state';

import {
  fetchSession,
  fetchMessages,
  fetchUsers,
} from './services';

import render from './render';

import {
  addAbilityToLogin,
  addAbilityToLogout,
  addAbilityToRefresh,
  addAbilityToSendMessage,
  startPollingForUpdates,
} from './listeners';

const appEl = document.querySelector('#app');

render({ state, appEl });
addAbilityToLogin({ state, appEl });
addAbilityToLogout({ state, appEl });
addAbilityToRefresh({ state, appEl });
addAbilityToSendMessage({ state, appEl });
checkForSession();

function checkForSession() {
  fetchSession()
    .then(session => {
      login(session.username);
      render({ state, appEl });
      return Promise.all([
        fetchMessages(),
        fetchUsers()
      ]);
    })
    .catch(err => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION });
      }
      return Promise.reject(err);
    })
    .then(([messages, users]) => {
      setMessages(messages);
      setActiveUsers(users);
      render({ state, appEl });
      
      startPollingForUpdates({ state, appEl });
    })
    .catch(err => {
      if (err?.error === CLIENT.NO_SESSION) {
        logout();
        render({ state, appEl });
        return;
      }
      
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
}