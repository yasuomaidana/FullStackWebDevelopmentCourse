const express = require("express");
const bodyParser = require("body-parser");

const leaderIdRouter = express.Router();
 
leaderIdRouter.get(bodyParser.json());

leaderIdRouter.route('/:leaderId')
.get((req , res,next)=>{
    res.end('Will send details of leader:'
    +req.params.leaderId);})
.post((req , res,next)=>{
  res.status = 404;
  res.end('Post operation not supported for dishes/'
  +req.params.leaderId);}) 
.put((req,res,next)=>{
  res.write("Updating the leader:"+req.params.leaderId+"\n");
  res.end('Will update  the dish :'+req.body.name +
  '\n with details :'
  +req.body.description);})
.delete((req , res,next)=>{
  res.end('Deleting leader:'+req.params.leaderId);
});

module.exports = leaderIdRouter;