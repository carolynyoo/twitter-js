var express = require('express');
var logger = require('morgan');
var swig = require('swig');

var app = express();

app.use(logger('dev'));
app.listen(3000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + './views');

// change back for production view
swig.setDefaults({cache:false});

var people = [{name: 'Sean'}, {name: 'Carolyn'}, {name: 'Zeke'}];

app.get('/', function (req, res) {
  res.render('index', {title: 'Hall of Fame', people: people});
})

