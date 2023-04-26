const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

let Product = MySequelize.define('products', {
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
    type: Sequelize.TEXT,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
