var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    // defining table called Tweets (pluralizes)
    // with following types
    var Tweet = sequelize.define('Tweet', {
      tweet: Sequelize.STRING
    }, {
      timestamps: false // this will deactivate the time columns
    });

    return Tweet;
}