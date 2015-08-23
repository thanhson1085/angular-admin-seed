'use strict';

var config = require('config');
var express = require('express');
var db = require('./models');
var app = express();

app.use(require('./apis'));

// Start web server at port 3000
db.sequelize.sync().then(function () {
    var port = config.get('server.port');
    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Server start at http://%s:%s', host, port);
    });
});

