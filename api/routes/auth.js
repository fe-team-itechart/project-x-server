const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');

router.post('/login', controllers.login);
router.post('/registration', controllers.registration);
router.post('/google/auth', controllers.googleLogin);

router.post('/reset', controllers.reset);

router.post('/reset/:linkId', controllers.resetApprovementPassword);

router.post('/resetPassword', controllers.resetPassword);

router.put('/change-password', controllers.changePassword);

module.exports = router;
