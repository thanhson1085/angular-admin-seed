'use strict';
var express = require('express'), 
    router = express.Router(), 
    crypto = require('crypto'),
    db = require('../models');

// list users
router.get('/api/v1/users', function(req, res){
    db.User.findAll({
        include: []
    }).then(function(users) {
        res.send(JSON.stringify({}));
    });
});

// new user
router.post('/api/v1/users', function(req, res){
    res.send(JSON.stringify({}));
});

// delete user
router.delete('/api/v1/users/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// user detail
router.get('/api/v1/users/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// update user
router.put('/api/v1/users/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// login
router.post('/api/v1/login', function(req, res){
    crypto.randomBytes(64, function(ex, buf) {
        var token = buf.toString('base64');
        res.send(JSON.stringify({
            access_token: token
        }));
    });
});

module.exports = router;
