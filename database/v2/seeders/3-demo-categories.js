const readXlsxFile = require('read-excel-file/node');

async function getMockCategories() {
  const rows = await readXlsxFile('../v2/asserts/mock-categories.xlsx');
  const data = [];
  for (let index = 1; index < rows.length; index++) {
    const row = rows[index];
    data.push({
      id: row[0],
      title: row[1].slice(0, 64),
      parent_id: row[2]
    });
  }
  return data;
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await getMockCategories();
    return queryInterface.bulkInsert('categories', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
