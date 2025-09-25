const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('modern', 'imannode', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;