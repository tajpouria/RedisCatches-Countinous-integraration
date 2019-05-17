const alert = require('alert-node');

module.exports = ({ user }, res, next) => {
  if (user) return next();

  alert('Please first login.');
  return res.redirect('/');
};
