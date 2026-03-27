"use strict";

const uuid = require('crypto').randomUUID;

const sessions = {};
const usersInSessions = {}; 

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  
  if(!usersInSessions[username]) {
    usersInSessions[username] = 0;
  }
  usersInSessions[username] += 1;
  
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  const username = sessions[sid]?.username;
  
  if(username) {
    usersInSessions[username] -= 1;
    
    if(usersInSessions[username] <= 0) {
      delete usersInSessions[username];
    }
  }
  
  delete sessions[sid];
}

function getActiveUsers() {
  return Object.keys(usersInSessions);
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getActiveUsers,
};