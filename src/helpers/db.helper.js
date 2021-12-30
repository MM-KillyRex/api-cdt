const Sequelize = require('sequelize');
require('../environments/config');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    // acquire: 100 * 1000,
    acquire: 30000,
    idle: 10000
  },
  //logging: false
});

module.exports = {
  sequelize,
  Sequelize
};