const assert = require("assert");


exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    if(Array.isArray(document)){
        coll.insertMany(document,(err,res)=>{
            assert.strictEqual(err,null);
            console.log("Inserted "+res.result.n+
            " documents into the collection "+ collection);
            callback(res);
        });
    }
    else{
        coll.insertOne(document,(err,res)=>{
            assert.strictEqual(err,null);
            console.log("Inserted "+res.result.n+
            " documents into the collection "+ collection);
            callback(res);
        });
    }
};
exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err,document)=>{
        assert.strictEqual(err,null);
        callback(document);
    });
}; 
exports.removeDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    coll.deleteOne(document,(err,res)=>{
        assert.strictEqual(err,null);
        console.log("Removed the document :"+document);
        callback(res);
    });
};
exports.updateDocument = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    coll.updateOne(document,{$set:update},null,(err,res)=>{
        assert.strictEqual(err,null);
        console.log("Updated the document with "+update);
        callback(res);
    });  
}; 