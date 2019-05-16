//## Section One (Project Setup)

//1. cocurrently setup {"dev": "concurrently \"nodemon\" \"cd client && npm start \" "}

//2. body-parser middleware >npm i body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//3. sendFile index.html & serve statics

app.use(express.static('client/build'));

const path = require('path');
app.get('*', (req, res) => {
  res.send(path.resolve('client', 'build', 'index.html'));
});

// ./client npm run build

//4.
