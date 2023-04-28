const GroupUnitCtrl = require('../controllers/GroupUnitCtrl');

module.exports = function (app) {
  app.post('/api/v1/group-unit', GroupUnitCtrl.create);
  app.get('/api/v1/group-unit/:id', GroupUnitCtrl.getById);
  app.get('/api/v1/group-units', GroupUnitCtrl.getList);
  app.delete('/api/v1/group-unit/:id', GroupUnitCtrl.delete);
  app.put('/api/v1/group-unit/:id', GroupUnitCtrl.update);
};
