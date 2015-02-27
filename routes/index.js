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
      tweetArray = tweets.map(function (tweet) {
        var vals = tweet.get();
        vals.User = tweet.User.get();
        return vals;
      }); 
      res.render('index', {
        tweets: tweetArray,
        showForm: true
      })
    })

  })

  router.get('/users/:name', function(req, res) {

    var tweetArray = [];
    var userName = req.params.name

    // fix
    User.findAll({where: {name: userName}})
    .then(function(user) {
      user.getTweets()
          .then(function (tweets) {
            var tweetArray = tweets.map(function (tweet) {
              var vals = tweet.get();
              vals.User = user;
              return vals;
            })
          })

      res.render('index', {
        tweets: tweetArray,
        formName: userName,
        showForm: true
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

    User.findOrCreate({ where: {name: userName}, defaults: {} })
    .then(function(user) {
      tableUserId = user[0].dataValues.id;
      // console.log("WROTE TO USER TABLE " + tableUserId);
      Tweet.create({UserId: tableUserId, tweet: tweetText});
      // console.log("WROTE TO TWEET TABLE, NEW TWEET " + tweetText);
      }
    )

    //Select all tweets from database and push them into tweetArray

    //TODO

    Tweet.findAll({ include: [ User ] })
    .then(function(tweets) {
      for (var i = 0; i < tweets.length; i++) {
        tweetArray.push(tweets[i].dataValues);
        var all_tweets = tweetArray;
        var last_tweet = all_tweets[all_tweets.length-1];
        // last_tweet = last_tweet[last_tweet.length-1];
        // console.log(last_tweet);
        io.sockets.emit('new_tweet', last_tweet);
        res.redirect('/')
      }
    })
    
  })

  return router
}