const express = require("express");
const bodyParser = require("body-parser");

const dishIdRouter = express.Router();
 
dishIdRouter.get(bodyParser.json());

dishIdRouter.route('/:dishId')
.get((req , res,next)=>{
    res.end('Will send details of dish:'
    +req.params.dishId);})
.post((req , res,next)=>{
  res.status = 404;
  res.end('Post operation not supported for dishes/'
  +req.params.dishId);}) 
.put((req,res,next)=>{
  res.write("Updating the dish:"+req.params.dishId+"\n");
  res.end('Will update  the dish :'+req.body.name +
  '\n with details :'
  +req.body.description);})
.delete((req , res,next)=>{
  res.end('Deleting dish:'+req.params.dishId);
});

module.exports = dishIdRouter;