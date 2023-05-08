const Rest = require('../utils/Restware');
const OrderManager = require('../manager/OrderManager');

module.exports = {
  create: (req, res) => {
    const data = req.body;
    OrderManager.create(
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
    let data = req.body;

    OrderManager.getById(
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
  getList: (req, res) => {
    let query = req.query;
    let data = req.body;

    OrderManager.getList(
      query,
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
  delete: (req, res) => {
    let id = req.params.id;
    let data = req.body;

    OrderManager.delete(
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
  update: (req, res) => {
    let id = req.params.id;
    let data = req.body;

    OrderManager.update(
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
