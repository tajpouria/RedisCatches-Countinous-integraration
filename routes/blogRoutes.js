const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

router.get('/', requireAuth, (req, res) => {
  res.send('BLOGS');
});

module.exports = router;
