// refrence mongoose
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

//create car schema
const announcementSchema = new mongoose.Schema({
    title:{
        type: String,
        required:'title is required'
    },
});

//make it public
module.exports = mongoose.model('Announcement', announcementSchema);