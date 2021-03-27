const express = require("express");
const bodyParser = require("body-parser");

const promoIdRouter = express.Router();
 
promoIdRouter.get(bodyParser.json());

promoIdRouter.route('/:promoId')
.get((req , res,next)=>{
    res.end('Will send details of promotion:'+
    req.params.promoId);})
.post((req , res,next)=>{
  res.status = 404;
  res.end('Post operation not supported for promotions/'
  +req.params.promoId);}) 
.put((req,res,next)=>{
  res.write("Updating the promotion:"+req.params.promoId+"\n");
  res.end('Will update  the promotion :'+req.body.name + 
  '\n with details :'
  +req.body.description);})
.delete((req , res,next)=>{
  res.end('Deleting promo:'+req.params.promoId);
});;

module.exports = promoIdRouter;