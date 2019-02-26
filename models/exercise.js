const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

exerciseSchema.statics.queryLogs = function(userId, from, to, limit, callback) {
  let fromDate = new Date(0);
  let toDate = new Date();
  if (!!from) fromDate = new Date(from);
  if (!!to) toDate = new Date(to);
  this.find({
    userId,
    date: { $gte: fromDate, $lt: toDate }
  }).limit(!!limit ? parseInt(limit) : 0).exec(function(err, exercises) {
    if (err) callback(err);
    callback(null, exercises);
  });
};

module.exports = mongoose.model('Exercise', exerciseSchema);
