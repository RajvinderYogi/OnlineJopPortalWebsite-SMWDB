const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
let globalFunction =require('../config/globalFunctions');

router.get('/', globalFunction.userLoggedIn, function(req, res, next) {
    User.find({ $or: [ { userType: 'jobseeker' } ] },(err, jobseeker)=>{
        User.find({ $or: [ { userType: 'employer' } ] },(err, employers)=>{
            if (err){
                console.log(err);
            }
            else {
                res.render('admin/', {
                    title:"All users here",
                    jobseeker:jobseeker,
                    employers:employers,
                    user: req.user
                });
            }
        });
    });
  
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
    //get document from db
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

router.get('/addEvent', globalFunction.userLoggedIn, (req, res, next)=>{
    res.render('admin/addEvent', {
        title:'Add a New Event here',
        user: req.user
    });
});

router.post('/addEvent',globalFunction.userLoggedIn, (req, res, next)=>{
    //use car model to save thee car
    Event.create({
       eventName: req.body.eventName
    }, (err, events)=>{
        if (err){
            console.log(err);
        }
        else {
            res.redirect('/events')
        }
    });
});


//GET: /events
router.get('/eventList', globalFunction.userLoggedIn, (req, res, next) => {
    //get car document from db
    Event.find((err,events)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('admin/eventList', {
                title:"Jobs are posted here",
                events:events,
                user: req.user
            });
        }
    });
});

//GET: /Delete
router.get('/delete/:_id', globalFunction.userLoggedIn, (req, res, next) =>{
    let _id= req.params._id;

    Event.remove({_id: _id}, (err) =>{
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/eventList');
        }
    });
});
module.exports = router;