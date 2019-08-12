const express = require('express');

require("dotenv").config();
const sequelize = require('./database/index')


const app = express();

const PORT = process.env.PORT || 8080

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
