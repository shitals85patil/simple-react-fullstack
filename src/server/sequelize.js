const Sequelize = require('sequelize');

const config = require('./config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const CompanyModel = require('./models/company.model');
const OfficeModel = require('./models/office.model');

const Company = CompanyModel(sequelize, Sequelize);
const Office = OfficeModel(sequelize, Sequelize);

Office.belongsTo(Company, { foreignKey: 'companyId' });
Company.hasMany(Office, { foreignKey: 'companyId' });

sequelize.sync({ force: false }).then(() => {
  console.log('Schema is ready');
});

sequelize.authenticate().then(() => {
  console.log('Mysql connection successfully done.');
}).catch((e) => {
  console.log('Error while Mysql connection', e);
});


module.exports = { Company, Office };
