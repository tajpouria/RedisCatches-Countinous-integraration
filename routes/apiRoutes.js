const router = require('express').Router();
const Blog = require('../models/Blog');

router.get('/blogs', async (req, res) => {
  res.json(await Blog.find({}));
});

router.post('/blogs', async (req, res) => {
  const { title, content } = req.body;
  await Blog.collection.insertOne({ title, content });
  res.send('null');
});

module.exports = router;
