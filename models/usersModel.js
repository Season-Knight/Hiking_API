const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const usersSchema = new Schema({
    fName: {type: String},
    lName: {type:String},
    userName: {type:String},
    password: {type:String}
    // email: {type: [String]},
    // age: {type:Number,
    //     min: [18, 'Must be an Adult'],
    //     max: 130
    // },
  
});

usersSchema.methods.fullName = function(){
    return `${this.fName} ${this.lName}`
}
module.exports.usersModel = mongoose.model("Users", usersSchema, 'users')
module.exports.usersSchema= usersSchema.obj