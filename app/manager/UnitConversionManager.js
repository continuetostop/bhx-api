const UnitConversion = require('../models/UnitConversionModel');
const GroupUnit = require('../models/GroupUnitModel');
const {
  CODE_ERROR_STATUS,
  MESSEAGE,
  HTTP_STATUS,
} = require('../utils/Constant');

module.exports = {
  create: async (data, callback) => {
    const { groupUnitId, toUnitId, multiplier } = data;
    let resultUnitConversion, resultGroupUnit;
    try {
      resultGroupUnit = await GroupUnit.findByPk(groupUnitId);
    } catch (error) {}
    try {
      result = await resultGroupUnit.addUnits([toUnitId], {
        through: { multiplier: multiplier },
      });
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
  },
  update: async (data, callback) => {
    const { groupUnitId, toUnitId, multiplier } = data;
    let resultUnitConversion, resultGroupUnit;
    try {
      resultGroupUnit = await GroupUnit.findByPk(groupUnitId);
    } catch (error) {}
    try {
      result = await resultGroupUnit.addUnits([toUnitId], {
        through: { multiplier: multiplier },
      });
      result = { id: resultGroupUnit.id };
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.UPDATE_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        result
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
  delete: async (data, callback) => {
    const { groupUnitId, toUnitId } = data;
    let resultUnitConversion, resultGroupUnit;
    try {
      resultGroupUnit = await GroupUnit.findByPk(groupUnitId);
    } catch (error) {}
    try {
      result = await resultGroupUnit.removeUnits([toUnitId]);
      result = { id: resultGroupUnit.id };
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.DELETE_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        result
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
};
