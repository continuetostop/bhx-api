const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

let GroupUnit = MySequelize.define('group_units', {
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
});

module.exports = GroupUnit;
