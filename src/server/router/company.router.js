const { Router } = require('express');

const router = Router();

const {
  saveData, getCompanies, getOfficesByCompany, updateHeadquarter
} = require('../controller/company.controller');

router.get('/company', (req, res) => getCompanies((err, result) => {
  if (err) {
    return res.status(400).send(err);
  }
  return res.status(200).send(result);
}));

router.post('/company', (req, res) => saveData(req.body, (err, result) => {
  if (err) {
    return res.status(400).send(err);
  }
  return res.status(200).send(result);
}));


router.put('/company/:companyId/:officeId', (req, res) => updateHeadquarter(req.params.companyId, req.params.officeId, req.body, (err, result) => {
  if (err) {
    return res.status(400).send(err);
  }
  return res.status(200).send(result);
}));

router.get('/offices/:companyId', (req, res) => getOfficesByCompany(req.params.companyId, (err, result) => {
  if (err) {
    return res.status(400).send(err);
  }
  return res.status(200).send(result);
}));


module.exports = router;
