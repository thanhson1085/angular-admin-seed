'use strict';
var express = require('express'), 
    router = express.Router(), 
    fs = require('fs'),
    busboy = require('connect-busboy');

router.use(busboy()); 

router.post('/fileupload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

module.exports = router;
