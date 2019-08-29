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
        callbackURL: process.env.SERVER_HOST + 'api/users/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        const {
          id,
          name: { givenName, familyName },
          emails,
        } = profile;
        const userData = {
          id: id,
          email: emails[0].value,
          firstName: givenName,
          lastName: familyName,
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
        callbackURL:
          process.env.SERVER_HOST + 'api/users/auth/linkedin/callback',
        scope: ['r_liteprofile', 'r_emailaddress'],
      },
      (accessToken, refreshToken, profile, done) => {
        const {
          id,
          name: { givenName, familyName },
          emails,
        } = profile;
        const userData = {
          id: id,
          email: emails[0].value,
          firstName: givenName,
          lastName: familyName,
          token: accessToken,
        };
        done(null, userData);
      }
    )
  );
};
