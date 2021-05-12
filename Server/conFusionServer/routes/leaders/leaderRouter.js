const express = require("express");

//Import routes
const leaderIdRoutes = require('./leaederId')
const cors = require('../cors');
const leaderRouter = express.Router();

leaderRouter.use(express.json());

const authenticate = require('../../authenticate');
 
const Leaders = require('../../models/leaders')
leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=200;})
.get(cors.cors,(req,res,next) => {
    //Obtains Leaders
    Leaders.find({}).then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    //Creates a new promotion
    Leaders.create(req.body)
    .then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
    
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Leaders.remove({})
    .then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
});

leaderRouter.use("/",leaderIdRoutes);

module.exports = leaderRouter;