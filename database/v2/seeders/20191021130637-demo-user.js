const hashHelpers = require('../../../api/helpers/hashHelpers');

async function createMockUser(index) {
  const data = await hashHelpers.createHash('password');
  const obj = {
    id: index + 1,
    userName: `John Doe`,
    email: `demo${index}@demo.com`,
    password: data,
    role: 'User',
    locale: 'ru',
    resetPasswordToken: null,
  };
  return obj;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataTemp = await Promise.all(
      Array(10)
        .fill(1)
        .map((el, index) => {
          return createMockUser(index).then(user => user);
        })
    );

    return queryInterface.bulkInsert('users', dataTemp, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    const where = {
      email: {
        [Op.regexp]: 'demo[0-9]{0,}@demo.com',
      },
    };

    return queryInterface.bulkDelete('users', where, {});
  },
};
