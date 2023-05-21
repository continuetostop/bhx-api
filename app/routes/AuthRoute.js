const authCtrl = require('../controllers/AuthCtrl');
const { verifyAccessToken } = require('../utils/Auth');
module.exports = function (app) {
  app.post('/api/v1/auth/register', authCtrl.register);
  app.post('/api/v1/auth/refresh-token', authCtrl.refreshToken);
  app.get('/api/v1/auth/login', authCtrl.login);
  app.delete('/api/v1/auth/logout', authCtrl.logout);
  app.get('/api/v1/auth/check', verifyAccessToken, authCtrl.check);
  app.get('/api/v1/auth/check', authCtrl.check);
};
