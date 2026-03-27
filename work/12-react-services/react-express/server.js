"use strict";

import express from 'express';
import cookieParser from 'cookie-parser';
import { authController } from './backend/controllers/auth-controller.js';
import { wordController } from './backend/controllers/word-controller.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', authController.checkSession);
app.post('/api/v1/session', authController.createSession);
app.delete('/api/v1/session', authController.endSession);

app.get('/api/v1/word', wordController.getWord);
app.put('/api/v1/word', wordController.addWord);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
