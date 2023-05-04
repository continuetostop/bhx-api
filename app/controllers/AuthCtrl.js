const AuthManager = require('../manager/AuthManager');
const { verifyAccessToken } = require('../utils/Auth');
const Rest = require('../utils/Restware');

module.exports = {
  register: (req, res) => {
    const data = req.body;
    AuthManager.register(
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
  refreshToken: (req, res) => {
    const data = req.body;
    AuthManager.refreshToken(
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
  login: (req, res) => {
    const data = req.body;
    AuthManager.login(
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
  logout: (req, res) => {},
  check: async (req, res) => {
    const data = req.body;
    AuthManager.check(
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
