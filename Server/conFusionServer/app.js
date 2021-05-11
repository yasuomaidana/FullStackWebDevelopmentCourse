/*We created this structure using express-generator
then we run in command console express conFusion

For storing and using data we installed 
express-session
session-file-store

For using passport install
passport
passport-local
passport-local-mongoose

To use tokens we installed 
passport-jwt
jsonwebtoken
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

//Import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishes/dishRouter');
var promoRouter = require('./routes/promotions/promotionsRouter');
var leaderRouter = require('./routes/leaders/leaderRouter');

//Adds mongoose stuffs
const mongoose = require("mongoose");

//Url Stuffs
const url = config.mongoUrl;

//Connect to database
const connect = mongoose.connect(url);

connect.then(db=>{
  console.log("Connected correctly to server"); 
}, err=>{ console.log("Error");});

var app = express();

app.all('*',(req,res,next)=>{
  if(req.secure) {
    return next();}
  else{
    res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+req.url);

  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use(auth); We are using authenticate and config

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

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
