const { Buffer } = require('safe-buffer');

module.exports = ({ _id }) => {
  const sessionString = `{"passport":{"user":"${_id.toString()}"}}`;
  return Buffer.from(sessionString).toString('base64');
};
