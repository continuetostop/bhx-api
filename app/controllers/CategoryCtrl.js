const CategoryManager = require('../manager/CategoryManager');
const Rest = require('../utils/Restware');

module.exports = {
  create: (req, res) => {
    const data = req.body || '';
    CategoryManager.create(
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
    CategoryManager.getById(
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
    CategoryManager.getList(
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
    CategoryManager.delete(
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
    CategoryManager.update(
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
