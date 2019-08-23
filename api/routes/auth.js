const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');

router.post('/login', controllers.login);

router.post('/registration', controllers.registration);

router.post('/reset', controllers.reset);

router.post('/reset/:linkId', controllers.resetApprovementPassword);

router.post('/resetPassword', controllers.resetPassword);

module.exports = router;
