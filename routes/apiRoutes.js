const router = require('express').Router();
const Blog = require('../models/Blog');

router.get('/blogs', async (req, res) => {
  res.json(await Blog.find({}));
});

module.exports = router;
