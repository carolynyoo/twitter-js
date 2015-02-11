var express = require('express');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.listen(3000);

app.get('/', function (req, res) {
  res.send('Hello world!');
})

app.get('/news', function (req, res) {
  res.send('This is news and improved!');
})

 