const UnitConversionCtrl = require('../controllers/UnitConversionCtrl');
module.exports = function (app) {
  app.post('/api/v1/unit-conversion', UnitConversionCtrl.create);
  app.put('/api/v1/unit-conversion', UnitConversionCtrl.update);
  app.delete('/api/v1/unit-conversion', UnitConversionCtrl.delete);
};
