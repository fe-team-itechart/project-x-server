const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

const middlewares = require('../middlewares/index');

//router.use(middlewares.refreshAccessToken);

router.post('/login', controllers.login);

module.exports = router;
