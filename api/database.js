const Sequelize = require('sequelize')

const sequelize = new Sequelize('nuxt_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5432
})

module.exports = sequelize
