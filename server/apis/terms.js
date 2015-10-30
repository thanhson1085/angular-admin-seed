'use strict';
var express = require('express'), 
    router = express.Router(), 
    db = require('../models');

// list term
router.get('/list/:taxonomy/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    db.Term.findAndCountAll({
        where: {
            taxonomy: req.params.taxonomy
        },
        include: [],
        limit: limit,
        offset: offset

    }).then(function(terms) {
        res.send(JSON.stringify(terms));
    });
});

// new term
router.post('/create', function(req, res){
    db.Term.create({
        slug: req.body.slug,
        taxonomy: req.body.taxonomy,
        name: req.body.name,
        parent: req.body.parent,
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
    db.Term.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(term){
        res.send(JSON.stringify(term));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// getAll term
router.get('/getAll/:taxonomy', function(req, res){
    db.Term.findAll({
        where: {
            taxonomy: req.params.taxonomy
        }
    }).then(function(terms){
        res.send(JSON.stringify(terms));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update term
router.put('/update/:id', function(req, res){
    db.Term.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(term) {
        if (term) {
            term.updateAttributes({
                name: req.body.name,
                parent: req.body.parent,
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
