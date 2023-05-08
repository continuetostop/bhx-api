module.exports = {
  getList: (listProducts, listGroupUnits) => {
    return listProducts.map(async (listProduct) => {
      let result = {};
      let index = listGroupUnits.findIndex(
        (groupUnit) =>
          groupUnit.id === listProduct['units.id'] &&
          groupUnit['unit_conversions.groupUnitId'] === listProduct.groupUnitId
      );

      result.id = listProduct.id;
      result.name = listProduct.name;
      result.description = listProduct.description;
      result.image = listProduct.image;
      result.createdAt = listProduct.createdAt;
      result.updatedAt = listProduct.updatedAt;
      // result.categoryId = listProduct.categoryId;
      // result.groupUnitId = listProduct.groupUnitId;
      result.groupUnitName = listProduct['units.name'];
      result.quantity = listGroupUnits[index]['unit_conversions.multiplier'];
      result.price = listProduct['units.product_units.price'];

      return result;
    });
  },
  getById: (listPriceProductRaw, groupUnitInfoDetail) => {
    return listPriceProductRaw.map(async (priceProductRaw) => {
      console.log(
        '🚀 ~ file: ProductHandler.js:28 ~ listPriceProductRaw.map ~ priceProductRaw:',
        priceProductRaw
      );
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
    });
  },
};
