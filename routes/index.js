var express = require('express')

//Integration with Models
var User = require('../models/index.js').User;
var Tweet = require('../models/index.js').Tweet;

module.exports = function(io) {
  var router = express.Router()

  router.get('/', function(req, res) {
    var tweetArray = [];

    // PROMISES
    // then, done, success (etc) - read as
    // and then on success, do .. 

    Tweet.findAll({ include: [ User ] })
    .then(function(tweets) {
        tweets.map(function (tweet) {
        var vals = tweet.get();
        vals.User = tweet.User.get();
        return vals;
      }); 
      res.render('index', {
        tweets: tweets,
        showForm: true
      })
    })

  })

  router.get('/users/:name', function(req, res) {
    var userName = req.params.name

    // one user, so .find
    // remember to put res render inside promise 
    User
    .find({where: {name: userName}})
    .then(function (user) {
      user
      .getTweets()
      .then(function (tweets) {
          var tweetArray = tweets.map(function (tweet) {
          var vals = tweet.get();
          vals.User = user;
          return vals;
        });
          res.render('index', {
            tweets: tweetArray,
            formName: userName,
            showForm: true
          })
      })
    })
  })

  router.get('/users/:name/tweets/:id', function(req, res){
    req.params.id = parseInt(req.params.id)
    Tweet
    .find({include: [User], where: {id: req.params.id}})
    .success(function (tweet) {
      res.render('index', {
      tweets: [tweet]
      })
    })
  })

  router.post('/submit', function(req, res){
    // follows the input names that have been defined in html
    var userName = req.body.name;
    var tweetText = req.body.text;
    var tableUserId = "";
    var tweetArray = [];
    //(1) See if userName already exists in Users table
    // (1a) IF it does, THEN get the ID of the User and RETURN
    // (1b) ELSE CREATE userName in Users table and return User ID
    //(2) Create a new tweetText in the Tweet table with a userId from 1a/1b and an auto-incremented ID

    User
    .findOrCreate({ where: {name: userName}, defaults: {name: userName} })
    .then(function (user) {
      tableUserId = user[0].id;
      // console.log("WROTE TO USER TABLE " + tableUserId);
      Tweet
      .create({UserId: tableUserId, tweet: tweetText})
      // console.log("WROTE TO TWEET TABLE, NEW TWEET " + tweetText);
      .then(function (tweet) {
        io.sockets.emit('new_tweet', {
          tweet: tweet.tweet,
          User: {name: user.name}
        });
        res.redirect('/');
      })
      // key to socket - put as promise after success of tweet creation
    })
  })

  return router
}