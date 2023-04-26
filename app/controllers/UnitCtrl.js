const UnitManager = require('../manager/UnitManager');
const Rest = require('../utils/Restware');

module.exports = {
  create: (req, res) => {
    const data = req.body || '';
    UnitManager.create(
      data,
      (errorCode, errorMessage, httpCode, errorDescription, result) => {
        return Rest.sendRespone(
          res,
          errorCode,
          errorMessage,
          httpCode,
          errorDescription,
          result
        );
      }
    );
  },
  getById: (req, res) => {
    let id = req.params.id;
    UnitManager.getById(
      id,
      (errorCode, errorMessage, httpCode, errorDescription, result) => {
        return Rest.sendRespone(
          res,
          errorCode,
          errorMessage,
          httpCode,
          errorDescription,
          result
        );
      }
    );
  },
  getList: (req, res) => {
    let query = req.query;
    UnitManager.getList(
      query,
      (errorCode, errorMessage, httpCode, errorDescription, result) => {
        return Rest.sendRespone(
          res,
          errorCode,
          errorMessage,
          httpCode,
          errorDescription,
          result
        );
      }
    );
  },
  delete: (req, res) => {
    let id = req.params.id;
    UnitManager.delete(
      id,
      (errorCode, errorMessage, httpCode, errorDescription, result) => {
        return Rest.sendRespone(
          res,
          errorCode,
          errorMessage,
          httpCode,
          errorDescription,
          result
        );
      }
    );
  },
  update: (req, res) => {
    let id = req.params.id;
    let data = req.body;
    UnitManager.update(
      id,
      data,
      (errorCode, errorMessage, httpCode, errorDescription, result) => {
        return Rest.sendRespone(
          res,
          errorCode,
          errorMessage,
          httpCode,
          errorDescription,
          result
        );
      }
    );
  },
};
