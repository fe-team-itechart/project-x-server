'use strict';
const readXlsxFile = require('read-excel-file/node');

async function getMockData() {
  let rows = await readXlsxFile('../v2/asserts/mock-courses.xlsx');
  let data = [];
  for (let i = 2; i < 17; i++) {
    let el = rows[i];
    data.push({
      id: el[0],
      courseName: el[1],
      description: el[2],
      rating: el[3],
      numberOfEnrolledStudents: el[4],
      authors: el[5],
      language: el[6],
      creatorId: el[7]
    })
  }
  return data;
};
  

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await getMockData();
    return queryInterface.bulkInsert('courses', data, {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
