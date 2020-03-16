const mongoose = require('mongoose');
const { hikesModel: Hikes, hikesSchema } = require('../models/hikesModel')
require('dotenv').config()


function create(objCreate) {
    let serial = {}
    //use the schema as a template to check for properties in document to write
    //if the document has a matching property copy it to new object
    //write the new object
    for (let key in hikesSchema) {
        if (objCreate.doc.hasOwnProperty(key)) {
            serial[key] = objCreate.doc[key]
        }
    }
    return Hikes.create(serial)
}

function readOne(objRead) {
    return Hikes.findById(objRead.id).exec();
}

function replace(objReplace) {
    let serial = {}
    for (let key in hikesSchema) {
        if (objReplace.doc.hasOwnProperty(key)) {
            serial[key] = objReplace.doc[key]
        }
    }
    return Hikes.replaceOne({ _id: objReplace.id }, serial).exec()
}
function update(objUpdate) {
    let serial = {}
    for (let key in hikesSchema) {
        if (objUpdate.doc.hasOwnProperty(key)) {
            serial[key] = objUpdate.doc[key]
        }
    }
    return Hikes.update({ _id: objUpdate.id }, serial).exec()
}


function del(objDelete) {
    return Hikes.deleteOne({ _id: objDelete.id }).exec()
}
function readAll(objRead) {
    return Hikes.find(objRead).exec()
}

module.exports.create = create
module.exports.readOne = readOne
module.exports.update = update
module.exports.replace = replace
module.exports.del = del
module.exports.readAll = readAll
