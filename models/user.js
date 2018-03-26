// reference mongoose
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//create account schema
const userSchema = new mongoose.Schema({
    fName:{
        type: String,
        required:'First Name Required'
    },
    lName:{
        type: String,
        required:'Last Name is required'
    },
    phoneNo:{
        type: Number,
    },
    userType:{
      type: String
    }
});
userSchema.plugin(passportLocalMongoose);
//make it public
module.exports = mongoose.model('User', userSchema);