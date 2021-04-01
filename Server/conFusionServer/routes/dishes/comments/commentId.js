const express = require("express");
const bodyParser = require("body-parser");


const commentIdRouter = express.Router();
 
const Dishes = require("../../../models/dishes");

commentIdRouter.get(bodyParser.json());

commentIdRouter.route('/:dishId/comments/:commentId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Dish comment' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operations not supported on dishes/dishID/comments/commentId")
})
.put((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save().then(dish=>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(dish); 
            },err=>next(err));
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Dish comment' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save().then(dish=>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(dish); 
            },err=>next(err));
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Dish comment' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = commentIdRouter;
