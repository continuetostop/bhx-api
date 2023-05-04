const User = require('../models/UserModel');
const Auth = require('../utils/Auth');
const {
  CODE_ERROR_STATUS,
  MESSAGE,
  HTTP_STATUS,
} = require('../utils/Constant');

module.exports = {
  register: async (data, callback) => {
    const { email, name } = data;
    const password = await Auth.hashPassword(data.password);
    const authData = { email, name, password };
    try {
      const resultAuth = await User.create(authData);

      let result = { id: resultAuth.id };

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSAGE.REGISTER_SUCCESSFULLY,
        HTTP_STATUS.CREATED,
        null,
        result
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.REGISTER_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  refreshToken: async (data, callback) => {
    const { refreshToken } = data;
    const payload = await Auth.verifyRefreshToken(refreshToken);
    const { id, email, role } = payload;
    const result = { id, email, role };
    const accessToken = await Auth.signAccessToken(result);
    result.accessToken = accessToken;
    result.refreshToken = refreshToken;

    return callback(
      CODE_ERROR_STATUS.SUCCESS,
      MESSAGE.GET_SUCCESSFULLY,
      HTTP_STATUS.OK,
      null,
      result
    );
  },
  login: async (data, callback) => {
    const { email, password } = data;
    const where = { email };
    try {
      const user = await User.findOne({ where, raw: true });
      const { id, role } = user;
      if (Auth.checkPassword(password, user.password)) {
        const result = { id, email, role };
        const accessToken = await Auth.signAccessToken(result);
        const refreshToken = await Auth.signRefreshToken(result);
        result.accessToken = accessToken;
        result.refreshToken = refreshToken;

        return callback(
          CODE_ERROR_STATUS.SUCCESS,
          MESSAGE.LOGIN_SUCCESSFULLY,
          HTTP_STATUS.CREATED,
          null,
          result
        );
      } else {
        return callback(
          CODE_ERROR_STATUS.ERROR,
          MESSAGE.LOGIN_FAILED,
          HTTP_STATUS.BAD_REQUEST,
          error,
          null
        );
      }
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSAGE.LOGIN_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  logout: async (data, callback) => {},
  check: async (data, callback) => {
    let { email } = data.payload;
    let result = { email };
    return callback(
      CODE_ERROR_STATUS.SUCCESS,
      MESSAGE.GET_SUCCESSFULLY,
      HTTP_STATUS.OK,
      null,
      result
    );
  },
};
