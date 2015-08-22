'use strict';
var express = require('express'), 
    router = express.Router(), 
    crypto = require('crypto'),
    db = require('../models');

// list users
router.get('/', function(req, res){
    db.User.findAll({
        include: []
    }).then(function(users) {
        res.send(JSON.stringify(users));
    });
});

// new user
router.post('/', function(req, res){
    res.send(JSON.stringify({}));
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
