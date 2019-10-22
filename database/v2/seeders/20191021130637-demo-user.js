'use strict';
const hashHelpers = require('../../../api/helpers/hashHelpers');

async function createMockUser(i) {
    const data = await hashHelpers.createHash("password");
    const obj = {
      userName: `John Doe`,
      email: `demo${i}@demo.com`,
      password: data,
      role: 'User',
      locale: 'ru',
      resetPasswordToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return obj;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const dataTemp = await Promise.all(Array(10).fill(1).map((el, i) => {
      return createMockUser(i).then(obj => obj);
    }))
    
    return queryInterface.bulkInsert('users', dataTemp, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    const where = {
      email: {
        [Op.regexp]: 'demo[0-9]{0,}@demo\.com'
      }
    }

    return queryInterface.bulkDelete('users', where, {});
  }
};
