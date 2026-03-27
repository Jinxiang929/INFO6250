"use strict";

const express = require('express');
const dataController = require('../controllers/data-controller');

const router = express.Router();

router.get('/', dataController.showData);
router.post('/update', dataController.updateWord);

module.exports = router;
