const express = require("express");
 
//Import routes
const dishIdRoutes = require('./dishId')

const dishRouter = express.Router();

//Import dish model
const Dishes = require("../../models/dishes");

//
const authenticate = require('../../authenticate');

dishRouter.get(express.json());

dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({}).populate('comments.author')
    .then(dishes=>{
        res.status = 200;
        res.setHeader("Content-Type",'aplication/json');
        res.json(dishes); 
    },err=>{next(err);})
    .catch(err=>{next(err);});
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Dishes.create(req.body)
    .then( dish =>{
        console.log("Created dish :",dish);
        res.status = 200;
        res.setHeader("Content-Type",'aplication/json');
        res.json(dish); 
    },err=>{next(err);})
    .catch(err=>{next(err);});
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
    //return next(res);
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Dishes.remove({}).then(resp=>{
        res.status = 200;
        res.setHeader("Content-Type","aplication/json");
        res.json(resp);
    },err=>{next(err);}).catch(err=>{next(err);});
});

dishRouter.use("/",dishIdRoutes);

module.exports = dishRouter;