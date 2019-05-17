const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('config');
const User = require('../models/User');

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: config.get('googleOauth.clientID'),
      clientSecret: config.get('googleOauth.clientSecret')
    },
    (accessToken, refreshToken, { id, displayName }, done) => {
      User.findOne({ googleID: id }).then((currentUser) => {
        if (currentUser) return done(null, currentUser);
        new User({ googleID: id, displayName }).save().then((newUser) => {
          done(null, newUser);
        });
        return undefined;
      });
    }
  )
);
