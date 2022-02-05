module.exports = (sequelize, type) => sequelize.define('company', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: type.STRING(250),
  }
});
