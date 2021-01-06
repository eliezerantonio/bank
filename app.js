var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var clientsRouter = require('./src/routes/clients_router');
var employeeRouter = require('./src/routes/employee_router');
var accountRouter = require('./src/routes/account_router');
var cardRouter = require('./src/routes/card_routers');
var loanRouter = require('./src/routes/loan_router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/client', clientsRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/account', accountRouter);
app.use('/api/card', cardRouter);
app.use('/api/loan', loanRouter);


module.exports = app;