"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000

const authRoutes = require('./routes/auth-routes');
const gameRoutes = require('./routes/game-routes');

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoutes);
app.use('/game', gameRoutes);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));