const path = require('path');
const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const Blog = require('../models/Blog');

router.get('/', requireAuth, (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});

router.get('/new', requireAuth, (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});

router.post('/', requireAuth, async ({ body: { title, content } }, res) => {
  await Blog.collection.insertOne({ title, content });
  res.redirect('/blogs');
});

module.exports = router;
