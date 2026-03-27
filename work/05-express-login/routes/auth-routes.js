"use strict";

const express = require('express');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.get('/', authController.showLogin);
router.post('/login', authController.handleLogin);
router.post('/logout', authController.handleLogout);

module.exports = router;
