const express = require("express");
const bodyParser = require("body-parser");

const commentRouter = express.Router();
const commentIdRouter = require('./commentId');
const Dishes = require("../../../models/dishes");


commentRouter.get(bodyParser.json());

commentRouter.route("/:dishId/comments")
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}).
post((req,res,next)=>{
    Dishes.findById(req.params.dishId).
    then(dish => {
        if(dish != null){
            dish.comments.push(req.body);
            dish.save().then(dish=>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(dish); 
            },err=>next(err));
         }
         else {
             err = new Error('Dish ' + req.params.dishId + ' not found');
             err.status = 404;
             return next(err);
         }
    }, err=>next(err)).
    catch(err=>next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/dishId/comments');
    //return next(res);
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then(dish =>{
        if(dish != null){
            for(var i = (dish.comments.length-1); i>= 0; i-- ){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save().then(dish=>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(dish); 
            },err=>next(err));
        }
        else{
            err = new Error("Dish " + req.params.dishId + " not found");
            err.status = 404;
            return next(err);
        }
    },err => next(err)).catch(err => next(err))
});

commentRouter.use('/',commentIdRouter);

module.exports = commentRouter;