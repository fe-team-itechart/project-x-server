const express = require('express');

require('dotenv').config();
const routers = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;

const { registrationRouter, authRouter } = routers;

app.use(express.json());

app.use('/api/user/', registrationRouter);

app.use((error, req, res, next) => {
  res.status(400).send({ status: 400, message: error.toString() });
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
