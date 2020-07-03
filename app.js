var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Declaring variables that get files from path we choose.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var libraryRouter = require('./routes/library');

var app = express();
// Express session
var session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// From express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

// From express message and connect flash
app.use(require('connect-flash')());
app.use(function (req, res, next) 
{
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Setting name for URL of website and call the variables that declared what path it is.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/library', libraryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
