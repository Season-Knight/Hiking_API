const mongoose = require('mongoose');
const { eventsModel: Events, eventsSchema } = require('../models/eventsModel')
require('dotenv').config()


function create(objCreate) {
    let serial = {}
    //use the schema as a template to check for properties in document to write
    //if the document has a matching property copy it to new object
    //write the new object
    for (let key in eventsSchema) {
        if (objCreate.doc.hasOwnProperty(key)) {
            serial[key] = objCreate.doc[key]
        }
    }
    return Events.create(serial)
}

function readOne(objRead) {
    return Events.findById(objRead.id).exec();
}

function replace(objReplace) {
    let serial = {}
    for (let key in eventsSchema) {
        if (objReplace.doc.hasOwnProperty(key)) {
            serial[key] = objReplace.doc[key]
        }
    }
    return Events.replaceOne({ _id: objReplace.id }, serial).exec()
}


function update(objUpdate) {
    let serial = {}
    for (let key in eventsSchema) {
        if (objUpdate.doc.hasOwnProperty(key)) {
            serial[key] = objUpdate.doc[key]
        }
    }
    return Events.update({ _id: objUpdate.id }, serial).exec()
}


function del(objDelete) {
    return Events.deleteOne({ _id: objDelete.id })
}
function readAll(objRead) {
    return Events.find(objRead).exec()
}

module.exports.create = create
module.exports.readOne = readOne
module.exports.update = update
module.exports.replace = replace
module.exports.del = del
module.exports.readAll = readAll
