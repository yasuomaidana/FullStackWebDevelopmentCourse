const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected correctly");
    Dishes.create({
        name:"Uthapizza",
        description:"Test"
    })
    .then(dish=>{
        console.log("Saved dish \n",dish);
        //return Dishes.deleteMany({});
        return Dishes.findByIdAndUpdate(dish._id,
            {$set: {description:"Updated test"}},
            //It returns the same dish
            { new: true}  
            ).exec();
    })
    .then(dish=>{
        console.log("Stored dishes \n",dish);
        dish.comments.push({
            rating:5,
            comment:"I\'m getting a sinking feeling!",
            author:"Yasuo"
        });
        return dish.save();
        
    })
    .then(dish=>{
        console.log("Modified dish comment\n",dish);
        return Dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch(err=>{
        console.log(err);
    });
});
