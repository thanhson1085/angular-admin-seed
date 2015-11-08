'use strict';
var express = require('express'), 
    router = express.Router(), 
    db = require('../models');

// list term relationships
router.get('/getByUserId/:UserId', function(req, res){
    db.TermRelationship.findAndCountAll({
        where: {
            UserId: req.params.UserId
        },
        include: []

    }).then(function(terms) {
        res.send(JSON.stringify(terms));
    });
});

// create term relationships
router.post('/create', function(req, res){
    db.TermRelationship.create({
        UserId: req.body.UserId,
        TermId: req.body.TermId,
        order: req.body.order
    }).then(function(term){
        res.send(JSON.stringify(term));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// delete a term relationship
router.delete('/delete', function(req, res){
    console.log(req.body);
    db.TermRelationship.destroy({
        where: {
            UserId: req.body.UserId,
            TermId: req.body.TermId
        }
    }).then(function(term){
        res.send(JSON.stringify(term));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

module.exports = router;
