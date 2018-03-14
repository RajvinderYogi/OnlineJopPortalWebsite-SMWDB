let express = require('express');
let router = express.Router();
let passport =require('passport');
let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SMWDB - Home' });
});
router.get('/jobSeeker', function(req, res, next) {
    res.render('jobSeeker', { title: 'SMWDB - Job Seeker' });
});
router.get('/employer', function(req, res, next) {
    res.render('employer', { title: 'SMWDB - Employers' });
});
router.get('/contactUs', function(req, res, next) {
    res.render('contactUs', { title: 'SMWDB - Contact Us' });
});

router.get('/register', (req, res, next)=>{
    res.render('register', {
        title:'SMWDB - Register'
    });
});

//POST: /register
router.post('/register', function (req, res, next) {
    User.register(
        new User ({
            username: req.body.username,
    }),
    req.body.password,
    function(err, account) {
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

    res.render('login', {
        title:'SMWDB - Login',
        messages: messages
    });
});

//Post:/login
router.post('/login',
    passport.authenticate('local', {
    successRedirect: '/jobSeeker',
    failureRedirect: '/login',
    failureMessage:'Invalid Login'
}));



module.exports = router;
