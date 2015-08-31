'use strict';
var db = require('../models');
module.exports = function(req, res, next) {
    var t = req.get("authorization");
    if (req.body.username && req.body.password && (req.url.indexOf('login') < 0)){
        db.Token.findOne({
            where: {
                token: t
            }
        }).then(function(token){
            if (!token){
                throw('');
            }
        }).catch(function(){
            res.status(401).end();
        });
    }
    next();
}
