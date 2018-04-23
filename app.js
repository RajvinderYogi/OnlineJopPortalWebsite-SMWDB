var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express_handlebars = require('express-handlebars');
const nodemailer = require('nodemailer');

// references we added
const mongoose = require('mongoose');
const config = require('./config/globals');
// auth packages
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;

var index = require('./controllers/index');
const jsd = require('./controllers/jobSeekerDetails');
const postJobs = require('./controllers/postJobs');
const Admin = require('./controllers/admin');
const Event = require('./controllers/events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
mongoose.connect(config.db);

// passport configuration
app.use(session({
    secret: 'anything',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// reference User model
const User = require('./models/user');
const Announcement = require('./models/announcement');

passport.use(User.createStrategy());

// session management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// map controller paths
app.use('/', index);
app.use('/jobSeekers', jsd);
app.use('/postJobs', postJobs);
app.use('/admin', Admin);
app.use('/events', Event);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;