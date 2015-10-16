'use strict';
var express = require('express'), 
    router = express.Router(), 
    fs = require('fs'),
    path = require('path'),
    config = require('config'),
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
            var extension = path.extname(filePath);
            var file = path.basename(filePath,extension);
            res.send(JSON.stringify({
                'path': config.get('server.url') + '/upload/' + filename,
                'thumbnails': {
                    s100: config.get('server.url') + '/upload/' + file + '-thumbnail-100x100' + extension,
                    s200: config.get('server.url') + '/upload/' + file + '-thumbnail-200x200' + extension,
                    s300: config.get('server.url') + '/upload/' + file + '-thumbnail-300x300' + extension,
                    s400: config.get('server.url') + '/upload/' + file + '-thumbnail-400x400' + extension,
                    s500: config.get('server.url') + '/upload/' + file + '-thumbnail-500x500' + extension,
                    s600: config.get('server.url') + '/upload/' + file + '-thumbnail-600x600' + extension
                }
            }));
        });
    });
});

module.exports = router;
