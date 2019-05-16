const bodyParser = require('body-parser');
const winston = require('winston');
const express = require('express');
const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' });

app.use(bodyParser.json());
app.use(express.static('client/build'));

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, winston.info(`Listening on port ${port}...`));
