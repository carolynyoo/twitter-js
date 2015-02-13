var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');

module.exports = function (io) {
  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true});
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find({name: name});
    res.render('index', {title: 'Twitter.js - Posts by '+name, username: name, tweets: list, showForm: true});
  })

  router.get('/users/:name/tweets/:id', function(req, res) {
    var name = req.params.name;
    var idRequested = req.params.id;
    var list = tweetBank.find({id: idRequested});
    res.render('index', {title: 'Twitter.js - Tweet by '+name, tweets: list});
  })

  router.post('/submit', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    var username = req.body.name;
    var bodytext=req.body.text;
    var oneTweet = {name: username, text: bodytext};
    tweetBank.add(username, bodytext);
    io.sockets.emit('new_tweet', oneTweet);
  })
  return router;
}