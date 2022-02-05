const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
require('./sequelize');

const app = express();
app.use(express.static('dist'));
const companyRoute = require('./router/company.router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', companyRoute);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
