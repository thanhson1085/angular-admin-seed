'use strict';
var express = require('express'), 
    router = express.Router();

router.use('/api/v1/users', require('./users'));

// add-on swagger-ui
router.use('/swagger', express.static('./node_modules/swagger-ui/dist'));

// nothing for root
router.get('/', function(req, res){
    res.send(JSON.stringify({}));
});

module.exports = router;
