var _ = require('underscore');

var data = [];

var add = function (name, text) {
  data.push({name: name, text: text});
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
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The students are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<20; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

//console.log(data);