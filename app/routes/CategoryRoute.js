const CategoryCtrl = require('../controllers/CategoryCtrl');
// const authJwt =require('../middlewares/authJwt')
module.exports = function (app) {
  app.post('/api/v1/category', CategoryCtrl.create);
  app.get('/api/v1/category/:id', CategoryCtrl.getById);
  app.get('/api/v1/categories', CategoryCtrl.getList);
  app.put('/api/v1/category/:id', CategoryCtrl.update);
  app.delete('/api/v1/category/:id', CategoryCtrl.delete);
  app.get('/api/v1/category/:id/products', CategoryCtrl.getProductByCategory);
};
