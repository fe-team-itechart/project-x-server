const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const users = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users/', users);

/**
 * TODO:  Rewrite errors from login and registration routers
 */

app.use(function(error, req, res, next) {
  if (error.message) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).send({ status: 400, message: error.toString() });
  }
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
