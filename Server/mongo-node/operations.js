const assert = require("assert");

//It will return promises
exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    if(Array.isArray(document)){
        return coll.insertMany(document);
    }else{ 
        return coll.insertOne(document); }
};
exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
}; 
exports.removeDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};
exports.updateDocument = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.updateOne(document,{$set:update},null);  
}; 