const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    date: {type: String},
    time: {type: String},
    eventTitle: {type: String},
    location: {type: String},
    description: {type: String,} 
  
 
});

eventsSchema.methods.addEvent = function(){
    return `${this.date} ${this.time} ${this.eventTitle}`
}

module.exports.eventsModel = mongoose.model("Events", eventsSchema, 'events')
module.exports.eventsSchema= eventsSchema.obj