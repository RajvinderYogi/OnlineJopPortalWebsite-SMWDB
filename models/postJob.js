// refrence mongoose
const mongoose = require('mongoose');

//create PostJob schema
const postJobSchema = new mongoose.Schema({
    event:{
      type:String
    },
    title:{
        type: String,
        required:'title is required'
    },
    description:{
        type: String,
        required:'description is required'
    },
    requirements:{
        type: String,
        required:'requirements is required'
    }
});
//make it public
module.exports = mongoose.model('PostJob', postJobSchema);