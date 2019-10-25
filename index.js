require('dotenv').config();

const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./database');

require('express-async-errors');

const { auth, profile, course } = require('./api/routes');
const { errorHandlerMiddleware } = require('./api/middlewares');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.resolve(__dirname + '/build')));

app.use('/api/users/', auth);
app.use('/api/profile/', profile);
app.use('/api/course/', course);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.use(errorHandlerMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  db.sequelize.connectionManager.close();
  server.close();
});
