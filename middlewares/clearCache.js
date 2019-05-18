const { clearHash } = require('../services/cache');

module.exports = async ({ user: { _id } }, res, next) => {
  await next();
  clearHash(_id);
};
