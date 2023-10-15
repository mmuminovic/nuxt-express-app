'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
      {
        name: 'Sample Item 1',
        date: new Date(),
        important: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sample Item 2',
        date: new Date(),
        important: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {})
  }
}
