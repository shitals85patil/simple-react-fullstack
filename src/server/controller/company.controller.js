const { Company, Office } = require('../sequelize');

exports.getCompanies = (done) => {
  Office.findAll({
    where: { isHeadquarter: true },
    include: [{ model: Company }],
  })
    .then((res) => {
      done(null, res);
    }).catch((err) => {
      done(err, null);
    });
};

exports.saveDataInCompany = (id, body, done) => {
  const office = new Office(body);
  office.companyId = id;
  office.save().then((res) => {
    done(null, res);
  }).catch((err) => {
    done(err, null);
  });
};

exports.saveData = ({ company, offices }, done) => {
  const addCompany = new Company(company);
  let allOffice = [];
  addCompany.save().then((doc) => {
    const companyDetails = doc.dataValues;
    allOffice = offices.map(office => ({
      ...office,
      companyId: companyDetails.id
    }));

    Office.bulkCreate(allOffice).then((o) => {
      const headOffice = o.find(off => off.isHeadquarter);
      const result = {
        company: { ...companyDetails },
        ...headOffice.dataValues
      };
      done(null, result);
    }).catch((error) => {
      done(error, null);
    });
  }).catch((err) => {
    done(err, null);
  });
};


exports.getOfficesByCompany = (id, done) => {
  Office.findAll({ where: { companyId: id } }).then((doc) => {
    done(null, doc);
  }).catch((err) => {
    done(err, null);
  });
};

exports.updateHeadquarter = (companyId, officeId, body, done) => {
  Office.update({ isHeadquarter: false }, { where: { companyId } })
    .then(() => Office.update({ isHeadquarter: true }, { where: { companyId, id: officeId } }))
    .then(() => Office.findOne({
      where: { isHeadquarter: true, companyId },
      include: [{ model: Company }]
    }))
    .then(res => done(null, res))
    .catch((err) => {
      done(err, null);
    });
};
