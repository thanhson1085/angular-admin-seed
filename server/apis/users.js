'use strict';
var express = require('express'), 
    router = express.Router(), 
    crypto = require('crypto'),
    db = require('../models');

// list users
router.get('/list', function(req, res){
    db.User.findAll({
        include: []
    }).then(function(users) {
        res.send(JSON.stringify(users));
    });
});

// new user
router.post('/create', function(req, res){
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(function(user){
        res.send(JSON.stringify(user));
    });

});

// delete user
router.delete('/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// user detail
router.get('/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// update user
router.put('/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// login
router.post('/login', function(req, res){
    crypto.randomBytes(64, function(ex, buf) {
        var token = buf.toString('base64');
        res.send(JSON.stringify({
            access_token: token
        }));
    });
});

module.exports = router;
