const express = require('express');
const genres = require('../routes/genres');
const books = require('../routes/books');
const users = require('../routes/users');
const auth = require('../routes/auth');
const reviews = require('../routes/reviews');
const comments = require('../routes/comments');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/books', books);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/reviews', reviews);
  app.use('/api/comments', comments);
  app.use(error);
}