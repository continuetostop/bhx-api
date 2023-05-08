const OrderCtrl = require('../controllers/OrderCtrl');
const { verifyAccessToken } = require('../utils/Auth');

module.exports = function (app) {
  app.post('/api/v1/order', verifyAccessToken, OrderCtrl.create);
  app.get('/api/v1/order/:id', verifyAccessToken, OrderCtrl.getById);
  app.get('/api/v1/orders', verifyAccessToken, OrderCtrl.getList);
  app.delete('/api/v1/order/:id', verifyAccessToken, OrderCtrl.delete);
  app.put('/api/v1/order/:id', verifyAccessToken, OrderCtrl.update);
};
