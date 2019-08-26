const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:8080/api/users/auth/google/callback',
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        const userData = {
          email: profile.emails[0].value,
          name: profile.displayName,
          token: accessToken,
        };
        done(null, userData);
      }
    )
  );
};
