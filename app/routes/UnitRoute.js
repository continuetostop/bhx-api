const UnitCtrl = require('../controllers/UnitCtrl');
// const authJwt =require('../middlewares/authJwt')
module.exports = function (app) {
  app.post('/api/v1/unit', UnitCtrl.create);
  app.get('/api/v1/unit/:id', UnitCtrl.getById);
  app.get('/api/v1/units', UnitCtrl.getList);
  app.put('/api/v1/unit/:id', UnitCtrl.update);
  app.delete('/api/v1/unit/:id', UnitCtrl.delete);
};
