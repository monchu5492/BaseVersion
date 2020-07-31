const Sequelize = require('sequelize')
const UserModel = require('../../app/models/user')

const sequelize = new Sequelize('wabase01', '', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)

module.exports = {
  User,
}
