const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Constant = require('../utils/Constant');

let ProductUnit = MySequelize.define('product_units', {
  price: {
    type: Sequelize.INTEGER,
    defaultValue: Constant.PRICE_DEFAULT,
  },
  productId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
});
module.exports = ProductUnit;
