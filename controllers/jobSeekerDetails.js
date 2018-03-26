let express = require('express');
let router = express.Router();
let Jobseeker = require('../models/jobSeekerDetail');

/* GET  page. */
router.get('/', (req, res, next) => {

    Jobseeker.find((err, jobseekers)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('jobseekers/index', {
                title:"Job Seeker Details", user: req.user,
                jobseekers:jobseekers
            });
        }
    });
});


//GET:  /jobseekers/edit
router.get('/edit/:_id', (req, res, next)=>{
    let _id= req.params._id;
    Jobseeker.findById(_id, (err, jobseekers)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('jobseekers/edit', {
                title:'Edit Your Details',

                jobseekers: jobseekers
            });
        }
    });
});
//make public
module.exports = router;