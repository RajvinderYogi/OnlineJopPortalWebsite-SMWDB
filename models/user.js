// reference mongoose
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//create account schema
const userSchema = new mongoose.Schema({});
userSchema.plugin(passportLocalMongoose);
//make it public
module.exports = mongoose.model('User', userSchema);