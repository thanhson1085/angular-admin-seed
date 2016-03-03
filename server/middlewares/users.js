'use strict';
var db = require('../models');
var _ = require('lodash');
var config = require('config');
module.exports = function(err, req, res, next) {
    var t = req.get('Authorization').replace('Bearer ', '');
    var unauthorization = config.get('unauthorization');
    if (_.indexOf(unauthorization, req.url) < 0){
        db.Token.findOne({
            where: {
                token: t
            }
        }).then(function(token){
            if (!token){
                throw('');
            }
        }).catch(function(){
            res.status(401).send(JSON.stringify({}));
        });
    }
    next();
};
