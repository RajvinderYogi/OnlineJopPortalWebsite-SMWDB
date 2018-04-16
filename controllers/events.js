const express = require('express');
const router = express.Router();
const Event = require('../models/event');
let globalFunction =require('../config/globalFunctions');

router.get('/', globalFunction.userLoggedIn, function(req, res, next) {
    Event.find((err,events)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('events', {
                title:"SMWDB - Employer",
                events:events,
                user: req.user
            });
        }
    });
});
//GET: /Delete
router.get('/delete/:_id', globalFunction.userLoggedIn, (req, res, next) =>{
    let _id= req.params._id;

    Event.remove({_id: _id}, (err) =>{
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/events');
        }
    });
});

module.exports = router;