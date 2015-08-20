var express = require('express')
    , router = express.Router()
    , crypto = require('crypto');

// list users
router.get('/api/v1/users', function(req, res){
    res.send(JSON.stringify({}));
});

// login
router.post('/api/v1/login', function(req, res){
    crypto.randomBytes(64, function(ex, buf) {
        var token = buf.toString('base64');
        res.send(JSON.stringify({
            access_token: token
        }));
    });
});

module.exports = router
