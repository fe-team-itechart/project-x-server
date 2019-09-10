require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('express-async-errors');

const { auth } = require('./api/routes');
const { errorHandlerMiddleware } = require('./api/middlewares');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users/', auth);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(errorHandlerMiddleware);

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
