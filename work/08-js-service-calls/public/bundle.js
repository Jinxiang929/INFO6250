/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord),
/* harmony export */   updateWord: () => (/* binding */ updateWord)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  })["catch"](function (err) {
    if (err.error === 'auth-insufficient') {
      return Promise.reject({
        error: 'auth-insufficient',
        message: 'User not allowed!'
      });
    }
    if (err.message && err.message.includes('Failed to fetch')) {
      return Promise.reject({
        error: 'network-error',
        message: 'You are offline. Please check your internet connection.'
      });
    }
    return Promise.reject({
      error: 'unknown-error',
      message: 'An unexpected error occurred.'
    });
  });
}
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
    credentials: 'include'
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.json());
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.json());
  })["catch"](function (err) {
    return Promise.reject(err);
  });
}
function fetchWord() {
  return fetch('/api/word').then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.json());
  });
}
function updateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
function render(state) {
  var app = document.querySelector('#app');
  if (!state.username) {
    app.innerHTML = "\n            <div class=\"container\">\n                <h1>Login</h1>\n                <label for=\"username\">Username:</label>\n                <input type=\"text\" id=\"username\">\n                <button id=\"login-button\">Login</button>\n                <p id=\"error-message\">".concat(state.errorMessage || '', "</p>\n            </div>\n        ");
  } else {
    app.innerHTML = "\n            <div class=\"container\">\n                <p><button id=\"logout-button\">Logout</button></p>\n                <p>Hi, ".concat(state.username, "!</p>\n                <p>Your stored word is: <span id=\"stored-word\">").concat(state.storedWord || '', "</span></p>\n                <label for=\"input-word\">Type a new word to store:</label>\n                <input type=\"text\" id=\"input-word\">\n                <p><button id=\"update-button\">Update</button></p>\n                <p id=\"error-message\">").concat(state.errorMessage || '', "</p>\n                <p id=\"success-message\">").concat(state.successMessage || '', "</p>\n            </div>\n        ");
  }
}

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
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateState: () => (/* binding */ updateState)
/* harmony export */ });
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./src/view.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var state = {
  username: '',
  storedWord: '',
  errorMessage: '',
  successMessage: ''
};
function updateState(newState) {
  state = _objectSpread(_objectSpread({}, state), newState);
}
document.querySelector('#app').addEventListener('click', function (event) {
  if (event.target.id === 'login-button') {
    var username = document.querySelector('#username').value;
    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function () {
      updateState({
        errorMessage: ''
      });
      checkSession();
    })["catch"](function (err) {
      var errorMessage = '';
      if (err.error === 'auth-insufficient') {
        errorMessage = "User not allowed!";
      } else if (err.error === 'required-username') {
        errorMessage = "Username is required!";
      } else if (err.error === 'network-error') {
        errorMessage = "You are offline. Please check your internet connection.";
      } else {
        errorMessage = "Invalid Username!";
      }
      updateState({
        errorMessage: errorMessage
      });
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    });
  }
  if (event.target.id === 'update-button') {
    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function () {
      var newWord = document.querySelector('#input-word').value;
      (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.updateWord)(newWord).then(function (_ref) {
        var storedWord = _ref.storedWord;
        updateState({
          storedWord: storedWord,
          successMessage: "Update successful!",
          errorMessage: ''
        });
        (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)(state);
      })["catch"](function (err) {
        if (err.error === 'network-error') {
          updateState({
            errorMessage: "You are offline. Please check your internet connection.",
            successMessage: ''
          });
        } else {
          updateState({
            errorMessage: "Invalid word!",
            successMessage: ''
          });
        }
        (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)(state);
      });
    })["catch"](function (err) {
      if (err.message && err.message.includes('Failed to fetch')) {
        updateState({
          errorMessage: "You are offline. Please check your internet connection.",
          successMessage: ''
        });
      } else {
        updateState({
          errorMessage: "Login is required!",
          successMessage: ''
        });
      }
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    });
  }
  if (event.target.id === 'logout-button') {
    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
      updateState({
        username: '',
        storedWord: '',
        errorMessage: '',
        successMessage: ''
      });
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    });
  }
});
function checkSession() {
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (_ref2) {
    var username = _ref2.username;
    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchWord)().then(function (_ref3) {
      var storedWord = _ref3.storedWord;
      updateState({
        username: username,
        storedWord: storedWord
      });
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    });
  })["catch"](function (err) {
    if (err.message && err.message.includes('Failed to fetch')) {
      updateState({
        username: '',
        storedWord: '',
        errorMessage: 'You are offline. Please check your internet connection.'
      });
    } else {
      updateState({
        username: '',
        storedWord: '',
        errorMessage: 'Please login to continue.'
      });
    }
    (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)(state);
  });
}
checkSession();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map