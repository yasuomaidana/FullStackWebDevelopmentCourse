//We created this structure using express-generator
//then we run in command console express conFusion

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishes/dishRouter');
var promoRouter = require('./routes/promotions/promotionsRouter');
var leaderRouter = require('./routes/leaders/leaderRouter');

//Adds mongoose stuffs
const mongoose = require("mongoose");

//Url Stuffs
const url = "mongodb://localhost:27017/conFusion";

//Connect to database
const connect = mongoose.connect(url);

connect.then(db=>{
  console.log("Connected correctly to server"); 
}, err=>{ console.log("Error");});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('1234'));
app.use(express.static(path.join(__dirname, 'public')));

//Autentication stuffs
function authErr(req,res,next){
  var err = new Error("You are not authenticated");
  res.setHeader('WWW-Authenticate','Basic');
  err.status = 401;
  console.log("Authentification error");
  next(err);
}
function authManual(req,res,next){
  console.log(req.headers);
  
  var authHeaders = req.headers.authorization;
  if (!authHeaders){
    authErr(req,res,next);
    return;
  }
  
  var auth = new Buffer.from(authHeaders.split(' ')[1],'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];

  if(username === 'admin' && password === 'password'){
    res.cookie("user",username,{signed:true});
    next();
  }
  else{
    authErr(req,res,next);
  }
}

function auth(req,res,next){
  console.log(req.signedCookies);
  if(!req.signedCookies.user){
    return authManual(req,res,next);
  }
  else{
    if(req.signedCookies.user === "admin"){
      next();
    }
    else{
      authErr(req,res,next);
    }
  }
}

app.use(auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
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
