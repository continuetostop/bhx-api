module.exports = {
  getListUnitConversionByGroupUnit: (data) => {
    return data.map((unit) => {
      let data = {};
      data.id = unit.id;
      data.name = unit.name;
      data.multiplier = unit.unit_conversions.multiplier;
      return data;
    });
  },
};
