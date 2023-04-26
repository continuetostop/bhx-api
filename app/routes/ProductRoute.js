const ProductCtrl = require('../controllers/ProductCtrl');

module.exports = function (app) {
  app.post('/api/v1/product', ProductCtrl.create);
  app.get('/api/v1/product/:id', ProductCtrl.getById);
  app.get('/api/v1/products', ProductCtrl.getList);
  app.delete('/api/v1/product/:id', ProductCtrl.delete);
  app.put('/api/v1/product/:id', ProductCtrl.update);
};
