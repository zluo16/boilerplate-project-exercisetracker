const express = require('express');
const router = express.Router();
const User = require('./models/user');
const Exercise = require('./models/exercise');

// Create new user
router.post('/exercise/new-user', function(req, res) {
  let username = req.body.username;
  let user = new User({ username });
  user.save(function(err, user) {
    if (err) res.json(err);
    res.redirect(`/api/user/${user.id}`);
  });
});

// Get user
router.get('/user/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.json(err);
    res.json(user);
  });
});

// Get user with exercises
router.get('/exercise/user/:id', function(req, res) {
  let userId = req.params.id;
  User.findUserWithLogs(userId, function(err, user) {
    if (err) res.json(err);
    res.json(user);
  });
});

// Get all users
router.get('/exercise/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) res.json(err);
    res.json(users);
  });
});

// Create new exercise
router.post('/exercise/add', function(req, res) {
  let { userId, description, duration, date } = req.body;
  let exercise = new Exercise({
    userId,
    description,
    duration: parseInt(duration)
  });
  if (date !== '') exercise.date = new Date(date);
  exercise.save(function(err, exercise) {
    if (err) res.json(err);
    res.redirect(`/api/exercise/user/${userId}`);
  });
});

// Get single exercise
router.get('/exercise/:id', function(req, res) {
  Exercise.findById(req.params.id, function(err, exercise) {
    if (err) res.json(err);
    let { userId, description, duration, date } = exercise;
    res.json({ userId, description, duration, date });
  });
});

// Get exercise log for specific user
router.get('/exercise/log/:userId', async function(req, res) {
  let { userId } = req.params;
  let { from, to, limit } = req.query;
  let total_exercise_count = await Exercise.where({ userId }).countDocuments();
  let user = await User.findById(userId);
  let { username } = user;
  Exercise.queryLogs(userId, from, to, limit, function(err, log) {
    if (err) res.json(err);
    res.json({ userId, username, log, total_exercise_count });
  });
});

module.exports = router;
