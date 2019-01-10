var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
var flash = require('connect-flash');
require('dotenv').config();

var usersRouter = require('./routes/users');
const auth = require('./routes/auth');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

var app = express();

var moment = require('moment');
app.locals.moment = require('moment');

var parseSDK = require('./config/parseSDK');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var sessionOptions = {
  key:  'eshop-session-key',
  secret: 'eshop-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
    maxAge: (24 * 60 * 60 * 1000),
    secure: false // true for https
  }
};

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/auth', auth);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.Parse = parseSDK.init();

module.exports = app;
