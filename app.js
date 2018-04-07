const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express_handlebars = require('express-handlebars');
const nodemailer = require('nodemailer');
//crypto used to generate file name
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

// references we added
const mongoose = require('mongoose');
const config = require('./config/globals');
// auth packages
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;

const index = require('./controllers/index');
const jsd = require('./controllers/jobSeekerDetails');
const postJobs = require('./controllers/postJobs');
const Admin = require('./controllers/admin');


const app = express();

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
app.use(methodOverride('_method'));

//mongo uri
const mongoURI = 'mongodb://jaspreet:jaspreet@ds237379.mlab.com:37379/mongofileupload';

//create mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;

conn.once('open',()=>{
   // init stream
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection('uploads');

});

//create storage engine


const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            //crypto.randomBytes is used to generate names
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                     return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({storage});

//uploads file to db
//single is used to upload one file at a time
app.post('/upload', upload.single('file'), (req, res , next) => {
    // res.json({ file: req.file});
    res.redirect('/jobSeeker')
});

//GET/ files
//display all the files in JSOn format
app.get('/files', (req, res , next) => {
gfs.files.find().toArray((err, files) => {
//    check if files
    if(!files || files.length === 0){
        return res.status(404).json({
            err: 'No files exist'
        });
    }

//    files exist
    return res.json(files);
});
});

//GET/ files/:filename
//display all the single files object in JSOn format
app.get('/files/:filename', (req, res , next) => {
    gfs.files.findOne({filename: req.params.filename}, (err,file) => {
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No files exists'
            });
        }
    //    file exist
        return res.json(file);

    });
});

//GET/ iamges/:filename
//display all the files in JSOn format
app.get('/image/:filename', (req, res , next) => {
    gfs.files.findOne({filename: req.params.filename}, (err,file) => {
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No files exists'
            });
        }
        //check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
 
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);

        }
        else
        {
            res.status(404).json({
                err: ' not an image format '
            });
        }

    });
});



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

passport.use(User.createStrategy());

// session management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// map controller paths
app.use('/', index);
app.use('/jobSeekers', jsd);
app.use('/postJobs', postJobs);
app.use('/admin', Admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
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