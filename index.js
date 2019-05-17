const bodyParser = require('body-parser');
const winston = require('winston');
const express = require('express');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const googleSetup = require('./services/passport-config');
// require routes
const authRoutes = require('./routes/authRoutes');

const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' });

app.use(bodyParser.json());
app.use(express.static('client/build'));

// handling routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});
app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, winston.info(`Listening on port ${port}...`));
