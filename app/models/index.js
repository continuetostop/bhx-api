const Category = require('../models/CategoryModel');
const Product = require('../models/ProductModel');
const GroupUnit = require('./GroupUnitModel');
const Unit = require('./UnitModel');

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
