const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected correctly");
    var newDish = Dishes({
        name:"Uthapizza",
        description:"Test"
    });
    newDish.save()
    .then(dish=>{
        console.log("Saved dish \n",dish);
        return Dishes.find({}).exec();
    })
    .then(dishes=>{
        console.log("Stored dishes \n",dishes);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch(err=>{
        console.log(err);
    });
});
