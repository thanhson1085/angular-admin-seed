var config = require('config');
var express = require('express');
var app = express();

app.use(function(req, res, next){
    res.header('Content-Type', 'application/json');
    next();
});

// general infor of your application
app.get('/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({}));
});

// Start web server at port 3000
var port = config.get("server.port");
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Combines swaggers http://%s:%s', host, port);
});

