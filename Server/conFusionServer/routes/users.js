var express = require('express');
var router = express.Router();

//const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
 

router.use(express.json());

/* GET users listing. */
router.get('/',authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next)=>{
  User.find({}).then(users=>{
    res.status=200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  }
  ,err=>next(err)).catch(err=>next(err));
});
router.post('/signup',(req,res,next)=>{
  
  User.register(new User({username:req.body.username}),
  req.body.password,(err,user)=>{
      if(err){
        res.statusCode = 500;
        res.setHeader('Contenty-type','application/json');
        res.json({err:err});
      }
      else{
        if(req.body.firstname){
          user.firstname = req.body.firstname;
        }
        if(req.body.lastname){
          user.lastname = req.body.lastname;
        }
        user.save((err,user)=>{
          if(err){
            res.statusCode = 500;
            res.setHeader('Contenty-type','application/json');
            res.json({err:err});
            return;
          }
           passport.authenticate('local')(req,res,()=>{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json({status:"Registration succesfull",success:true});
           }); 
        }); 
     }
   });
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

router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id:req.user._id});
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token:token, status: 'You are successfully logged in!'});
});

router.get('/logout',(req,res)=>{
  console.log("session",req.session);
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/'); 
  }
  else{ authErr(req,res,next,403,'You are not logged in');} 
});
module.exports = router;
