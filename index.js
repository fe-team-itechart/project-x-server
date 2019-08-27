require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const session = require('express-session')

const { auth } = require('./api/routes');
const { errorHandlerMiddleware } = require('./api/middlewares');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

require('./passport')(passport);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users/', auth);

/**
 * TODO:  Rewrite processing of errors from login and registration routers
 */

app.use(errorHandlerMiddleware);

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
