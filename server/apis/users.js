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
        password: req.body.password,
        salt: req.body.password
    }).then(function(user){
        crypto.randomBytes(64, function(ex, buf) {
            var token = buf.toString('base64');
            var now = new Date();
            db.Token.create({
                UserId: user.id,
                token: token,
                expiredAt: now
            }).then(function(t){
                user.dataValues.token = t.token;
                res.send(JSON.stringify(user));
            });
        });
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });

});

// delete user
router.delete('/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// user detail
router.get('/view/:id', function(req, res){
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(user){
        res.send(JSON.stringify(user));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update user
router.put('/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// login
router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    db.User.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(function(user){
        db.Token.findOne({
            where: {
                UserId: user.id
            }
        }).then(function(t){
            res.send(JSON.stringify({
                token: t.token,
                id: user.id
            }));
        });
    }).catch(function(e){
        res.status(401).send(JSON.stringify(e));
    });
});

module.exports = router;
