// refrence mongoose
const mongoose = require('mongoose');

//create Event schema
const eventSchema = new mongoose.Schema({
    eventName:{
        type: String,
        required:'title is required'
    }
});
//make it public
module.exports = mongoose.model('Event', eventSchema);