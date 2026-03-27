/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   clearCart: () => (/* binding */ clearCart),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toggleCartView: () => (/* binding */ toggleCartView),
/* harmony export */   updateCartQuantity: () => (/* binding */ updateCartQuantity)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var state = {
  products: [{
    id: "jorts",
    name: "Jorts",
    price: 0.99,
    image: "http://placehold.co/70x70?text=Jorts"
  }, {
    id: "jean",
    name: "Jean",
    price: 3.14,
    image: "http://placehold.co/70x70?text=Jean"
  }, {
    id: "nyancat",
    name: "Nyancat",
    price: 2.73,
    image: "http://placehold.co/70x70?text=Nyancat"
  }],
  cart: {},
  isCartVisible: false
};
var addToCart = function addToCart(productId) {
  var product = state.products.find(function (product) {
    return product.id === productId;
  });
  if (product) {
    if (state.cart[productId]) {
      state.cart[productId].quantity += 1;
    } else {
      state.cart[productId] = _objectSpread(_objectSpread({}, product), {}, {
        quantity: 1
      });
    }
  }
};
var updateCartQuantity = function updateCartQuantity(productId, quantity) {
  if (quantity <= 0) {
    delete state.cart[productId];
  } else if (state.cart[productId]) {
    state.cart[productId].quantity = quantity;
  }
};
var clearCart = function clearCart() {
  state.cart = {};
  state.isCartVisible = false;
};
var toggleCartView = function toggleCartView() {
  state.isCartVisible = !state.isCartVisible;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCart: () => (/* binding */ renderCart),
/* harmony export */   renderCartButton: () => (/* binding */ renderCartButton),
/* harmony export */   renderProducts: () => (/* binding */ renderProducts)
/* harmony export */ });
var appEl = document.querySelector('#app');
var renderProducts = function renderProducts(state) {
  var productsContainer = document.querySelector(".products");
  if (!productsContainer) return;
  var html = state.products.map(function (product) {
    return "\n        <li class=\"product\">\n            <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n            <p>").concat(product.name, " - $").concat(product.price.toFixed(2), "</p>\n            <button class=\"add-to-cart\" data-id=\"").concat(product.id, "\">Add to Cart</button>\n        </li>\n    ");
  }).join("");
  productsContainer.innerHTML = html;
};
var renderCart = function renderCart(state) {
  var cartContainer = document.querySelector(".cart");
  if (!cartContainer) {
    var newCartContainer = "\n            <div class=\"cart\"></div>\n        ";
    appEl.innerHTML += newCartContainer;
    cartContainer = document.querySelector(".cart");
  }
  if (!state.isCartVisible) {
    cartContainer.innerHTML = "";
    return;
  }
  var cartItemsHtml = '';
  for (var id in state.cart) {
    var item = state.cart[id];
    if (item.quantity === 0) continue;
    var total = (item.price * item.quantity).toFixed(2);
    cartItemsHtml += "\n            <li class=\"cart-item\">\n                <img src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\">\n                <p>").concat(item.name, "</p>\n                <p>Price: $").concat(item.price.toFixed(2), "</p>\n                <label for=\"quantity-").concat(id, "\">Quantity:</label>\n                <input type=\"number\" class=\"cart-quantity\" data-id=\"").concat(id, "\" value=\"").concat(item.quantity, "\" min=\"0\">\n                <p>Total: $").concat(total, "</p>\n            </li>\n        ");
  }
  if (cartItemsHtml === '') {
    cartContainer.innerHTML = "\n            <p>Nothing in the cart</p>\n            <button id=\"hide-cart\">Hide Cart</button>\n        ";
  } else {
    var totalCartPrice = 0;
    for (var _id in state.cart) {
      var _item = state.cart[_id];
      if (_item.quantity > 0) {
        totalCartPrice += _item.price * _item.quantity;
      }
    }
    totalCartPrice = totalCartPrice.toFixed(2);
    cartContainer.innerHTML = "\n            ".concat(cartItemsHtml, "\n            <p>Total: $").concat(totalCartPrice, "</p>\n            <button id=\"checkout-button\">Checkout</button>\n            <button id=\"hide-cart\">Hide Cart</button>\n        ");
  }
};
var renderCartButton = function renderCartButton(state) {
  var cartButton = document.querySelector("#cart-button");
  if (!cartButton) {
    cartButton = document.createElement("button");
    cartButton.id = "cart-button";
    appEl.prepend(cartButton);
  }
  var totalItems = 0;
  for (var id in state.cart) {
    var item = state.cart[id];
    totalItems += item.quantity;
  }
  cartButton.textContent = state.isCartVisible ? "" : "View Cart (".concat(totalItems, ")");
  if (state.isCartVisible) {
    cartButton.classList.add('hidden');
  } else {
    cartButton.classList.remove('hidden');
  }
};


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
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


var addEventListeners = function addEventListeners(state) {
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
      (0,_model__WEBPACK_IMPORTED_MODULE_0__.addToCart)(e.target.dataset.id);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)(state);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCartButton)(state);
    } else if (e.target.id === 'cart-button' || e.target.id === 'hide-cart') {
      (0,_model__WEBPACK_IMPORTED_MODULE_0__.toggleCartView)();
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)(state);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCartButton)(state);
    } else if (e.target.id === 'checkout-button') {
      (0,_model__WEBPACK_IMPORTED_MODULE_0__.clearCart)();
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)(state);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCartButton)(state);
    }
  });
  document.addEventListener('input', function (e) {
    if (e.target.classList.contains('cart-quantity')) {
      (0,_model__WEBPACK_IMPORTED_MODULE_0__.updateCartQuantity)(e.target.dataset.id, parseInt(e.target.value));
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCart)(state);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCartButton)(state);
    }
  });
};
(0,_view__WEBPACK_IMPORTED_MODULE_1__.renderProducts)(_model__WEBPACK_IMPORTED_MODULE_0__["default"]);
(0,_view__WEBPACK_IMPORTED_MODULE_1__.renderCartButton)(_model__WEBPACK_IMPORTED_MODULE_0__["default"]);
addEventListeners(_model__WEBPACK_IMPORTED_MODULE_0__["default"]);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map