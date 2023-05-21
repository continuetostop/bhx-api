module.exports = function (app) {
  require('./routes/CategoryRoute')(app);
  require('./routes/ProductRoute')(app);
  require('./routes/UnitRoute')(app);
  require('./routes/GroupUnitRoute')(app);
  require('./routes/UnitConversionRoute')(app);
  // require('./routes/AuthRoute')(app);
  require('./routes/OrderRoute')(app);
};
