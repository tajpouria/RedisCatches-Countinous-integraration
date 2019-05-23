module.exports = ({ user }, res, next) => {
  if (user) return next();

  return res.status(401).send({ error: 'require login' });
};
