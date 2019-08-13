const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const dirName = (__dirname + '\\schemas');
const { ErrorHandler } = require('../services');

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

fs
  .readdirSync(dirName)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(dirName, file));
    db[model.name] = model;
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ force: false }).then(() => {
  db.Users.findOrCreate({
    where: {
      email: 'admin@admin.com',
      password: 'user',
    }
  })
    .then(user => ErrorHandler(user))
    .catch(e => ErrorHandler(e, {show: true}));

  db.Profiles.findOrCreate({
    where: {
      info: {
        "firstName": "Oleg",
        "lastName": "Panasyuk"
      },
      userId: 1
    }
  })
    .then(profile => ErrorHandler(profile))
    .catch(e => ErrorHandler(e, {show: true}))
});

module.exports = db;
