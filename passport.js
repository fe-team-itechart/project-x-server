const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:8080/api/users/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        const userData = {
          id: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          token: accessToken,
        };
        done(null, userData);
      }
    )
  );
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: 'http://localhost:8080/api/users/auth/linkedin/callback',
        scope: ['r_liteprofile', 'r_emailaddress'],
      },
      (accessToken, refreshToken, profile, done) => {
        const userData = {
          id: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          token: accessToken,
        };
        done(null, userData);
      }
    )
  );
};
