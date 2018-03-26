let express = require('express');
let router = express.Router();
let User = require('../models/user');
let globalFunction =require('../config/globalFunctions');

/* GET  page. */
router.get('/', globalFunction.userLoggedIn, (req, res, next) => {

    User.find((err, users)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('jobSeekers/index', {
                title:"Job Seeker Details",
                user: req.user,
                users:users
            });
        }
    });
});


//GET:  /jobseekers/edit
router.get('/edit/:_id', globalFunction.userLoggedIn, (req, res, next)=>{
    let _id= req.params._id;
    User.findById(_id, (err, users)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('jobSeekers/edit', {
                title:'Edit Your Details',
                user: req.user,
                users:users
            });
        }
    });
});
//POST: /jobSeekers/edit
router.post('/edit/:_id', globalFunction.userLoggedIn, (req, res, next)=>{
    let _id = req.params._id;

    User.update({_id:_id},
        {$set:{
                fName: req.body.fName,
                lName:req.body.lName,
                phoneNo: req.body.phoneNo
            }}, null, (err)=>{
            if (err){
                console.log(err);
            }
            else {
                res.redirect('/jobSeekers/')
            }
        });
});
//make public
module.exports = router;