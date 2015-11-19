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
                    UserId: user.id,
                    metaKey: 'isSuperAdmin',
                    metaValue: '1'
                });
                res.send(JSON.stringify(user));
            });
        });
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });

    // Create options value for site
    var userFields = [ 
        { name: 'phone', label: 'userfields.label.Phone', type: 'text' },
        { name: 'address', label: 'userfields.label.Address', type: 'textarea' },
        { name: 'gender', label: 'userfields.label.Gender', type: 'textarea' },
        { name: 'defaultLanguage', label: 'userfields.label.DefaultLanguage', type: 'checkbox' }
    ];

    // User Capacities
    var userCapacities = [ 
        { name: 'editUserProfile', label: 'usermeta.label.EditUserProfile', value: ''}
    ];

    // Taxonomies
    var taxonomies = [ 
        { name: 'category', label: 'taxonomy.label.Category', description: 'Categories'},
        { name: 'tag', label: 'taxonomy.label.Tag', description: 'Tags'}
    ];

    // Roles
    var roles = [ 
        { name: 'superadmin', label: 'role.label.SuperAdmin', description: 'Super Admin'},
        { name: 'admin', label: 'role.label.Admin', description: 'Admin'},
        { name: 'user', label: 'role.label.User', description: 'User'},
        { name: 'subscriber', label: 'role.label.Subscriber', description: 'Subscriber'}
    ];

    // Capacities
    var capacities = [ 
        { name: 'edit_user', description: 'Who can edit user information'},
        { name: 'edit_role', description: 'Who can edit role'},
        { name: 'edit_taxonomy', description: 'Who can edit taxonomy'}
    ];

    db.Option.bulkCreate([
        { optionKey: 'email', optionValue: req.body.username },
        { optionKey: 'defaultLanguage', optionValue: 'en-US' },
        { optionKey: 'userFields', optionValue: JSON.stringify(userFields) },
        { optionKey: 'userCapacities', optionValue: JSON.stringify(userCapacities) },
        { optionKey: 'taxonomies', optionValue: JSON.stringify(taxonomies) },
        { optionKey: 'roles', optionValue: JSON.stringify(roles) },
        { optionKey: 'capacities', optionValue: JSON.stringify(capacities) }
    ]);

    db.Term.bulkCreate([
        { name: 'Uncategorized', slug: 'uncategorized', taxonomy: 'category' },
        { name: 'Untaged', slug: 'untaged', taxonomy: 'tag' }
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

// update options
router.put('/update/:id', function(req, res){
    db.Option.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(option) {
        if (option) {
            option.updateAttributes({
                optionKey: req.body.optionKey,
                optionValue: JSON.stringify(req.body.optionValue)
            }).then(function() {
                res.send(JSON.stringify(option));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update option by option key
router.put('/update/:optionKey', function(req, res){
    db.Option.findOne({ 
        where: {
            optionKey: req.params.optionKey
        } 
    }).then(function(option) {
        if (option) {
            option.updateAttributes({
                optionValue: req.body.optionValue
            }).then(function() {
                res.send(JSON.stringify(option));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

module.exports = router;
