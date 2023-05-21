const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const configAuth = require('../config/Auth');

module.exports = {
  hashPassword: async (password) => {
    const salt = await Bcrypt.genSalt(10);
    const hashPass = await Bcrypt.hash(password, salt);
    return hashPass;
  },
  checkPassword: async (password, hashPassword) => {
    return await Bcrypt.compare(password, hashPassword);
  },
  signAccessToken: async (payload) => {
    return new Promise((resolve, reject) => {
      const secret = configAuth.ACCESS_TOKEN_SECRET;
      const options = { expiresIn: configAuth.ACCESS_TOKEN_EXPIRES_IN };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  signRefreshToken: async (payload) => {
    return new Promise((resolve, reject) => {
      const secret = configAuth.REFRESH_TOKEN_SECRET;
      const options = { expiresIn: configAuth.REFRESH_TOKEN_EXPIRES_IN };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) {
    }
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, configAuth.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          console.log('🚀 ~ file: Auth.js:43 ~ JWT.verify ~ err:', err);
        } else {
          console.log('🚀 ~ file: Auth.js:46 ~ JWT.verify ~ err:', err);
        }
      }
      req.body.payload = payload;
      next();
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        configAuth.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            reject(err);
          }
          resolve(payload);
        }
      );
    });
  },
};
