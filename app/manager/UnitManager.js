const Validator = require('validator');
const Sequenlize = require('sequelize');

const Unit = require('../models/UnitModel');
const {
  HTTP_STATUS,
  CODE_ERROR_STATUS,
  MESSAGE,
} = require('../utils/Constant');

module.exports = {
  create: async (data, callback) => {
    const { name } = data;
    const unitData = { name };

    try {
      const resultUnit = await Unit.create(unitData);
      let result = { id: resultUnit.id };

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.CREATE_SUCCESSFULLY,
        HTTP_STATUS.CREATED,
        null,
        result
      );
    } catch (error) {
      console.log('🚀 ~ file: UnitManager.js:28 ~ create: ~ error:', error);
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
    let resultUnit;
    try {
      resultUnit = await Unit.findByPk(id);

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.GET_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        resultUnit
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
      let resultUnit = await Unit.findAll({ where: where });
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.GET_LIST_SUCCESSFULLY,
        HTTP_STATUS.OK,
        null,
        resultUnit
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
    let resultUnit;

    try {
      resultUnit = await Unit.destroy({ where });
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
    let unitData = {};
    if (data.name) {
      unitData.name = data.name;
    }

    try {
      let resultUnit = await Unit.update(unitData, { where: where });
      let result = { id: resultUnit.id };

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
};
