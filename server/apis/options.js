'use strict';
var express = require('express'), 
    router = express.Router(), 
    db = require('../models');

// list options
router.get('/list/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    db.Option.findAndCountAll({
        include: [],
        limit: limit,
        offset: offset

    }).then(function(users) {
        res.send(JSON.stringify(users));
    });
});

// config
router.get('/config/:id', function(req, res){
    res.send(JSON.stringify({}));
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
