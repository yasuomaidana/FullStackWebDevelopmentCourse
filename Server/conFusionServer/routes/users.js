var express = require('express');
var router = express.Router();

//const bodyParser = require('body-parser');
var User = require('../models/user');
router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',(req,res,next)=>{
   User.findOne({username:req.body.username})
   .then(user=>{
     //console.log(user,'bla');
     if(user != null){
       //console.log("not save");
       var err = new Error("User already exists");
       err.status = 403;
       res.status(403)
       .render('error',{message:"Error 403",error:err,title:"Error"});
       next(err);
       return;
     }
     else{
       //console.log("enter to save")
       return User.create({username:req.body.username,
        password:req.body.password});
     }
   })
   .then(user =>{
     if (!user){return;}
     res.statusCode =200;
     res.setHeader('Content-Type','application/json');
     //console.log("Register user",user);
     res.json({status:"Registration succesfull",user:user});
    },err=>next(err))
   .catch(err=>next(err));
});

//Autentication stuffs
function authErr(req,res,next,num,mss){
  var err = new Error(mss);
  res.setHeader('WWW-Authenticate','Basic');
  err.status = num;
  console.log(mss,num);
  res.status(num)
  .render('error',{message:"Error :"+num,error:err,title:mss});
  next(err);
}

//Authorization stuffs
function authManual(req,res,next){
  console.log(req.headers);
  var authHeaders = req.headers.authorization;
  if (!authHeaders){
    authErr(req,res,next,401,"Not user ingressed");
    return;
  }
  
  var auth = new Buffer.from(authHeaders.split(' ')[1],'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];
  User.findOne({username:username})
  .then(user=>{
    if(user === null){ 
      authErr(req,res,next,403,"User doesn't exist");
    }
    else if(user.password !== password){
      authErr(req,res,next,403,"Your password is incorrect");
    }
    else if(user.password === password && user.username === username){
      req.session.user = 'authenticated';
      res.statusCode = 200;
      res.setHeader('Content-Type','text/plain');
      res.end('You are authenticated');
    }
  })
  .catch(err=>next(err));
}

function auth(req,res,next){
  console.log("Session",req.session);
  //console.log("User",req.session.user);
  if(!req.session.user){
    return authManual(req,res,next);
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('You are already authenticated'); 
  }
}

router.post('/login',(req,res,next)=>{
  auth(req,res,next);
});

router.get('/logout',(req,res)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/'); 
  }
  else{ authErr(req,res,next,403,'You are not logged in');} 
});
module.exports = router;
