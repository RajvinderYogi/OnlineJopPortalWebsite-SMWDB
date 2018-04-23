// reference mongoose
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//create account schema
const userSchema = new mongoose.Schema({
    fName:{
        type: String,
    },
    lName:{
        type: String,
    },
    cName:{
        type:String
    },
    cPerson:{
        type: String
    },
    phoneNo:{
        type: Number
    },
    userType:{
        type: String
    },
    province:{
        type:String
    },
    city:{
        type: String
    },
    pCode:{
        type: String
    },
    AGroup:{
        type: String
    },
    education:{
        type: String
    },
    experience:{
        type: String
    },
    status:{
        type: String
    },
    website:{
        type: String
    },
    hiringLocation:{
        type: String
    },
    compDesc:{
        type: String
    }
});
userSchema.plugin(passportLocalMongoose);
//make it public
module.exports = mongoose.model('User', userSchema);