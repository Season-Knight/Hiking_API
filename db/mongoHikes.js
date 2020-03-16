const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

let client
function connect(objConnect){

// const uri = "mongodb+srv://SeasonKnight:Aurestar!@cluster0-vqsvj.mongodb.net/test?retryWrites=true&w=majority";
const uri = `mongodb+srv://Sknight:${process.env.DB_PASSWORD}@cluster0-2lrhx.mongodb.net/test?retryWrites=true&w=majority`
client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
return client.connect()
.then (connection => {
  objConnect.usersCollection = connection.db("Helio").collection("hikes");
  return "test" // perform actions on the collection object
})

.catch(error => {
    throw new Error(error)
})

}//end of connect function
function close(){
    client.close()
}
function create(objCreate){
return objCreate.hikesCollection.insertOne(objCreate.doc)
}

function readOne (objRead){
    return objRead.hikesCollection.findOne({_id: ObjectId(objRead.id)})
}

function replace(objReplace){
    delete objReplace.doc._id
    return objReplace.hikesCollection.replaceOne({_id: ObjectId(objReplace.id)},objReplace.doc)
}
function update(objUpdate){
        delete objUpdate.doc._id
        return objUpdate.hikesCollection.updateOne({_id: ObjectId(objUpdate.id)},{$set: objUpdate.doc})
        }
function del(objDelete){
    return objDelete.hikesCollection.deleteOne({_id: ObjectId(objDelete.id)})
}

function readAll(objRead){
    return new Promise ((resolve,reject) => {
        objRead.hikesCollection.find({}).toArray(function(err, result){
        if (err){
            reject(err);
        }
        resolve(result)
        })
    })
}
module.exports.connect = connect
module.exports.close = close
module.exports.create = create
module.exports.readOne = readOne
module.exports.update = update
module.exports.replace = replace
module.exports.del = del
module.exports.readAll = readAll
