const OrderCtrl = require('../controllers/OrderCtrl');
const { verifyAccessToken } = require('../utils/Auth');

module.exports = function (app) {
  app.post('/api/v1/order', OrderCtrl.create);
  app.get('/api/v1/order/:id', OrderCtrl.getById);
  app.get('/api/v1/orders', OrderCtrl.getList);
  app.delete('/api/v1/order/:id', OrderCtrl.delete);
  app.put('/api/v1/order/:id', OrderCtrl.update);
};
