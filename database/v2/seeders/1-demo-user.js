const hashHelpers = require('../../../api/helpers/hashHelpers');

async function createMockUser(index) {
  const data = await hashHelpers.createHash('Password123456789!');
  const obj = {
    id: index + 1,
    email: `demo${index}@demo.com`,
    password: data,
    userName: `John Doe`,
    role: 'User',
    locale: 'ru',
    resetPasswordToken: null,
  };
  return obj;
}

function createMockProfile(index) {
  const profile = {
    id: index + 1,
  };
  return profile;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await Promise.all(
      Array(10)
        .fill(1)
        .map((el, index) => {
          return createMockUser(index).then(user => user);
        })
    );

    const profiles = Array(10)
      .fill(1)
      .map((el, index) => {
        return createMockProfile(index);
      });

    return Promise.all([
      queryInterface.bulkInsert('users', users, {}),
      queryInterface.bulkInsert('public_profiles', profiles, {}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    const whereUsers = {
      email: {
        [Op.regexp]: 'demo[0-9]{0,}@demo.com',
      },
    };

    const whereProfiles = {
      id: {
        [Op.and]: [{ [Op.gte]: 1 }, { [Op.lte]: 10 }],
      },
    };

    return Promise.all([
      queryInterface.bulkDelete('users', whereUsers, {}),
      queryInterface.bulkDelete('public_profiles', whereProfiles, {}),
    ]);
  },
};
