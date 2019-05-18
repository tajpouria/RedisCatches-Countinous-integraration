const router = require('express').Router();
const Blog = require('../models/Blog');
const clearCache = require('../middlewares/clearCache');
const requireAuth = require('../middlewares/requireAuth');

router.get('/blogs', requireAuth, async (req, res) => {
  const { _id } = req.user;

  res.json(await Blog.find({ _user: _id }).cache(_id));
});

router.post('/blogs', requireAuth, clearCache, async (req, res) => {
  const { title, content } = req.body;
  const { _id } = req.user;

  await Blog.collection.insertOne({ title, content, _user: _id });
  res.redirect('/blogs');
});

module.exports = router;
