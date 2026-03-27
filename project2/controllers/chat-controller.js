"use strict";

const sessions = require('../models/sessions');
const users = require('../models/users');
const messages = require('../models/messages');

const chatController = {};

chatController.getMessages = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(messages.getMessages());
};

chatController.addMessage = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { text } = req.body;

  if(!text || !text.trim()) {
    res.status(400).json({ error: 'required-message' });
    return;
  }

  const id = messages.addMessage(username, text);
  res.json(messages.getMessage(id));
};

chatController.getActiveUsers = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(sessions.getActiveUsers());
};

module.exports = chatController;