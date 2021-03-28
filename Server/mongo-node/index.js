const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbname = "conFusion";

//Import operations
const dboperations = require("./operations");

MongoClient.connect(url,(err,client)=>{
    assert.strictEqual(err,null);

    console.log("Connected correctly to server");
    const db = client.db(dbname);
    document = {name:"Vadonut",description:"Test"};
    collection = "dishes";

    dboperations.insertDocument(db,document,collection,(res)=>{
         console.log("Insert document\n",res.ops);
         dboperations.findDocuments(db,collection,(docs)=>{
            console.log("Found documents after insert \n",docs);});
        dboperations.updateDocument(
            //Databes
            db,
            //Filter parameter
            {name:"Vadonut"},
            //What should be updated
            {description:"Updated test"},
            //Where to look for this variable
            collection,
            //Answer
            (res)=>{
                console.log("Updated document \n",res.result);
                dboperations.findDocuments(db,collection,(docs)=>{
                    console.log("Found documents",docs);
                    db.dropCollection(collection,(res)=>{
                        console.log("Dropped colleciton: ",res)
                        client.close();
                    });
                });    
            });
    });
}); 
 