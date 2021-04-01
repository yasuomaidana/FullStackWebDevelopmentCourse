const express = require("express");
const bodyParser = require("body-parser");

//Import routes
const dishIdRoutes = require('./dishId')

const dishRouter = express.Router();

//Import dish model
const Dishes = require("../../models/dishes");

dishRouter.get(bodyParser.json());

dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({}).then(dishes=>{
        res.status = 200;
        res.setHeader("Content-Type",'aplication/json');
        res.json(dishes); 
    },err=>{next(err);})
    .catch(err=>{next(err);});
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then( dish =>{
        console.log("Created dish :",dish);
        res.status = 200;
        res.setHeader("Content-Type",'aplication/json');
        res.json(dish); 
    },err=>{next(err);})
    .catch(err=>{next(err);});
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
    //return next(res);
})
.delete((req, res, next) => {
    Dishes.remove({}).then(resp=>{
        res.status = 200;
        res.setHeader("Content-Type","aplication/json");
        res.json(resp);
    },err=>{next(err);}).catch(err=>{next(err);});
});

dishRouter.use("/",dishIdRoutes);

module.exports = dishRouter;