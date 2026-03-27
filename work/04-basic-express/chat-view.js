// This object has methods that produce HTML
// - These methods are passed data used to produce the HTML
// - In this case, they are passed the model

const chatView = {
  chatPage: function(model) {
    // chatPage() returns the HTML for the page
    // it calls the other methods to generate the HTML for different sections
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Chat</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatView.getUserList(model)}
            ${chatView.getMessageList(model)}
            ${chatView.getSendMessageForm(model)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(model) {
    return `<ol class="messages">` +
    model.messages.map( message => `
      <li>
        <div class="messages">
          <div class="sender-info">
              <img class="avatar" src="images/avatar-${message.sender.toLowerCase()}.jpg" alt="avatar of ${message.sender}"/>
              <strong class="username">${message.sender}</strong>
          </div>
          <p class="message-text">${message.text}</p>
        </div>
      </li>
    `).join('') +
      // Generate the HTML for the list of messages
      `</ol>`;
  },

  getUserList: function(model) {
    // This is a bit of a complex structure
    // Lookup Object.values() in MDN
    // .map() generates a new array based on calling the callback
    // on each element of the array
    // So this .map() converts the user names to an array of HTML
    // and .join() converts the array of HTML into a single HTML string
    return `
      <div class="users-container">
        <h1>Logged In Users</h1>
        <ul class="users">
          ${Object.values(model.users).map(user => `
            <li>
              <div class="user">
                <span class="username">${user}</span>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>`;
  },

  getSendMessageForm: function(model) {
    // Generate the HTML for a form to send a message
    return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <label for="username">User:</label>
          <select name="sender" id="username">
            <option value="Amit">Amit</option>
            <option value="Bao">Bao</option>
          </select>

          <label for="message">Message:</label>
          <input type="text" name="text" id="message" required>
          <button type="submit">Send</button>
        </form>
      </div>
    `;
  }
};

// These files demonstrating various ways of building our exports
// so they are inconsistent in ways "real" projects usually wouldn't want

module.exports = chatView;
