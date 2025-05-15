const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

User.getTableName = () => 'user';

module.exports = User;
