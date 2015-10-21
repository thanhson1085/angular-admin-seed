'use strict';
var express = require('express'), 
    router = express.Router(), 
    db = require('../models');

// list term
router.get('/list/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    db.Terms.findAndCountAll({
        include: [],
        limit: limit,
        offset: offset

    }).then(function(terms) {
        res.send(JSON.stringify(terms));
    });
});

// new term
router.post('/create', function(req, res){
    db.Terms.create({
        slug: req.body.slug,
        name: req.body.name,
        description: req.body.description
    }).then(function(term){
        res.send(JSON.stringify(term));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// delete term
router.delete('/delete/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// term detail
router.get('/view/:id', function(req, res){
    db.Terms.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(term){
        res.send(JSON.stringify(term));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update user
router.put('/update/:id', function(req, res){
    db.Terms.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(term) {
        if (term) {
            term.updateAttributes({
                slug: req.body.slug,
                description: req.body.description
            }).then(function() {
                res.send(JSON.stringify(term));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

module.exports = router;
