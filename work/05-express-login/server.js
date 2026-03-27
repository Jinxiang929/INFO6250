"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const authRoutes = require('./routes/auth-routes');
const dataRoutes = require('./routes/data-routes');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/data', dataRoutes);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
