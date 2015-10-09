'use strict';
var express = require('express'), 
    router = express.Router(), 
    fs = require('fs'),
    logger = require('../utils/logger'),
    q = require('../queues'),
    busboy = require('connect-busboy');

router.use(busboy()); 

router.post('/', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        var filePath = __dirname + '/../upload/' + filename;
        fstream = fs.createWriteStream(filePath);
        logger.info('Store file ' + filePath);
        file.pipe(fstream);
        fstream.on('close', function () {
            q.create('thumbnail', {
                path: filePath
            }).priority('high').save();
            res.send(JSON.stringify({'path': __dirname + '/files/' + filename}));
        });
    });
});

module.exports = router;
