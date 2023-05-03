const Validator = require('validator');
const Sequelize = require('sequelize');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');
const GroupUnit = require('../models/GroupUnitModel');
const _ = require('lodash');
const { Op } = require('sequelize');

const {
  CODE_ERROR_STATUS,
  MESSEAGE,
  HTTP_STATUS,
} = require('../utils/Constant');
const { query } = require('express');
const ProductUnit = require('../models/ProductUnitModel');
const UnitConversionModel = require('../models/UnitConversionModel');
const Unit = require('../models/UnitModel');
const ProductHandler = require('../handlers/ProductHandler');

module.exports = {
  create: async (data, callback) => {
    const { name, description, image } = data;
    const productData = { name, description, image };
    let resultCategory, resultGroupUnit, resultProduct, result;
    try {
      resultCategory = await Category.findByPk(data.categoryId);
      resultGroupUnit = await GroupUnit.findByPk(data.groupUnitId);

      resultListUnit = await resultGroupUnit.getUnits();
    } catch (error) {}

    try {
      resultProduct = await Product.create(productData);

      groupProductId = resultProduct.id;

      resultCategory.addProducts([groupProductId]);
      resultGroupUnit.addProducts([groupProductId]);
      result = { id: resultProduct.id };
      await Promise.all(
        resultListUnit.map((unit) => {
          let unitId = unit.id;

          let price = data[unitId] || -1;
          resultProduct.addUnits([unitId], {
            through: { price: price },
          });
        })
      );
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.CREATE_SUCCESFULLY,
        HTTP_STATUS.CREATED,
        null,
        result
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.CREATE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  getById: async (id, callback) => {
    let resultProduct,
      productInf,
      groupUnitInfo,
      groupUnitInfoDetail,
      listPriceProduct,
      listPriceProductRaw;
    try {
      productInf = await Product.findByPk(id);
      groupUnitInfo = await GroupUnit.findByPk(productInf.groupUnitId);
      groupUnitInfoDetail = await groupUnitInfo.getUnits({ raw: true });

      listPriceProductRaw = await productInf.getUnits({ raw: true });

      // remove price < 0
      listPriceProductRaw = listPriceProductRaw.filter(
        (priceProductRaw) => priceProductRaw['product_units.price'] > 0
      );

      listPriceProduct = await Promise.all(
        listPriceProductRaw.map((priceProductRaw) => {
          let result = {};
          let index = groupUnitInfoDetail.findIndex(
            (i) => i.id === priceProductRaw['product_units.unitId']
          );
          result.productCodeId = priceProductRaw['product_units.productCodeId'];
          // result.unitId = priceProductRaw['product_units.unitId'];
          result.price = priceProductRaw['product_units.price'];
          result.unit = priceProductRaw.name;
          result.quantity =
            groupUnitInfoDetail[index]['unit_conversions.multiplier'];
          return result;
        })
      );
      let name = productInf.name;
      let description = productInf.description;
      let image = productInf.image;

      resultProduct = {
        id,
        name,
        description,
        image,
      };

      resultProduct.productDetail = listPriceProduct;

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        resultProduct
      );
    } catch (error) {
      console.log(
        '🚀 ~ file: ProductManager.js:122 ~ getById: ~ error:',
        error
      );
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  getList: async (query, callback) => {
    let where = {};
    try {
      let resultProductRaw = await Product.findAll({
        include: {
          model: Unit,
          raw: true,
        },
        raw: true,
      });

      let resultGroupUnitRaw = await GroupUnit.findAll();

      let resultGroupUnitDetail = await Promise.all(
        resultGroupUnitRaw.map(async (item) => {
          let resultGroupUnitById = await GroupUnit.findByPk(item.id);

          let resultGroupUnitDetailById = await resultGroupUnitById.getUnits({
            raw: true,
          });

          return resultGroupUnitDetailById;
        })
      );
      resultGroupUnitDetail = _.flattenDeep(resultGroupUnitDetail);
      resultProductRaw = resultProductRaw.filter(
        (productRaw) => productRaw['units.product_units.price'] > 0
      );
      let resultProductDetail = await Promise.all(
        ProductHandler.getList(resultProductRaw, resultGroupUnitDetail)
      );

      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.GET_LIST_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        resultProductDetail
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.GET_LIST_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  delete: async (id, callback) => {
    let where = { id };
    let resultProduct;
    try {
      resultProduct = await Product.destroy({ where });
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.DELETE_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        where
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.DELETE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
  // chưa cập nhật mã danh mục phẩm
  update: async (id, data, callback) => {
    const where = { id };
    const { name, description, image } = data;
    let resultGroupUnit, resultListUnit, productInfo;

    let productData = {};
    if (name) {
      productData.name = name;
    }
    if (description) {
      productData.description = description;
    }
    if (image) {
      productData.image = image;
    }

    try {
      let resultProduct = await Product.update(productData, { where: where });
      let result = { id: resultProduct.id };

      productInfo = await Product.findByPk(id);
      resultGroupUnit = await GroupUnit.findByPk(productInfo.groupUnitId);
      resultListUnit = await resultGroupUnit.getUnits();
      await Promise.all(
        resultListUnit.map((unit) => {
          let unitId = unit.id;
          let price = data[unitId];
          if (price) {
            productInfo.addUnits([unitId], {
              through: { price: price },
            });
          }
        })
      );
      return callback(
        CODE_ERROR_STATUS.SUCCESS,
        MESSEAGE.UPDATE_SUCCESFULLY,
        HTTP_STATUS.OK,
        null,
        where
      );
    } catch (error) {
      return callback(
        CODE_ERROR_STATUS.ERROR,
        MESSEAGE.UPDATE_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        error,
        null
      );
    }
  },
};
