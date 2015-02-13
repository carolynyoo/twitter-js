var express = require('express');
var logger = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var routes = require('./routes/');

var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(logger('dev'));
app.use(urlencodedParser);

var server = app.listen(3000);
var io = socketio.listen(server);

app.use('/', routes(io));
app.use(express.static(__dirname + '/public'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// change back for production view
swig.setDefaults({cache:false});