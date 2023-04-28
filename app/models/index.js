const Category = require('../models/CategoryModel');
const Product = require('../models/ProductModel');
const GroupUnit = require('./GroupUnitModel');
const Unit = require('./UnitModel');
const UnitConversion = require('./UnitConversionModel');

Product.belongsTo(Category, {
  onDelete: 'CASCADE',
});
Category.hasMany(Product, {
  onDelete: 'CASCADE',
});

Unit.hasMany(GroupUnit, {
  foreignKey: 'baseUnitId',
  onDelete: 'CASCADE',
});
GroupUnit.belongsTo(Unit, {
  foreignKey: 'baseUnitId',
  onDelete: 'CASCADE',
});

Unit.belongsToMany(GroupUnit, {
  through: 'unit_conversions',
  foreignKey: 'toUnitId',
  otherKey: 'groupUnitId',
});

GroupUnit.belongsToMany(Unit, {
  through: 'unit_conversions',
  foreignKey: 'groupUnitId',
  otherKey: 'toUnitId',
});
