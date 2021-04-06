const express = require("express");
const bodyParser = require("body-parser");

const leaderIdRouter = express.Router();

leaderIdRouter.get(express.json());
const authenticate = require('../../authenticate');
const Leaders = require("../../models/leaders");

leaderIdRouter.route('/:leaderId')
.get((req , res,next)=>{
  Leaders.findById(req.params.leaderId)
  .then(promo=>{
    res.status = 200;
    res.setHeader('Content-Type','application/json');
    res.json(promo);
  },err=>{next(err)})
  .catch(err=>{next(err)})
})
.post(authenticate.verifyUser,(req , res,next)=>{
res.status = 404;
res.end('Post operation not supported for leaders/'
+req.params.leaderId);}) 
.put(authenticate.verifyUser,(req,res,next)=>{
console.log(req.body);
console.log(req.params.leaderId);
Leaders.findByIdAndUpdate(
  req.params.leaderId,
  {$set:req.body},{new:true,useFindAndModify:false})
  .then(promo=>{
    res.status = 200;
    res.setHeader("Content-Type","application/json");
    res.json(promo);
  },
  err=>next(err)).catch(err=>next(err));
})
.delete(authenticate.verifyUser,(req,res,next)=>{
console.log(req.params.leaderId);
Leaders.findByIdAndRemove(req.params.leaderId)
.then(resp=>{
  res.status = 200;
  res.setHeader("Content-Type",'application/json');
  res.json(resp);
},err=>next(err))
.catch(err=>next(err));
});

module.exports = leaderIdRouter;