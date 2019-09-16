const express = require('express');
const router = express.Router();
const controllers = require('../controllers/profile');

router.get('/public', controllers.getProfile);
router.put('/public', controllers.updateProfile);

module.exports = router;