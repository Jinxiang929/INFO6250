function render({ state, appEl }) {
  const html = `
    <main class="app">
      ${generateStatusHtml(state)}
      ${generateLoginHtml(state)}
      ${generateChatHtml(state)}
    </main>
  `;
  appEl.innerHTML = html;
}

function generateStatusHtml(state) {
  return `
    <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">
        <div class="loading">
          <div class="loading__spinner"></div>
          <div class="loading__text">Loading user...Please wait</div>
        </div>
      </div>
    `;
  }
  
  if (state.isLoggedIn) {
    return '';
  }

  return `
    <div class="login">
      <h1>Chat App</h1>
      <form class="login__form" action="#login">
        <label for="login__username">
          <span>Username:</span>
          <input id="login__username" class="login__username" value="">
        </label>
        <button class="login__button" type="submit">Login</button>
      </form>
    </div>
  `;
}

function generateChatHtml(state) {
  if (!state.isLoggedIn) {
    return '';
  }

  const messagesLoading = state.isDataPending ? 
    `<div class="loading">
      <div class="loading__spinner"></div>
      <div class="loading__text">Loading messages...Please wait</div>
    </div>` : '';

  return `
    <div class="chat">
      ${generateUsersPanel(state)}
      <div class="chat-panel">
        ${generateChatHeader(state)}
        <div class="messages">
          ${messagesLoading || generateMessagesHtml(state)}
        </div>
        ${generateMessageForm(state)}
      </div>
    </div>
  `;
}

function generateUsersPanel(state) {
  return `
    <div class="users-panel">
      <h2 class="users-panel__title">Active Users</h2>
      <ul class="users-list">
        ${generateUsersListHtml(state)}
      </ul>
    </div>
  `;
}

function generateChatHeader(state) {
  return `
    <div class="chat-panel__header">
      <h2 class="chat-panel__title">Chat Room</h2>
      <div class="chat-panel__controls">
        <button class="controls__refresh">Refresh</button>
        <button class="controls__logout">Logout</button>
      </div>
    </div>
  `;
}

function generateMessagesHtml(state) {
  if (!state.messages.length) {
    return '<div class="messages__empty">No messages yet.</div>';
  }

  return state.messages.map(message => {
    const isOwnMessage = message.username === state.username;
    const messageClass = isOwnMessage ? 'message--self' : 'message--others';
    
    return `
      <div class="message ${messageClass}">
        <div class="message__header">
          <span class="message__username">${message.username}</span>
        </div>
        <p class="message__text">${message.text}</p>
      </div>
    `;
  }).join('');
}

function generateMessageForm(state) {
  return `
    <form class="message-form" action="#send">
      <label for="message-form__input" class="visually-hidden">Message:</label>
      <input id="message-form__input" class="message-form__input">
      <button class="message-form__button" type="submit">Send</button>
    </form>
  `;
}

function generateUsersListHtml(state) {
  if (!state.activeUsers.length) {
    return '<li class="users-list__item">No active user</li>';
  }
  
  return state.activeUsers.map(username => {
    const isCurrentUser = username === state.username;
    const userClass = isCurrentUser ? 'users-list__item--current' : '';
    return `
      <li class="users-list__item ${userClass}">
        ${username} ${isCurrentUser ? '(you)' : ''}
      </li>
    `;
  }).join('');
}

function updateMessagesAndUsers({ state, appEl }) {
  const messagesContainer = appEl.querySelector('.messages');
  const usersPanel = appEl.querySelector('.users-panel');
  
  if (messagesContainer) {
    messagesContainer.innerHTML = state.isDataPending ? 
      `<div class="loading">
        <div class="loading__spinner"></div>
        <div class="loading__text">Loading messages...Please wait</div>
      </div>` : 
      generateMessagesHtml(state);
  }
  
  if (usersPanel) {
    usersPanel.innerHTML = `
      <h2 class="users-panel__title">Active Users</h2>
      <ul class="users-list">
        ${generateUsersListHtml(state)}
      </ul>
    `;
  }
}

export { updateMessagesAndUsers };
export default render;