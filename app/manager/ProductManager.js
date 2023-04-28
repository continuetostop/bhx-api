const Validator = require('validator');
const Sequelize = require('sequelize');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');
const GroupUnit = require('../models/GroupUnitModel');
const {
  CODE_ERROR_STATUS,
  MESSEAGE,
  HTTP_STATUS,
} = require('../utils/Constant');
const { query } = require('express');

module.exports = {
  create: async (data, callback) => {
    const { name, description, image } = data;
    const productData = { name, description, image };
    let resultCategory, resultGroupUnit, resultProduct, result;
    try {
      resultCategory = await Category.findByPk(data.categoryId);
      resultGroupUnit = await GroupUnit.findByPk(data.groupUnitId);
    } catch (error) {}

    if (resultCategory?.id) {
      try {
        resultProduct = await Product.create(productData);
        groupProductId = resultProduct.id;

        resultCategory.addProducts([groupProductId]);
        resultGroupUnit.addProducts([groupProductId]);
        result = { id: resultProduct.id };

        return callback(
          CODE_ERROR_STATUS.SUCCESS,
          MESSEAGE.CREATE_SUCCESFULLY,
          HTTP_STATUS.CREATED,
          null,
          result
        );
      } catch (error) {
        return callback(
          CODE_ERROR_STATUS.ERROR,
          MESSEAGE.CREATE_FAILED,
          HTTP_STATUS.BAD_REQUEST,
          error,
          null
        );
      }
    }
  },
  getById: async (id, callback) => {
    let resultProduct;
    try {
      resultProduct = await Product.findByPk(id);
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        resultProduct
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  getList: async (query, callback) => {
    let where = {};
    try {
      let resultProduct = await Product.findAll({ where: where });

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_LIST_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        resultProduct
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.GET_LIST_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  delete: async (id, callback) => {
    let where = { id };
    let resultProduct;
    try {
      resultProduct = await Product.destroy({ where });
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.DELETE_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        where
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.DELETE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  // chưa cập nhật mã danh mục phẩm
  update: async (id, data, callback) => {
    const where = { id };
    const { name, description, image } = data;
    let productData = {};
    if (name) {
      productData.name = name;
    }
    if (description) {
      productData.description = description;
    }
    if (image) {
      productData.image = image;
    }

    try {
      let resultProduct = await Product.update(productData, { where: where });
      let result = { id: resultProduct.id };

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.UPDATE_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        where
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.UPDATE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
};
