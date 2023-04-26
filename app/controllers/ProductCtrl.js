const ProductManager = require('../manager/ProductManager');
const Rest = require('../utils/Restware');

module.exports = {
  create: (req, res) => {
    const data = req.body;
    ProductManager.create(
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
    ProductManager.getById(
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
    ProductManager.getList(
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
    ProductManager.delete(
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
    ProductManager.update(
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
