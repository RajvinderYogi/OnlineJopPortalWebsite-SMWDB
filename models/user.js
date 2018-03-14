// reference mongoose
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//create account schema
const accountSchema = new mongoose.Schema({});
accountSchema.plugin(passportLocalMongoose);
//make it public
module.exports = mongoose.model('Account', accountSchema);