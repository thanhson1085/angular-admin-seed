'use strict';
var express = require('express'), 
    router = express.Router(), 
    config = require('config'),
    moment = require('moment'),
    crypto = require('crypto'),
    db = require('../models'),
    pass = require('../helpers/password.js');

// list options
router.get('/list/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    db.Option.findAndCountAll({
        include: [],
        limit: limit,
        offset: offset

    }).then(function(options) {
        res.send(JSON.stringify(options));
    });
});

// config
router.get('/config', function(req, res){
    db.Option.findAndCountAll({
        include: []

    }).then(function(options) {
        res.send(JSON.stringify(options));
    });
});

// install super admin account and site
router.post('/install', function(req, res){
    var hash = pass.hash(req.body.password);
    db.User.create({
        username: req.body.username,
        password: hash.password,
        isActivated: true,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        salt: hash.salt
    }).then(function(user){
        crypto.randomBytes(64, function(ex, buf) {
            var token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
            var today = moment();
            var tomorrow = moment(today).add(config.get('token_expire'), 'seconds');
            db.Token.create({
                UserId: user.id,
                token: token,
                expiredAt: tomorrow
            }).then(function(t){
                user.dataValues.token = t.token;
                db.Usermeta.create({
                    metaKey: 'isSuperAadmin',
                    metaValue: true
                });
                res.send(JSON.stringify(user));
            });
        });
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
    // Create options value for site
    var userFields = [ 
        { name: 'phone', label: 'Phone', type: 'string' },
        { name: 'address', label: 'Address', type: 'string' },
        { name: 'defaultLanguage', label: 'Default Language', type: 'string' }
    ];
    db.Option.bulkCreate([
        { optionKey: 'defaultLanguage', optionValue: 'en-US' },
        { optionKey: 'userFields', optionValue: JSON.stringify(userFields) }
    ]);
});

// new options
router.post('/create', function(req, res){
    db.Option.create({
        metaKey: req.body.metaKey,
        metaValue: req.body.metaValue
    }).then(function(option){
        res.send(JSON.stringify(option));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// delete options
router.delete('/delete/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// user detail
router.get('/view/:id', function(req, res){
    db.Option.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(option){
        res.send(JSON.stringify(option));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update user
router.put('/update/:id', function(req, res){
    db.Option.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(option) {
        if (option) {
            option.updateAttributes({
                metaKey: req.body.metaKey,
                metaValue: req.body.metaValue
            }).then(function() {
                res.send(JSON.stringify(option));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

module.exports = router;
