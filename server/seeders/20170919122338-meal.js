'use strict';
const csv = require('csvtojson');
const csvFilePath='../../mealData.csv';
const headersArray = ['title', 'price', 'available_quantity', 'image', 'description']

const parseCsvToJson = (cb) => {
  csv({noheader: true, headers: headersArray})
    .fromFile(csvFilePath)
    .on('end_parsed',(jsonArrObj) => {
      cb(null, jsonArrObj)
    })
}
module.exports = {
  up: (queryInterface) => {
    parseCsvToJson((err, jsonObj) => {
      if (err) {
        return err;
      }
      return queryInterface.bulkInsert('Meals', jsonObj, {});
    }); 
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
