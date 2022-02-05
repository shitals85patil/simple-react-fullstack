
module.exports = (sequelize, type) => sequelize.define('office', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  street: {
    type: type.STRING(250),
    allowNull: false
  },
  postalCode: {
    type: type.STRING(20),
    allowNull: false,
  },
  city: {
    type: type.STRING(125),
  },
  monthlyRent: {
    type: type.FLOAT(8),
  },
  companyId: {
    type: type.INTEGER,
    allowNull: false
  },
  isHeadquarter: {
    type: type.BOOLEAN,
  }
});
