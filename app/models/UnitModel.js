const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

let Unit = MySequelize.define('units', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});
module.exports = Unit;
