// reference mongoose
const mongoose = require('mongoose');

//create make schema
const jobSeekerSchema = new mongoose.Schema({
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
});
//make it public
module.exports = mongoose.model('JobSeeker', jobSeekerSchema);