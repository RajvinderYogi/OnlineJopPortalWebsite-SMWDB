let express = require('express');
let router = express.Router();
let passport =require('passport');
let JobSeeker = require('../models/jobSeekerDetail');

/* GET  page. */
router.get('/', (req, res, next) => {

    JobSeeker.find((err, jobSeekers)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('jobSeekers/index', {
                title:"Job Seeker Details", user: req.user,
                jobSeekers:jobSeekers
            });
        }
    });
})

/* GET  page. */
router.get('/add', function(req, res, next) {
    res.render('jobSeekers/add', { title: 'SMWDB - Add Details', user: req.user  }); });

//POST: /makes/add
router.post('/add', (req, res, next)=>{

    JobSeeker.create({
        fName: req.body.fName,
        lName: req.body.lName,
        phoneNo: req.body.phoneNo,
    }, (err, jobSeekers)=>{
        if (err){
            console.log(err);
        }
        else {
            res.redirect('/jobSeekers/')
        }
    });
});

//GET:  /jobseekers/edit
router.get('/edit/:_id', (req, res, next)=>{
    let _id= req.params._id;
    JobSeeker.findById(_id, (err, jobSeekers)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('jobSeekers/edit', {
                title:'Edit Your Details',

                jobSeekers: jobSeekers
            });
        }
    });
});
//make public
module.exports = router;