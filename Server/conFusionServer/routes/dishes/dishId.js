const express = require("express");
const bodyParser = require("body-parser");

//Comment router
const commentRouter = require("./comments/commentRouter")

const dishIdRouter = express.Router();
 
const Dishes = require("../../models/dishes");
dishIdRouter.get(express.json());

//
const authenticate = require('../../authenticate');

dishIdRouter.route('/:dishId')
.get((req , res,next)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then(dish=>{
      //console.log("Created dish :",dish);
      res.status = 200;
      res.setHeader("Content-Type",'application/json');
      res.json(dish); 
    },err=>{next(err);}).catch(err=>{next(err);});
  })
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req , res,next)=>{
  res.status = 404;
  res.end('Post operation not supported for dishes/'
  +req.params.dishId);
  //return next(res);
}) 
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  Dishes.findByIdAndUpdate(req.params.dishId,
    { $set:req.body} , {new:true})
    .then(dish=>{
      console.log("Updated dish :",dish);
      res.status = 200;
      res.setHeader("Content-Type",'application/json');
      res.json(dish); 
    },err=>{next(err);}).catch(err=>{next(err);})
  })
.delete(authenticate.verifyUser,authenticate.verifyAdmin, (req , res,next)=>{
  Dishes.findByIdAndRemove(req.params.dishId)
  .then(resp=>{
    res.status = 200;
    res.setHeader("Content-Type","application/json");
    res.json(resp); 
  },err=>{next(err);}).catch(err=>{next(err);}) 
});

dishIdRouter.use("/",commentRouter);
module.exports = dishIdRouter;