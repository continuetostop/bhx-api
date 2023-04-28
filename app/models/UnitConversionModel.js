const Sequelize = require('sequelize');
const Mysequlize = require('../utils/Sequelize');

const UnitConversion = Mysequlize.define('unit_conversions', {
  multiplier: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UnitConversion;
