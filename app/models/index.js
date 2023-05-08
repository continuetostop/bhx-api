const Category = require('../models/CategoryModel');
const Product = require('../models/ProductModel');
const GroupUnit = require('./GroupUnitModel');
const Unit = require('./UnitModel');
const UnitConversion = require('./UnitConversionModel');
const ProductUnit = require('./ProductUnitModel');
const Order = require('./OrderModel');
const OrderDetail = require('./OrderDetailModel');

Product.belongsTo(Category, {
  onDelete: 'CASCADE',
});
Category.hasMany(Product, {
  onDelete: 'CASCADE',
});

Product.belongsTo(GroupUnit, {
  onDelete: 'CASCADE',
});
GroupUnit.hasMany(Product, {
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

Unit.belongsToMany(Product, {
  through: 'product_units',
  foreignKey: 'unitId',
  otherKey: 'productCodeId',
});

Product.belongsToMany(Unit, {
  through: 'product_units',
  foreignKey: 'productCodeId',
  otherKey: 'unitId',
});

OrderDetail.belongsTo(Order, {
  onDelete: 'CASCADE',
});
Order.hasMany(OrderDetail, {
  onDelete: 'CASCADE',
});
