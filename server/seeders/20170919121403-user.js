'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'no',
      username: 'joh',
      role: 'user',
      email: 'johno@gmail.com',
      image: null,
      hashedPassword: bcrypt.hashSync('johno', 12),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'london',
      username: 'egypt',
      role: 'admin',
      email: 'egypt@gmail.com',
      image: null,
      hashedPassword: bcrypt.hashSync('egypt', 12),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
