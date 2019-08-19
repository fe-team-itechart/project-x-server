const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

const middlewares = require('../middlewares/index');

router.post('/login', controllers.login);

router.post('/registration', controllers.registration);

module.exports = router;
