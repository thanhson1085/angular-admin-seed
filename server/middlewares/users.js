'use strict';
var db = require('../models');
var _ = require('lodash');
var config = require('config');
var logger = require('../utils/logger');
module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    var t = req.get('Authorization');
    var unauthorization = config.get('unauthorization');
    if (_.indexOf(unauthorization, req.url) < 0){
        if (t === undefined) {
            logger.info('Access Denied');
            res.status(401).send(JSON.stringify({}));
            return next();
        }
        t = t.replace('Bearer ', '');
        db.Token.findOne({
            where: {
                token: t
            }
        }).then(function(token){
            if (!token){
                throw('');
            }
        }).catch(function(){
            logger.info('Access Denied');
            res.status(401).send(JSON.stringify({}));
        });
    }
    next();
};
