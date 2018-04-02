const express = require('express');
const router = express.Router();
const PostJob = require('../models/postJob');
let globalFunction =require('../config/globalFunctions')

//GET: /postJobs
router.get('/', globalFunction.userLoggedIn, (req, res, next) => {
    //get car document from db
    PostJob.find((err,postjobs)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('postJobs/index', {
                title:"Jobs are posted here",
                postjobs:postjobs,
                user: req.user
            });
        }
    });
});

//GET /postJobs/add
router.get('/add', globalFunction.userLoggedIn, (req, res, next)=>{
    res.render('postJobs/add', {
        title:'Add a New Job here',
        user: req.user
    });
});

//POST: /postJobs/add
router.post('/add',globalFunction.userLoggedIn, (req, res, next)=>{
    //use car model to save thee car
    PostJob.create({
        title: req.body.title,
        description:req.body.description,
        requirements:req.body.requirements
    }, (err, postjob)=>{
        if (err){
            console.log(err);
        }
        else {
            res.redirect('/postJobs')
        }
    });
});

//GET:  /postJobs/edit
router.get('/edit/:_id', globalFunction.userLoggedIn, (req, res, next)=>{
    let _id= req.params._id;
    PostJob.findById(_id, (err, postjob)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('postJobs/edit', {
                title:'Edit Job Posting',
                postjobs: postjob,
                user: req.user
            });
        }
    });
});
//POST: /postJobs/edit
router.post('/edit/:_id', globalFunction.userLoggedIn, (req, res, next)=>{
    let _id = req.params._id;

    PostJob.update({_id:_id},
        {$set:{
                title: req.body.title,
                description:req.body.description,
                requirements:req.body.requirements
            }}, null, (err)=>{
            if (err){
                console.log(err);
            }
            else {
                res.redirect('/postJobs')
            }
        });
});

//GET: /Delete
router.get('/delete/:_id', globalFunction.userLoggedIn, (req, res, next) =>{
    let _id= req.params._id;

    PostJob.remove({_id: _id}, (err) =>{
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/postJobs');
        }
    });
});

module.exports = router;