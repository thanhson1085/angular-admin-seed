'use strict';
var express = require('express'), 
    router = express.Router(), 
    config = require('config'),
    moment = require('moment'),
    crypto = require('crypto'),
    db = require('../models'),
    q = require('../queues'),
    pass = require('../helpers/password.js');

// list users
router.get('/list/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    db.User.findAndCountAll({
        include: [],
        order: 'id DESC',
        limit: limit,
        offset: offset

    }).then(function(users) {
        res.send(JSON.stringify(users));
    });
});

// new user
router.post('/create', function(req, res){
    var hash = pass.hash(req.body.password);
    db.User.create({
        username: req.body.username,
        password: hash.password,
        isActivated: false,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        salt: hash.salt
    }).then(function(user){
        crypto.randomBytes(64, function(ex, buf) {
            var token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
            var today = moment();
            var tomorrow = moment(today).add('seconds', config.get('token_expire'));
            db.Token.create({
                UserId: user.id,
                token: token,
                expiredAt: tomorrow
            }).then(function(t){
                user.dataValues.token = t.token;
                q.create('email', {
                    title: '[Site Admin] Activation Email',
                    to: user.username,
                    emailContent: {
                        username: user.firstname,
                        url: config.get('client.url') + '#/activate/' + t.token
                    },
                    template: 'activate'
                }).priority('high').save();
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
        // remove security attrivute
        delete user.dataValues.password;
        delete user.dataValues.salt;
        user.dataValues.avatar = JSON.parse(user.dataValues.avatar);
        res.send(JSON.stringify(user));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update user
router.put('/update/:id', function(req, res){
    db.User.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(user) {
        if (user) {
            user.updateAttributes({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                isActivated: req.body.isActivated,
                avatar: JSON.stringify(req.body.avatar)
            }).then(function() {
                if (user.dataValues.avatar !== undefined) {
                    user.dataValues.avatar = JSON.parse(user.dataValues.avatar);
                }
                res.send(JSON.stringify(user));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// activate user
router.post('/activate', function(req, res){
    var t = req.body.token;
    db.Token.find({ 
        where: {
            token: t
        } ,
        include: [db.User]
    }).then(function(token) {
        if (token) {
            token.User.updateAttributes({
                isActivated: true
            }).then(function() {
                token.User.dataValues.token = token.token;
                // send email thankyou to user
                q.create('email', {
                    title: '[Site Admin] Thank You',
                    to: token.User.dataValues.username,
                    emailContent: {
                        username: token.User.dataValues.firstname
                    },
                    template: 'welcome'
                }).priority('high').save();
                // send email report to site admin
                q.create('notify', {
                    title: '[Site Admin] A new account registed',
                    notifyContent: {
                        username: token.User.dataValues.firstname
                    },
                    template: 'notifyNewAccount'
                }).priority('low').save();
                res.send(JSON.stringify(token.User));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// login
router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    db.User.findOne({
        where: {
            username: username,
            isActivated: true
        }
    }).then(function(user){
        if (!pass.validate(user.password, password, user.salt)){
            res.status(401).send(JSON.stringify({}));
        }
        db.Token.findOne({
            where: {
                UserId: user.id
            }
        }).then(function(t){
            if (!t.token){
                crypto.randomBytes(64, function(ex, buf) {
                    var token = buf.toString('base64');
                    var today = moment();
                    var tomorrow = moment(today).add('seconds', config.get('token_expire'));
                    db.Token.create({
                        UserId: user.id,
                        token: token,
                        expiredAt: tomorrow
                    }).then(function(to){
                        user.dataValues.token = to.token;
                        user.dataValues.expiredAt = to.expiredAt;
                        res.send(JSON.stringify(user));
                    });
                });
            }
            res.send(JSON.stringify({
                token: t.token,
                id: user.id,
                expiredAt: t.expiredAt
            }));
        });
    }).catch(function(e){
        res.status(401).send(JSON.stringify(e));
    });
});

module.exports = router;
