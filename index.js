const passport = require('passport');
const cookieSession = require('cookie-session');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const winston = require('winston');
const express = require('express');
const path = require('path');
// google passport-config
require('./services/passport-config');
// redis cache
require('./services/cache')
// require routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
// db connection
mongoose.Promise = global.Promise;
const db = config.get('database.mongodb.uri');
mongoose.connect(db, { useNewUrlParser: true }, (err) => {
  if (err) {
    winston.error(err.message, err);
    return process.exit(1);
  }
  return winston.info(`Successfully connected to ${db}`);
});
// unhandledRejections
process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
  return process.exit(1);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
// middleWares
app.use(bodyParser.json());
app.use(express.static('client/build'));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.get('session.cookieKey')]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// handling routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 5000;
app.listen(port, winston.info(`Listening on port ${port}...`));
