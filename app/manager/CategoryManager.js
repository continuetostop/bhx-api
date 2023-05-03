const Validator = require('validator');
const Sequenlize = require('sequelize');

const Category = require('../models/CategoryModel');
const {
  HTTP_STATUS,
  CODE_ERROR_STATUS,
  MESSAGE,
} = require('../utils/Constant');

module.exports = {
  create: async (data, callback) => {
    const { name, description, image } = data;
    const categoryData = { name, description, image };

    try {
      const resultCategory = await Category.create(categoryData);
      let result = { id: resultCategory.id };

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
  getById: async (id, callback) => {
    let resultCategory;
    try {
      resultCategory = await Category.findByPk(id);
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.GET_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        resultCategory
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.GET_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  getList: async (query, callback) => {
    let where = {};
    try {
      let resultCategory = await Category.findAll({ where: where });
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.GET_LIST_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        resultCategory
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
  delete: async (id, callback) => {
    let where = { id };
    let resultCategory;

    try {
      resultCategory = await Category.destroy({ where });
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.DELETE_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        where
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
    const where = { id: id };
    let categoryData = {};
    if (data.name) {
      categoryData.name = data.name;
    }
    if (data.description) {
      categoryData.description = data.description;
    }
    if (data.image) {
      categoryData.image = data.image;
    }
    try {
      resultCategory = await Category.update(categoryData, { where: where });
      let result = { id: resultCategory.id };

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.UPDATE_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        where
      );
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
  getProductByCategory: async (id, callback) => {
    let where = { id };
    try {
      let resultCategory = await Category.findByPk(id);
      let resultProductByCategory = await resultCategory.getProducts();
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.GET_LIST_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        resultProductByCategory
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
};
