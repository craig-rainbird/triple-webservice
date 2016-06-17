var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

var router = require('./router');

app.disable('x-powered-by');
var server = http.createServer(app);

app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());

function processQuery(apiKey, subject, relationship, req, res) {

    router.querySubjectRelationship(apiKey, subject, relationship, function(err, data) {
        if (err) {
            res.status(400).send({'status': 'ERROR',
                'message':  err.message });
        } else {
            res.status(200).send({ 'status': 'OK',
                'data':   data });
        }
    });
}

app.get('/query/:key/:subject/:relationship', function(req, res) {
    processQuery(req.params.key, req.params.subject, req.params.relationship, req, res);
});

app.get('/:key/query/:subject/:relationship', function(req, res) {
    processQuery(req.params.key, req.params.subject, req.params.relationship, req, res);
});

var port = 8888;

server.listen(port, function () {
    console.log('Listening on :' + port);
});
