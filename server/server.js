var config = require('config');
var express = require('express');
var app = express();

app.use(function(req, res, next){
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// nothing for root
app.get('/', function(req, res){
    res.send(JSON.stringify({}));
});

// list users
app.get('/api/v1/users', function(req, res){
    res.send(JSON.stringify({}));
});

// login
app.post('/api/v1/login', function(req, res){
    res.send(JSON.stringify({
        access_token: 'test'
    }));
});

// Start web server at port 3000
var port = config.get("server.port");
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server start at http://%s:%s', host, port);
});

