const express = require("express");
const bodyParser = require("body-parser");

const promoIdRouter = express.Router();
 
promoIdRouter.get(bodyParser.json());
const Promotions = require("../../models/promotions");

promoIdRouter.route('/:promoId')
.get((req , res,next)=>{
    Promotions.findById(req.params.promoId)
    .then(promo=>{
      res.status = 200;
      res.setHeader('Content-Type','application/json');
      res.json(promo);
    },err=>{next(err)})
    .catch(err=>{next(err)})
  })
.post((req , res,next)=>{
  res.status = 404;
  res.end('Post operation not supported for promotions/'
  +req.params.promoId);}) 
.put((req,res,next)=>{
  console.log(req.body);
  console.log(req.params.promoId);
  Promotions.findByIdAndUpdate(
    req.params.promoId,
    {$set:req.body},{new:true,useFindAndModify:false})
    .then(promo=>{
      res.status = 200;
      res.setHeader("Content-Type","application/json");
      res.json(promo);
    },
    err=>next(err)).catch(err=>next(err));
})
.delete((req,res,next)=>{
  console.log(req.params.promoId);
  Promotions.findByIdAndRemove(req.params.promoId)
  .then(resp=>{
    res.status = 200;
    res.setHeader("Content-Type",'application/json');
    res.json(resp);
  },err=>next(err))
  .catch(err=>next(err));
});

module.exports = promoIdRouter;