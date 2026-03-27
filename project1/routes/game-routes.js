"use strict";

const express = require('express');
const gameController = require('../controllers/game-controller');

const router = express.Router();

router.get('/', gameController.showGame);
router.post('/guess', gameController.makeGuess);
router.post('/new-game', gameController.resetGame);

module.exports = router;