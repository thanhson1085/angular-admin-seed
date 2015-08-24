'use strict';

var config = require('config');
var express = require('express');
var db = require('./models');
var fs = require('fs');
var yaml = require('js-yaml');
var app = express();

// add-on swagger-ui
app.use('/swagger', express.static('./node_modules/swagger-ui/dist'));

// redirect page
app.use('/', express.static('./server/docs'));

// api-json swagger
app.get('/docs', function(req, res){
    var docs = yaml.safeLoad(fs.readFileSync('./server/docs/swagger.yml', 'utf8'));
    res.send(JSON.stringify(docs));
});

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

