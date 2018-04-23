const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
const Announcement = require('../models/announcement');

let globalFunction =require('../config/globalFunctions');

router.get('/', globalFunction.userLoggedIn, function(req, res, next) {
    User.find((err, users)=>{
    User.find((err, announcements)=>{
    User.find({ $or: [ { userType: 'jobseeker' } ] },(err, jobseeker)=> {
        User.find({$or: [{userType: 'employer'}]}, (err, employers) => {

            Event.find((err, events) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('admin/', {
                        title: "All users here",
                        jobseeker: jobseeker,
                        employers: employers,
                        events:events,
                        announcements: announcements,
                        users: users,
                        user: req.user

                    });
                }
            });
        });
    });
        });
    });
});

//create new announcement

router.get('/announcement', globalFunction.userLoggedIn, function(req,res, next){
    Announcement.find((err, announcements) => {
        if (err){
            cosole.log(err)
        }
        else {
            res.render('admin/announcement', {title: 'SMEDB-announcement',
                announcements: announcements,
                user:req.user
            });
        }
    });

});

//get add new announcement page
router.get('/add_announce', globalFunction.userLoggedIn, function(req,res, next){
    res.render('admin/add_announce', {title: 'new_announcement', user:req.user});
});

//register new announcement
router.post('/add_announce', globalFunction.userLoggedIn, (req, res, next) => {
    // use the Car model to save the new cart
    Announcement.create({
        title: req.body.title,
    }, (err, announcements) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(announcements.title)
            res.redirect('/admin/announcement');
        }
    }) ;
});

//delete announcement
router.get('/delete/:_id', globalFunction.userLoggedIn, (req, res, next) => {
    //get the _id parameter from the url and store in local  variable
    let _id = req.params._id;

    //use the car model to delete the document with this ad
    Announcement.remove({ _id: _id }, (err) => {
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/admin/announcement');
        }
    })
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