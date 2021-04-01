const express = require("express");
const bodyParser = require("body-parser");

//Import routes
const leaderIdRoutes = require('./leaederId')

const leaderRouter = express.Router();

leaderRouter.get(bodyParser.json());
const Leaders = require('../../models/leaders')
leaderRouter.route('/')
.get((req,res,next) => {
    //Obtains Leaders
    Leaders.find({}).then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
})
.post((req, res, next) => {
    //Creates a new promotion
    Leaders.create(req.body)
    .then(promos=>{
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },err=>next(err))
    .catch(err=>next(err));
    
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
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