const express = require('express');

require('dotenv').config();
const routers = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;

const { registrationRouter, authRouter } = routers;

app.use(express.json());

app.use('/api/user/', registrationRouter);

app.use((error, req, res, next) => {
  res.status(401).send({ status: 401, message: error });
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
