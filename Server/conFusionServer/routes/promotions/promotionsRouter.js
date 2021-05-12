const express = require("express");

//Import routes
const promotionIdRoutes = require('./promoId');

const promotionRouter = express.Router();
const authenticate = require('../../authenticate');
promotionRouter.use(express.json());

const Promotions = require("../../models/promotions");

promotionRouter.route('/')
.get((req,res,next) => {
    //Obtains promotions
    Promotions.find({}).then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    //Creates a new promotion
    Promotions.create(req.body)
    .then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
    
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Promotions.remove({})
    .then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
});

promotionRouter.use("/",promotionIdRoutes);

module.exports = promotionRouter;