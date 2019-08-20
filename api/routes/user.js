const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

router.post('/login', controllers.login);

router.post('/registration', controllers.registration);
router.post('/google/auth', controllers.googleLogin);
module.exports = router;
