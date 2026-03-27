/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   POLLING_INTERVAL: () => (/* binding */ POLLING_INTERVAL),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'You are offline, please check your network connection.'), SERVER.AUTH_INSUFFICIENT, 'Your username is not permitted. Please use another username.'), SERVER.REQUIRED_USERNAME, 'Username must only have letters, numbers and underscores within 20 characters!'), SERVER.REQUIRED_MESSAGE, 'Message cannot be empty!'), "default", 'Session expired. Please login again.');
var POLLING_INTERVAL = 5000;

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAbilityToLogin: () => (/* binding */ addAbilityToLogin),
/* harmony export */   addAbilityToLogout: () => (/* binding */ addAbilityToLogout),
/* harmony export */   addAbilityToRefresh: () => (/* binding */ addAbilityToRefresh),
/* harmony export */   addAbilityToSendMessage: () => (/* binding */ addAbilityToSendMessage),
/* harmony export */   startPollingForUpdates: () => (/* binding */ startPollingForUpdates)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    e.preventDefault();
    var username = appEl.querySelector('.login__username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (data) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(data.messages || []);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setActiveUsers)(data.activeUsers || []);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      startPollingForUpdates({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__logout')) {
      return;
    }
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToRefresh(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__refresh')) {
      return;
    }
    refreshData({
      state: state,
      appEl: appEl
    });
  });
}
function addAbilityToSendMessage(_ref4) {
  var state = _ref4.state,
    appEl = _ref4.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('message-form')) {
      return;
    }
    e.preventDefault();
    var messageInput = appEl.querySelector('.message-form__input');
    var text = messageInput.value;
    if (!text) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setValidationError)(_constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.REQUIRED_MESSAGE);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return;
    }
    messageInput.value = '';
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSendMessage)(text).then(function () {
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)();
    }).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      if (state.isLoggedIn && ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING || (err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION)) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('default');
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
        return;
      }
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function refreshData(_ref5) {
  var state = _ref5.state,
    appEl = _ref5.appEl;
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnData)();
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
    state: state,
    appEl: appEl
  });
  Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)()]).then(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
      messages = _ref7[0],
      users = _ref7[1];
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setActiveUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
  })["catch"](function (err) {
    if (state.isLoggedIn && ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING || (err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION)) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('default');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
  });
}
function startPollingForUpdates(_ref8) {
  var state = _ref8.state,
    appEl = _ref8.appEl;
  var pollFn = function pollFn() {
    Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)()]).then(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
        messages = _ref10[0],
        users = _ref10[1];
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setActiveUsers)(users);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.updateMessagesAndUsers)({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      if (state.isLoggedIn && ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING || (err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION)) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('default');
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
        return;
      }
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  };
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.startPolling)(pollFn, _constants__WEBPACK_IMPORTED_MODULE_3__.POLLING_INTERVAL);
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   updateMessagesAndUsers: () => (/* binding */ updateMessagesAndUsers)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    <main class=\"app\">\n      ".concat(generateStatusHtml(state), "\n      ").concat(generateLoginHtml(state), "\n      ").concat(generateChatHtml(state), "\n    </main>\n  ");
  appEl.innerHTML = html;
}
function generateStatusHtml(state) {
  return "\n    <div class=\"status\">".concat(state.error, "</div>\n  ");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"login__waiting\">\n        <div class=\"loading\">\n          <div class=\"loading__spinner\"></div>\n          <div class=\"loading__text\">Loading user...Please wait</div>\n        </div>\n      </div>\n    ";
  }
  if (state.isLoggedIn) {
    return '';
  }
  return "\n    <div class=\"login\">\n      <h1>Chat App</h1>\n      <form class=\"login__form\" action=\"#login\">\n        <label for=\"login__username\">\n          <span>Username:</span>\n          <input id=\"login__username\" class=\"login__username\" value=\"\">\n        </label>\n        <button class=\"login__button\" type=\"submit\">Login</button>\n      </form>\n    </div>\n  ";
}
function generateChatHtml(state) {
  if (!state.isLoggedIn) {
    return '';
  }
  var messagesLoading = state.isDataPending ? "<div class=\"loading\">\n      <div class=\"loading__spinner\"></div>\n      <div class=\"loading__text\">Loading messages...Please wait</div>\n    </div>" : '';
  return "\n    <div class=\"chat\">\n      ".concat(generateUsersPanel(state), "\n      <div class=\"chat-panel\">\n        ").concat(generateChatHeader(state), "\n        <div class=\"messages\">\n          ").concat(messagesLoading || generateMessagesHtml(state), "\n        </div>\n        ").concat(generateMessageForm(state), "\n      </div>\n    </div>\n  ");
}
function generateUsersPanel(state) {
  return "\n    <div class=\"users-panel\">\n      <h2 class=\"users-panel__title\">Active Users</h2>\n      <ul class=\"users-list\">\n        ".concat(generateUsersListHtml(state), "\n      </ul>\n    </div>\n  ");
}
function generateChatHeader(state) {
  return "\n    <div class=\"chat-panel__header\">\n      <h2 class=\"chat-panel__title\">Chat Room</h2>\n      <div class=\"chat-panel__controls\">\n        <button class=\"controls__refresh\">Refresh</button>\n        <button class=\"controls__logout\">Logout</button>\n      </div>\n    </div>\n  ";
}
function generateMessagesHtml(state) {
  if (!state.messages.length) {
    return '<div class="messages__empty">No messages yet.</div>';
  }
  return state.messages.map(function (message) {
    var isOwnMessage = message.username === state.username;
    var messageClass = isOwnMessage ? 'message--self' : 'message--others';
    return "\n      <div class=\"message ".concat(messageClass, "\">\n        <div class=\"message__header\">\n          <span class=\"message__username\">").concat(message.username, "</span>\n        </div>\n        <p class=\"message__text\">").concat(message.text, "</p>\n      </div>\n    ");
  }).join('');
}
function generateMessageForm(state) {
  return "\n    <form class=\"message-form\" action=\"#send\">\n      <label for=\"message-form__input\" class=\"visually-hidden\">Message:</label>\n      <input id=\"message-form__input\" class=\"message-form__input\">\n      <button class=\"message-form__button\" type=\"submit\">Send</button>\n    </form>\n  ";
}
function generateUsersListHtml(state) {
  if (!state.activeUsers.length) {
    return '<li class="users-list__item">No active user</li>';
  }
  return state.activeUsers.map(function (username) {
    var isCurrentUser = username === state.username;
    var userClass = isCurrentUser ? 'users-list__item--current' : '';
    return "\n      <li class=\"users-list__item ".concat(userClass, "\">\n        ").concat(username, " ").concat(isCurrentUser ? '(you)' : '', "\n      </li>\n    ");
  }).join('');
}
function updateMessagesAndUsers(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  var messagesContainer = appEl.querySelector('.messages');
  var usersPanel = appEl.querySelector('.users-panel');
  if (messagesContainer) {
    messagesContainer.innerHTML = state.isDataPending ? "<div class=\"loading\">\n        <div class=\"loading__spinner\"></div>\n        <div class=\"loading__text\">Loading messages...Please wait</div>\n      </div>" : generateMessagesHtml(state);
  }
  if (usersPanel) {
    usersPanel.innerHTML = "\n      <h2 class=\"users-panel__title\">Active Users</h2>\n      <ul class=\"users-list\">\n        ".concat(generateUsersListHtml(state), "\n      </ul>\n    ");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchSendMessage: () => (/* binding */ fetchSendMessage),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSession() {
  return fetch('/api/v1/session')["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch('/api/v1/messages')["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUsers() {
  return fetch('/api/v1/users')["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSendMessage(text) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      text: text
    })
  })["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setActiveUsers: () => (/* binding */ setActiveUsers),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   setValidationError: () => (/* binding */ setValidationError),
/* harmony export */   startPolling: () => (/* binding */ startPolling),
/* harmony export */   stopPolling: () => (/* binding */ stopPolling),
/* harmony export */   waitOnData: () => (/* binding */ waitOnData),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  isLoggedIn: false,
  isLoginPending: true,
  isDataPending: false,
  username: '',
  messages: [],
  activeUsers: [],
  error: '',
  pollingId: null
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = [];
  state.activeUsers = [];
  state.error = '';
  stopPolling();
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.activeUsers = [];
  state.error = '';
  stopPolling();
}
function waitOnData() {
  state.isDataPending = true;
  state.error = '';
}
function setMessages(messages) {
  state.messages = messages;
  state.isDataPending = false;
  state.error = '';
}
function setActiveUsers(users) {
  state.activeUsers = users;
  state.isDataPending = false;
  state.error = '';
}
function startPolling(pollFn, interval) {
  if (state.pollingId) {
    stopPolling();
  }
  state.pollingId = setInterval(pollFn, interval);
}
function stopPolling() {
  if (state.pollingId) {
    clearInterval(state.pollingId);
    state.pollingId = null;
  }
}
function setError(error) {
  console.error(error);
  state.isLoginPending = false;
  state.isDataPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
function setValidationError(error) {
  console.error(error);
  state.isDataPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToRefresh)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToSendMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession();
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUsers)()]);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      messages = _ref2[0],
      users = _ref2[1];
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setActiveUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_listeners__WEBPACK_IMPORTED_MODULE_4__.startPollingForUpdates)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map