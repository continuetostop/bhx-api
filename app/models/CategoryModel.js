const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

let Category = MySequelize.define('categories', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
});

module.exports = Category;
