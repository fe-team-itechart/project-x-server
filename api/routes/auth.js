const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');
const passport = require('passport');

router.post('/login', controllers.login);
router.post('/registration', controllers.registration);
router.get('/linkedin/auth', (req, res) => {
  res.send(req.body);
});
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  controllers.googleLogin
);

router.get('/auth/linkedin', passport.authenticate('linkedin'));
router.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/', session: false }),
  controllers.linkeinLogin
);

router.put('/change-password', controllers.changePassword);
module.exports = router;
