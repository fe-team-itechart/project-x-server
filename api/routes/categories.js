const express = require('express');
const router = express.Router();

const  { categoriesController } = require('../controllers');

router.get('/', categoriesController.getAllCategories);

module.exports = router;