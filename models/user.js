const mongoose = require('mongoose');
const Exercise = require('./exercise');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }
});

userSchema.statics.findUserWithLogs = function(userId, callback) {
  this.findById(userId, function(err, user) {
    if (err) callback(err);
    Exercise.find({ userId }, function(err, logs) {
      if (err) callback(err);
      let { _id, username } = user;
      callback(null, { _id, username, exercises: logs });
    });
  });
};

module.exports = mongoose.model('User', userSchema);
