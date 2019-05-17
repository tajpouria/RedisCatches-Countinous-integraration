const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('config');

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: config.get('googleOauth.clientID'),
      clientSecret: config.get('googleOauth.clientSecret')
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
