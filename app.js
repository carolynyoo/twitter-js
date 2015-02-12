var express = require('express');
var logger = require('morgan');
var swig = require('swig');
var routes = require('./routes/');

var app = express();

app.use(logger('dev'));
app.use('/', routes);
app.use(express.static(__dirname + '/public'));

app.listen(3000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// change back for production view
swig.setDefaults({cache:false});