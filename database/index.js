const models = require('./schemas');
const Sequelize = require('sequelize');
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

db.sequelize.sync({ force: false }).then(() => {
  db.Users.findOrCreate({
    where: {
      email: 'admin@admin.com',
      password: 'user',
    },
  })
    .then(user => ErrorHandler(user))
    .catch(e => ErrorHandler(e, { show: true }));

  db.Profiles.findOrCreate({
    where: {
      userId: 1,
    },
  })
    .then(profile => ErrorHandler(profile))
    .catch(e => ErrorHandler(e, { show: true }));

  db.PublicProfiles.findOrCreate({
    where: {
      id: 1,
      firstName: 'Oleg',
      lastName: 'Panasyuk',
      ProfileId: 1,
    },
  })
    .then(profile => ErrorHandler(profile))
    .catch(e => ErrorHandler(e, { show: true }));
});

module.exports = db;
