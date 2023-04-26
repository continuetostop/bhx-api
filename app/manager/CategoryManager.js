const Validator = require('validator');
const Sequenlize = require('sequelize');

const Category = require('../models/CategoryModel');
const {
  HTTP_STATUS,
  CODE_ERROR_STATUS,
  MESSEAGE,
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
  },
  getById: async (id, callback) => {
    let resultCategory;
    try {
      resultCategory = await Category.findByPk(id);
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        resultCategory
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
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
      let resultCategory = await Category.findAll({ where: where });
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.GET_LIST_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        resultCategory
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
    let resultCategory;

    try {
      resultCategory = await Category.destroy({ where });
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
