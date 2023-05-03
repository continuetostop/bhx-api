const Validator = require('validator');
const Sequelize = require('sequelize');

const GroupUnit = require('../models/GroupUnitModel');
const Unit = require('../models/UnitModel');
const {
  CODE_ERROR_STATUS,
  MESSEAGE,
  HTTP_STATUS,
} = require('../utils/Constant');
const {
  getListUnitConversionByGroupUnit,
} = require('../handlers/UnitConversionHander');

module.exports = {
  create: async (data, callback) => {
    const { name, description, baseUnitId } = data;
    const groupUnitData = { name, description };
    let resultGroupUnit, resultUnit, result, groupUnitId;
    try {
      resultUnit = await Unit.findByPk(baseUnitId);
    } catch (error) {}

    if (resultUnit?.id) {
      try {
        resultGroupUnit = await GroupUnit.create(groupUnitData);

        groupUnitId = resultGroupUnit.id;

        resultUnit.addGroup_units([groupUnitId]);
        result = { id: resultGroupUnit.id };
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
    let resultGroupUnit;
    try {
      resultGroupUnit = await GroupUnit.findByPk(id);

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        resultGroupUnit
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
  // getList: async (query, callback) => {
  //   let where = {};
  //   try {
  //     let resultGroupUnit = await GroupUnit.findAll({ where: where });

  //     return callback(
  //       CODE_ERROR_STATUS.SUCCESS,
  //       MESSEAGE.GET_LIST_SUCCESFULLY,
  //       HTTP_STATUS.OK,
  //       null,
  //       resultGroupUnit
  //     );
  //   } catch (error) {
  //     return callback(
  //       CODE_ERROR_STATUS.ERROR,
  //       MESSEAGE.GET_LIST_FAILED,
  //       HTTP_STATUS.BAD_REQUEST,
  //       error,
  //       null
  //     );
  //   }
  // },
  getList: async (query, callback) => {
    let where = {};
    try {
      let resultGroupUnit = await GroupUnit.findAll({ where: where });
      let result = await Promise.all(
        resultGroupUnit.map(async (groupUnit) => {
          let result = {};
          result.id = groupUnit.id;
          result.name = groupUnit.name;
          result.description = groupUnit.description;
          result.baseUnitId = groupUnit.baseUnitId;
          resultGroupUnit = await GroupUnit.findByPk(groupUnit.id);

          let resultListUnitConversionByGroupUnit =
            await resultGroupUnit.getUnits();
          result.unit = await Promise.all(
            getListUnitConversionByGroupUnit(
              resultListUnitConversionByGroupUnit
            )
          );
          return result;
        })
      );
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_LIST_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        result
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
    let resultGroupUnit;
    try {
      resultGroupUnit = await GroupUnit.destroy({ where });
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
    let groupUnitData = {};
    let resultGroupUnit;
    if (data.name) {
      groupUnitData.name = data.name;
    }
    if (data.description) {
      groupUnitData.description = data.description;
    }
    // if (data.baseUnitId) {
    //   categoryData.baseUnitId = data.baseUnitId;
    // }
    try {
      resultGroupUnit = await GroupUnit.update(groupUnitData, { where: where });
      let result = { id: resultGroupUnit.id };

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
  getListUnitConversionByGroupUnit: async (id, callback) => {
    try {
      let resultListUnitConversionByGroupUnit, resultGroupUnit, result;
      resultGroupUnit = await GroupUnit.findByPk(id);

      resultListUnitConversionByGroupUnit = await resultGroupUnit.getUnits();

      result = await Promise.all(
        getListUnitConversionByGroupUnit(resultListUnitConversionByGroupUnit)
      );

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_LIST_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        result
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
};
