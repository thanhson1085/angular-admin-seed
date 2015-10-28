'use strict';
var express = require('express'), 
    router = express.Router(), 
    db = require('../models');

// list term
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

module.exports = router;
