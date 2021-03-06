﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var loadUser = require('./routes/login');
var sessions = require('./routes/sessions');
var userPage = require('./routes/userPage');
var makeOrder = require('./routes/makeOrder');
var registration = require('./routes/registration');
var app = express();

//================
//http://nodeguide.ru/doc/dailyjs-nodepad/node-tutorial-9/
//================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'your secret here' }));

app.use('/', routes); 
app.use('/userPage', loadUser, userPage);
app.use('/makeOrder', loadUser, makeOrder);
app.use('/registration', registration);
app.use('/sessions', sessions);
app.use('/removeSessions', loadUser, function (req, res) {
    console.log("Session DELETE");
    if (req.session) {
        //TODO DELETE FROM BD
        res.clearCookie('logintoken');
        req.session.destroy(function () { });
    }
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
