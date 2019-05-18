const router = require('express').Router();
const Blog = require('../models/Blog');

router.get('/blogs', async (req, res) => {
  const { _id } = req.user;

  res.json(await Blog.find({ _user: _id }));
});

router.post('/blogs', async (req, res) => {
  const { title, content } = req.body;
  const { _id } = req.user;

  await Blog.collection.insertOne({ title, content, _user: _id });
  res.send('null');
});

module.exports = router;
