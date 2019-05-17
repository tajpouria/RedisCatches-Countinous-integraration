const path = require('path');
const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

router.get('/', requireAuth, (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});

module.exports = router;
