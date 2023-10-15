const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        username: 'test',
        email: 'test@example.com',
        password: await bcrypt.hash('testtest', 12),
        firstName: 'Test',
        lastName: 'User',
        biography: 'This is the biography of Test User.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'test2',
        email: 'test2@example.com',
        password: await bcrypt.hash('testtest', 12),
        firstName: 'Test2',
        lastName: 'User2',
        biography: 'This is the biography of Test2 User2.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Users', users)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
