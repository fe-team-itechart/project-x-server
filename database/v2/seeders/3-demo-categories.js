function createMockCategory(i) {
  const obj = {
    id: i,
    title: `Category-${i}`,
  };
  return obj;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = Array(20)
      .fill(1)
      .map((el, index) => {
        return createMockCategory(index);
      });
    return queryInterface.bulkInsert('categories', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
