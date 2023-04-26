const Category = require('../models/CategoryModel');
const Product = require('../models/ProductModel');

Product.belongsTo(Category, {
  onDelete: 'CASCADE',
});
Category.hasMany(Product, {
  onDelete: 'CASCADE',
});
