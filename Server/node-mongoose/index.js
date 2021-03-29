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
        return Dishes.find({}).exec();
    })
    .then(dishes=>{
        console.log("Stored dishes \n",dishes);
        return Dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch(err=>{
        console.log(err);
    });
});
