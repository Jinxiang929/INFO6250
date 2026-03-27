"use strict";

const uuid = require('crypto').randomUUID;

const messageList = {};
const messageOrder = []; 

function addMessage(username, text) {
  const id = uuid();
  
  messageList[id] = {
    id,
    username,
    text,
  };
  
  messageOrder.push(id);
  
  return id;
}

function getMessage(id) {
  return messageList[id];
}

function getMessages() {
  
  return messageOrder.map(id => messageList[id]);
}

module.exports = {
  addMessage,
  getMessage,
  getMessages
};