const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

const OrderDetail = MySequelize.define(
  'order_details',
  {
    productId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    productCodeId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    nameProduct: {
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
  },
  {
    freezeTableName: true,
  }
);

module.exports = OrderDetail;
