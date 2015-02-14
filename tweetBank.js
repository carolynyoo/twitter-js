var _ = require('underscore');

var data = [];

var add = function (name, text, hashtag, photo, index) {
  data.unshift({name: name, text: text, hashtag: hashtag, photo: photo, id: data.length.toString()});
}

var list = function () {
  return _.clone(data);
}

var find = function (properties) {
  return _.where(data, properties);
}

module.exports = {add: add, list: list, find: find};

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Sean', 'Carolyn', 'Zeke', 'Greg', 'Omri', 'Nimit', 'David', 'Max', 'Alex', 'Lei', 'Randy', 'Pete', 'Norman', 'Victor', 'Ramnik'];
  var fakeLasts = ['Kim', 'Yoo', 'Nierenberg', 'Skerry', 'Bernstein', 'Maru', 'Yang', 'Kayen', 'Liu', 'Wong', 'Dedes', 'Chou', 'Atteh', 'Arora'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The students are just so " + randArrayEl(awesome_adj);
};

var getFakeHashtag = function () {
  var hashtags = ['#fullstacklove', '#codedreams', '#javascript', '#node', '#express'];
  return randArrayEl(hashtags)+" "+randArrayEl(hashtags);
}

var getFakePhoto = function () {
  var photos = ['sean.jpg', 'nimit.jpeg', 'carolyn.jpeg', 'fullstack.png']
  return randArrayEl(photos);
}

for(var i=0; i<20; i++) {
  module.exports.add( getFakeName(), getFakeTweet(), getFakeHashtag(), getFakePhoto());
}