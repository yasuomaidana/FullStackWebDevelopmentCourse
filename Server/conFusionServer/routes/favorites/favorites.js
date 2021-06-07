const express = require("express");

const favoritesRouter = express.Router();

//Import dish model
const Favorites = require("../../models/favorites");

//
const authenticate = require('../../authenticate');
const cors = require('../cors');
favoritesRouter.use(express.json());

favoritesRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{
    res.statusCode = 200;
    res.end('');
})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Favorites.find().populate('dishes.dish').then(favorite=>{
        res.status = 200;
        res.setHeader("Content-Type",'application/json');
        res.json(favorite); 
      },err=>{next(err);}).catch(err=>{next(err);})
}).
post(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Favorites.findOne({user:req.user._id}).then(favorite=>{
        if(favorite==null){
            let send ={user:req.user._id,
                dishes:[]}
            req.body.favorites.forEach(favo=>send.dishes.push({dish:favo}));
            console.log("send",send);
            Favorites.create(send).then(resp=>{
                res.status = 200;
                res.setHeader("Content-Type",'application/json');
                res.json({"resp":"New user added to favorites"});
            }).catch(err=>{next(err);});   
        }
        else {
            let old_fav =favorite.dishes.map(el=>{return el.dish});
            let newFav = req.body.favorites.filter(el=>{return !old_fav.includes(el)}).map(el=>{return {dish:el}});
            if(newFav.length<1){
                res.status = 200;
                res.setHeader("Content-Type",'application/json');
                res.json({"resp":"No new favorite dishes to add"});
            }else{
                newFav.forEach(n=>{favorite.dishes.push(n);});
                favorite.save()
                .then(resp=>{
                    res.status = 200;
                    res.setHeader("Content-Type",'application/json');
                    res.json({"resp":"New favorites to added"});
                    console.log(resp)});   
            }
        }
    },err=>{next(err);}).catch(err=>{next(err);}); 
});

module.exports = favoritesRouter;