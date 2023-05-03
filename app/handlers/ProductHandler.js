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
};
