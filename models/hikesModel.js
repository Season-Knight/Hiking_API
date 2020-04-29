const mongoose = require('mongoose')
const DateOnly = require('dateonly')

const Schema = mongoose.Schema;

const hikesSchema = new Schema({
    userId: {type: String},
    hikeDate: {type: Date},
    hikeName: {type:String},
    totalMiles: {type:String},
    elevationGain: {type:String},
    peakElevation: {type:String},
    hikeRating: {type:String}
 
});

hikesSchema.methods.addHike = function(){
    return `${this.hikeDate} ${this.hikeName} ${this.totalMiles} ${this.elevationGain} ${this.peakElevation} ${this.hikeRating}`
}

module.exports.hikesModel = mongoose.model("Hikes", hikesSchema, 'hikes')
module.exports.hikesSchema= hikesSchema.obj