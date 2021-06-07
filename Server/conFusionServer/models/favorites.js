const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const favoriteDish = new Schema({
    dish:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Dish"
    }
});
const userFavorite = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dishes:[favoriteDish]
   },
   //End name and decription
   {
       timestamps:true
});
var Favorites = mongoose.model('Favorite',userFavorite);

module.exports = Favorites;