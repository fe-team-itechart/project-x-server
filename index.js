const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const sequelize = require('./database/index');

const users = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/api/users/', users);

app.use(function(error, req, res, next) {
  res.status(400).json({ message: error.message });
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
