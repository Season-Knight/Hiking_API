const mongoose = require('mongoose');
const { usersModel: Users, usersSchema } = require('../models/usersModel')
require('dotenv').config()

function connect(objConnect) {

    // const uri = `mongodb+srv://SeasonKnight:${process.env.DB_PASSWORD}@cluster0-vqsvj.mongodb.net/test?retryWrites=true&w=majority`;
    const uri = `mongodb+srv://Sknight:${process.env.DB_PASSWORD}@cluster0-2lrhx.mongodb.net/test?retryWrites=true&w=majority`

    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Helio"
    });


}//end of connect function

function close() {
    mongoose.connection.close()
}
function create(objCreate) {
    let serial = {}
    //use the schema as a template to check for properties in document to write
    //if the document has a matching property copy it to new object
    //write the new object
    for (let key in usersSchema) {
        if (objCreate.doc.hasOwnProperty(key)) {
            serial[key] = objCreate.doc[key]
        }
    }
    return Users.create(serial)
}

function readOne(objRead) {
    return Users.findById(objRead.id).exec();
}

function replace(objReplace) {
    let serial = {}
    for (let key in usersSchema) {
        if (objReplace.doc.hasOwnProperty(key)) {
            serial[key] = objReplace.doc[key]
        }
    }
    return Users.replaceOne({ _id: objReplace.id }, serial).exec()
}
function update(objUpdate) {
    let serial = {}
    for (let key in usersSchema) {
        if (objUpdate.doc.hasOwnProperty(key)) {
            serial[key] = objUpdate.doc[key]
        }
    }
    return Users.update({ _id: objUpdate.id }, serial).exec()
}


function del(objDelete) {
    return Users.deleteOne({ _id: objDelete.id }).exec()
}
function readAll(objRead) {
    return Users.find(objRead).exec()
}
module.exports.connect = connect
module.exports.close = close
module.exports.create = create
module.exports.readOne = readOne
module.exports.update = update
module.exports.replace = replace
module.exports.del = del
module.exports.readAll = readAll
