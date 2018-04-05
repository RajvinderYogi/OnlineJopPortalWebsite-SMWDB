let express = require('express');
let router = express.Router();
let passport =require('passport');
let User = require('../models/user');
const nodemailer = require('nodemailer');
let globalFunction =require('../config/globalFunctions');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'SMWDB - Home', user: req.user  });
});
router.get('/jobSeeker', function(req, res, next) {
    res.render('jobSeeker', { title: 'SMWDB - Job Seeker', user: req.user });
});
router.get('/employer', function(req, res, next) {
    res.render('employer', { title: 'SMWDB - Employers', user: req.user  });
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

//get contact form

router.get('/send', function (req, res, next) {
    res.render('send')
});

router.post('/send', function (req, res, next) {

    const sent = `
      <p>Message From SMWDB Contact form</p>
      <ul>
          <ul>Name: ${req.body.name}</ul>
          <ul>Email: ${req.body.email}</ul>
      </ul>
      <h3>Message Detail</h3>
      <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'smwdbinfo@gmail.com',
            pass: '123456Abc' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: '<smtp.gmail.com>', // sender address
        to: 'aulakhsukhwinder2@gmail.com, ', // list of receivers
        subject: 'SMWDB Job Fair Contact Form', // Subject line
        text: 'Hello world?', // plain text body
        html: sent // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


        res.redirect('contactUs');
    });
});
module.exports = router;
