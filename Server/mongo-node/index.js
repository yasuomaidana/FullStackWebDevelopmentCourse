const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbname = "conFusion";

//Import operations
const dboperations = require("./operations");

MongoClient.connect(url)
.then((client)=>{
    console.log("Connected correctly to server");
    const db = client.db(dbname);
    document = {name:"Vadonut",description:"Test"};
    collection = "dishes";
    dboperations.insertDocument(db,document,collection)
    .then((res)=>{
        console.log("Insert document\n",res.ops);
        return dboperations.findDocuments(db,collection);
    })
    .then((docs)=>{
        console.log("Found documents after insert \n",docs);
        return dboperations.updateDocument(
            //Databes
            db,
            //Filter parameter
            {name:"Vadonut"},
            //What should be updated
            {description:"Updated test"},
            //Where to look for this variable
            collection);
        })
    .then((res)=>{//Answer    
        console.log("Updated document \n",res.result);    
        return dboperations.findDocuments(db,collection)})
    .then((docs)=>{    
        console.log("Found documents",docs);
        return db.dropCollection(collection)})
    .then((res)=>{
        console.log("Dropped colleciton: ",res)                
        client.close();})
    .catch(err=>{console.log(err)});
})
.catch(err=>{console.log(err)}); 
 