'use strict';
var express = require('express'), 
    router = express.Router();

router.use('/api/v1/users', require('./users'));
router.use('/api/v1/terms', require('./terms'));
router.use('/api/v1/termRelationships', require('./termRelationships'));
router.use('/api/v1/options', require('./options'));
router.use('/api/v1/usermeta', require('./usermeta'));
router.use('/api/v1/upload', require('./upload'));

// nothing for root
router.get('/', function(req, res){
    res.send(JSON.stringify({}));
});

module.exports = router;
