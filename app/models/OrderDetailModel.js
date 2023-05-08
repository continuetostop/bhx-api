const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

const OrderDetail = MySequelize.define('order_details', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  productCodeId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  subtotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderDetail;
