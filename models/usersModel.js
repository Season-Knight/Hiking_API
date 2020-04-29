const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userId: {type:String },
    fName: {type: String},
    lName: {type:String},
    email: {type: String},
    userName: {type:String},
    passwordHash: {type:String},
    numberGoal:{type: Number},
    milesGoal: {type: Number},
    elevationGoal: {type: Number}
    // email: {type: [String]},
    // age: {type:Number,
    //     min: [18, 'Must be an Adult'],
    //     max: 130
    // },
  
});

usersSchema.methods.fullName = function(){
    return `${this.fName} ${this.lName}`
}

usersSchema.methods.goalList = function(){
    return `${this.numberGoal} ${this.milesGoal} ${this.elevationGoal}`
}
module.exports.usersModel = mongoose.model("Users", usersSchema, 'users')
module.exports.usersSchema= usersSchema.obj