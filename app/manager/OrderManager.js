const { where } = require('sequelize');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const {
  HTTP_STATUS,
  MESSAGE,
  CODE_ERROR_STATUS,
} = require('../utils/Constant');
const Product = require('../models/ProductModel');

module.exports = {
  create: async (data, callback) => {
    console.log('🚀 ~ file: OrderManager.js:12 ~ create: ~ data:', data);
    const user = await User.findByPk(data.payload.id, { raw: true });

    const { id, name, address, phone, emal } = user;
    const orderData = { userId: id, name, address, phone, emal };
    try {
      // const resultOrder = await Order.create(orderData);
      // const result = resultOrder.id;
      Promise.all(
        data.listItems.map((item) => {
          let dataProduct = {};
          let resultProduct;
          if (typeof item == 'object') {
            dataItem = { ...item };
            console.log(
              '🚀 ~ file: OrderManager.js:27 ~ data.listItems.map ~ dataItem:',
              dataItem
            );
          } else {
            dataItem = { ...JSON.parse(item) };
            resultProduct = Product.console.log(
              '🚀 ~ file: OrderManager.js:28 ~ data.listItems.map ~ dataItem:',
              dataItem
            );
          }
        })
      );
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.CREATE_SUCCESSFULLY,
        HTTP_STATUS.CREATED,
        null,
        result
      );
    } catch (error) {
      console.log('🚀 ~ file: OrderManager.js:37 ~ create: ~ error:', error);
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.CREATE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  getById: async (id, data, callback) => {
    const where = { id, userId: data.payload.id };
    try {
      const resultOrder = await Order.findOne({ where, raw: true });

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.GET_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        resultOrder
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.GET_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  getList: async (query, data, callback) => {
    const where = { userId: data.payload.id };
    try {
      const resultOrder = await Order.findAll({ where, raw: true });
      // console.log(
      //   '🚀 ~ file: OrderManager.js:46 ~ getList: ~ resultOrder:',
      //   resultOrder
      // );

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.GET_LIST_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        resultOrder
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.GET_LIST_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  delete: async (id, data, callback) => {
    const where = { id, userId: data.payload.id };
    try {
      const resultOrder = await Order.destroy({ where });

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.DELETE_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        where.id
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.DELETE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  update: async (id, data, callback) => {
    const where = { id };
    const orderData = {};
    if (data.status) {
      orderData.status = data.status;
    }
    try {
      if (data.payload.role === null) {
        const resultOrder = Order.update(orderData, { where });
        return callback(
          CODE_ERROR_STATUS.SUCCESS,
          MESSAGE.UPDATE_SUCCESSFULLY,
          HTTP_STATUS.OK,
          null,
          where
        );
      } else {
        return callback(
          CODE_ERROR_STATUS.ERROR,
          MESSAGE.UPDATE_FAILED,
          HTTP_STATUS.BAD_REQUEST,
          error,
          null
        );
      }
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.UPDATE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
};
