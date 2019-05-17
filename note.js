/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable arrow-spacing */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */
/* eslint-disable spaced-comment */

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

//4. OAuth passport (google strategy)
// > npm i passport passport-google-oauth20 cookie-session

// setup passport-config ./services/passport-config.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: 'CLIENTID',
      clietSecret: 'CLIENTSECRET'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ id: profile.id }).then(currentUser => {
        if (currentUser) return done(null, currentUser);

        new User({ googleID: id, displayName }).save().then(newUser => {
          done(null, newUser);
        });
        return undefined;
      });
    }
  )
);

// install cookieSession and passport-session

const cookieSession = require('cookie-session');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['nddsaihfsa+41765']
  })
);
app.use(passport.initialize());
app.use(passport.session());

// setup authRoutes ./routes/authRoutes.js

router.get('/google', passport.authenticate('google')); // -> ./index.js require('./services/passport-config')
router.get('/google/callback', (req, res) => {
  res.send(req.user); //user if accessible here
});
