var express = require('express'), 
    router = express.Router(),
    db = require('../models');

// nothing for root
router.get('/', function(req, res){
    res.send(JSON.stringify({}));
});

module.exports = router
