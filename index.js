require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { user } = require('./api/routes');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users/', user);

/**
 * TODO:  Rewrite processing of errors from login and registration routers
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
