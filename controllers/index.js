let express = require('express');
let router = express.Router();
let passport =require('passport');
let User = require('../models/user');
let Event = require('../models/event');
let globalFunction =require('../config/globalFunctions');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'SMWDB - Home', user: req.user  });
});
router.get('/jobSeeker', function(req, res, next) {
    res.render('jobSeeker', { title: 'SMWDB - Job Seeker', user: req.user });
});
router.get('/employer', function(req, res, next) {
//     res.render('employer', { title: 'SMWDB - Employers', user: req.user, events:events  });
// });
    Event.find((err,events)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('employer', {
                title:"SMWDB - Employer",
                events:events,
                user: req.user
            });
        }
    });
});
router.get('/help', function(req, res, next) {
    res.render('help', { title: 'SMWDB - Contact Us',user: req.user });
});
router.get('/contactUs', function(req, res, next) {
    res.render('contactUs', { title: 'SMWDB - Contact Us', user: req.user  });
});

router.get('/register', (req, res, next)=>{
    res.render('register', {
        title:'SMWDB - Register',
        user: req.user
    });
});

//POST: /register
router.post('/register', function (req, res, next) {
    User.register(
        new User ({
            fName: req.body.fName,
            lName:req.body.lName,
            cName:req.body.cName,
            cPerson:req.body.cPerson,
            userType: req.body.userType,
            username: req.body.username,
            phoneNo: req.body.phoneNo
        }),
        req.body.password,
        function(err, user) {
            if (err) {
                console.log(err);
                res.render('register');
            }
            else {
                res.redirect('/login');
            }
        });
});

router.get('/login', (req, res, next)=>{

    let messages = req.session.messages || [];

    req.session.messages = [];
    res.render('login', {
        title:'SMWDB - Login',
        messages: messages,
        user: req.user
    });
});

//Post:/login
router.post('/login',
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect: '/login',
        failureMessage:'Invalid Login'
    }));

//GET: /logout
router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/')
});

module.exports = router;
