const model = require('./chat-model'); // holds all the non-web logic for managing users/messages
const view = require('./chat-view'); // holds the templates for the generated HTML

const controllers = {};

controllers.viewChat = function( req, res ) {
  res.send(view.chatPage(model));
};

controllers.postMessage = function( req, res ) {
  const { sender, text } = req.body; 
  model.addMessage({ sender, text });
  res.redirect('/'); // Redirect to the home page
};

module.exports = controllers;

