let express = require('express');
let router = express.Router();
let User = require('../models/user');
const Announcement = require('../models/announcement');

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
                announcements: announcements,

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
                cName:req.body.cName,
                cPerson: req.body.cPerson,
                phoneNo: req.body.phoneNo,
                province: req.body.province,
                city: req.body.city,
                pCode: req.body.pCode,
                AGroup: req.body.AGroup,
                education: req.body.education,
                status: req.body.status,
                website: req.body.website,
                hiringLocation: req.body.hiringLocation,
                compDesc:req.body.compDesc
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