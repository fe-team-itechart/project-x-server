const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');
const passport = require('passport');

router.post('/login', controllers.login);
router.post('/registration', controllers.registration);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  controllers.socialLogin
);

router.get('/auth/linkedin', passport.authenticate('linkedin'));
router.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/', session: false }),
  controllers.socialLogin
);

router.post('/reset', controllers.reset);

router.post('/reset/:linkId', controllers.resetApprovementPassword);

router.post('/reset-password', controllers.resetPassword);

router.put('/change-password/:userId', controllers.changePassword);

module.exports = router;
