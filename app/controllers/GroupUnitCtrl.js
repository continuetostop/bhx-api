const GroupUnitManager = require('../manager/GroupUnitManager');
const Rest = require('../utils/Restware');

module.exports = {
  create: (req, res) => {
    const data = req.body || '';
    GroupUnitManager.create(
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
    GroupUnitManager.getById(
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
    GroupUnitManager.getList(
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
    GroupUnitManager.delete(
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
    GroupUnitManager.update(
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
