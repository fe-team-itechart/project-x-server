const models = require('./schemas');
const Sequelize = require('sequelize');
const { ErrorHandler } = require('../../api/middlewares/errorHandler');

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
    logging: false,
  }
);

Object.keys(models).forEach(f => {
  let model = models[f](sequelize, Sequelize);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ force: true }).then(data => {
  console.log('DONE V1');
});

module.exports = db;
