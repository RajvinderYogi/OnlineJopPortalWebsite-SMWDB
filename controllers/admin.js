const express = require('express');
const router = express.Router();
const User = require('../models/user');
let globalFunction =require('../config/globalFunctions')


router.get('/', globalFunction.userLoggedIn, function(req, res, next) {
    res.render('admin/', {title: 'SMWDB - Home', user: req.user});
});
//GET: /postJobs
router.get('/jobseekers', globalFunction.userLoggedIn, (req, res, next) => {
    //get car document from db
    User.find({ $or: [ { userType: 'jobseeker' } ] },(err, jobseeker)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('admin/jobseekers', {
                title:"All users here",
                jobseeker:jobseeker,
                user: req.user
            });
        }
    });
});
router.get('/employers', globalFunction.userLoggedIn, (req, res, next) => {
    //get car document from db
    User.find({ $or: [ { userType: 'employer' } ] },(err, employers)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('admin/employers', {
                title:"All users here",
                employers:employers,
                user: req.user
            });
        }
    });
});
module.exports = router;