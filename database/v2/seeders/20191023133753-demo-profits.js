const readXlsxFile = require('read-excel-file/node');

async function getMockData() {
  const rows = await readXlsxFile('../v2/asserts/mock-profits.xlsx');
  const data = [];
  for (let index = 2; index < rows.length; index++) {
    const row = rows[index];
    data.push({
      id: row[0],
      description: row[1],
      courseId: row[2]
    })
  }
  return data;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await getMockData();
    return queryInterface.bulkInsert('profits', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('profits', null, {});
  }
};
