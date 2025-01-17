const express = require('express');
const router = require('./routes/router');
const middlewareErros  = require('./middlewares/middlewareErros');
const manipulador404  = require('./middlewares/manipulador404');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.use(manipulador404);
app.use(middlewareErros);


module.exports = app;