const Sequelize = require('sequelize');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const {
  HTTP_STATUS,
  MESSAGE,
  CODE_ERROR_STATUS,
} = require('../utils/Constant');
const Product = require('../models/ProductModel');
const GroupUnit = require('../models/GroupUnitModel');
const ProductHandler = require('../handlers/ProductHandler');
const OrderDetail = require('../models/OrderDetailModel');

module.exports = {
  create: async (data, callback) => {
    const user = await User.findByPk(data.payload.id, { raw: true });

    const { id, name, address, phone, emal } = user;
    const orderData = { userId: id, name, address, phone, emal };
    let total = 0;
    try {
      const resultOrder = await Order.create(orderData);
      const result = { id: resultOrder.id };
      where = { id: resultOrder.id };
      await Promise.all(
        data.listItems.map(async (item) => {
          let dataOrderDetail = {};

          let resultProduct,
            dataItem,
            productInf,
            groupUnitInfo,
            groupUnitInfoDetail,
            listPriceProductRaw;
          if (typeof item == 'object') {
            dataItem = { ...item };
          } else {
            dataItem = { ...JSON.parse(item) };
          }
          dataOrderDetail.productId = dataItem.productId;
          dataOrderDetail.productCodeId = dataItem.productCodeId;
          dataOrderDetail.qty = dataItem.qty;

          productInf = await Product.findByPk(dataItem.productId);

          dataOrderDetail.name = productInf.name;
          dataOrderDetail.image = productInf.image;

          groupUnitInfo = await GroupUnit.findByPk(productInf.groupUnitId);
          groupUnitInfoDetail = await groupUnitInfo.getUnits({ raw: true });

          listPriceProductRaw = await productInf.getUnits({ raw: true });

          // remove price < 0
          listPriceProductRaw = listPriceProductRaw.filter(
            (priceProductRaw) => priceProductRaw['product_units.price'] > 0
          );

          let listPriceProduct = await Promise.all(
            ProductHandler.getById(listPriceProductRaw, groupUnitInfoDetail)
          );
          const index = listPriceProduct.findIndex(
            (priceProduct) =>
              priceProduct.productCodeId === dataItem.productCodeId
          );

          dataOrderDetail.price = listPriceProduct[index].price;
          dataOrderDetail.subtotal =
            dataOrderDetail.price * dataOrderDetail.qty;
          total = total + dataOrderDetail.subtotal;

          let resultOrderDetail = await OrderDetail.create(dataOrderDetail);
          resultOrder.addOrder_details([resultOrderDetail.id]);
        })
      );

      await Order.update({ total: total }, { where });
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.CREATE_SUCCESSFULLY,
        HTTP_STATUS.CREATED,
        null,
        result
      );
    } catch (error) {
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
      const resultOrder = await Order.findOne({
        include: OrderDetail,
        where,
      });

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
      const resultOrder = await Order.findAll({
        include: {
          model: OrderDetail,
        },
        where,
      });

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
