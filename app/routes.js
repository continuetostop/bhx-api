module.exports = function (app) {
  require('./routes/CategoryRoute')(app);
  require('./routes/ProductRoute')(app);
  require('./routes/UnitRoute')(app);
};
