'use strict';
var express = require('express'), 
    router = express.Router();

router.use('/api/v1/users', require('./users'));
router.use('/api/v1/options', require('./options'));

// nothing for root
router.get('/', function(req, res){
    res.send(JSON.stringify({}));
});

module.exports = router;
