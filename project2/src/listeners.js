import {
  fetchLogin,
  fetchLogout,
  fetchMessages,
  fetchUsers,
  fetchSendMessage,
} from './services';

import {
  waitOnLogin,
  login,
  logout,
  waitOnData,
  setMessages,
  setActiveUsers,
  setError,
  setValidationError,
  startPolling,
} from './state';

import render, { updateMessagesAndUsers } from './render';
import { POLLING_INTERVAL, CLIENT, SERVER } from './constants';

export function addAbilityToLogin({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    
    e.preventDefault();
    const username = appEl.querySelector('.login__username').value;
    
    waitOnLogin();
    render({ state, appEl });
    
    fetchLogin(username)
      .then(data => {
        login(username);
        setMessages(data.messages || []);
        setActiveUsers(data.activeUsers || []);
        render({ state, appEl });
        
        startPollingForUpdates({ state, appEl });
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      });
  });
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('controls__logout')) {
      return;
    }
    
    fetchLogout()
      .then(() => {
        logout();
        render({ state, appEl });
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      });
  });
}

export function addAbilityToRefresh({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('controls__refresh')) {
      return;
    }
    
    refreshData({ state, appEl });
  });
}

export function addAbilityToSendMessage({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('message-form')) {
      return;
    }
    
    e.preventDefault();
    const messageInput = appEl.querySelector('.message-form__input');
    const text = messageInput.value;
    
    if (!text) {
     
      setValidationError(SERVER.REQUIRED_MESSAGE);
      render({ state, appEl });
      return;
    }
    
    messageInput.value = '';
    
    fetchSendMessage(text)
      .then(() => {
        return fetchMessages();
      })
      .then(messages => {
        setMessages(messages);
        render({ state, appEl });
      })
      .catch(err => {
        
        if (state.isLoggedIn && (err?.error === SERVER.AUTH_MISSING || err?.error === CLIENT.NO_SESSION)) {
          logout();
          setError('default'); 
          render({ state, appEl });
          return;
        }
        
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      });
  });
}

function refreshData({ state, appEl }) {
  waitOnData();
  render({ state, appEl });
  
  Promise.all([
    fetchMessages(),
    fetchUsers()
  ])
    .then(([messages, users]) => {
      setMessages(messages);
      setActiveUsers(users);
      render({ state, appEl });
    })
    .catch(err => {
      
      if (state.isLoggedIn && (err?.error === SERVER.AUTH_MISSING || err?.error === CLIENT.NO_SESSION)) {
        logout();
        setError('default'); 
        render({ state, appEl });
        return;
      }
      
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
}

export function startPollingForUpdates({ state, appEl }) {
  const pollFn = () => {
 
    Promise.all([
      fetchMessages(),
      fetchUsers()
    ])
      .then(([messages, users]) => {
        setMessages(messages);
        setActiveUsers(users);
        
        updateMessagesAndUsers({ state, appEl });
      })
      .catch(err => {
        
        if (state.isLoggedIn && (err?.error === SERVER.AUTH_MISSING || err?.error === CLIENT.NO_SESSION)) {
          logout();
          setError('default'); 
          render({ state, appEl });
          return;
        }
        
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      });
  };
  
  startPolling(pollFn, POLLING_INTERVAL);
}