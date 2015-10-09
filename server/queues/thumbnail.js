'use strict';
var config = require('config');
var consumer = {};
var logger = require('../utils/logger');
var path = require('path');
var easyimg = require('easyimage');

consumer.name = 'thumbnail';

consumer.task = function(job, done){
    var data = job.data;
    var extension = path.extname(data.path);
    var file = path.basename(data.path,extension);
    easyimg.resize({
        src: data.path, dst: __dirname + '/../upload/' + file + '-thumbnail-100x100' + extension,
        width: 100, 
        height: 100,
    }).then(function(image) {
            logger.info('Resized and cropped: ' + image.width + ' x ' + image.height);
        }, function (err) {
            logger.error(err);
        }
    );
    done();
};

module.exports = consumer;
