const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');
const passport = require('passport');

router.post('/login', controllers.login);

router.post('/registration', controllers.registration);
//router.post('/google/auth', controllers.googleLogin);
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
  function(req, res) {
    console.log(req.user.token);
    const token = req.user.token;
    res.redirect('http://localhost:3000/?token=' + token);
  }
);

module.exports = router;
