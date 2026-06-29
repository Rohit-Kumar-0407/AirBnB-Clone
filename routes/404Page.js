//Core Modules
const express = require('express');
const Page404 = express.Router();

//Local Modules
const Page404Controllers = require('../controllers/Page404Controllers');

//Page 404
Page404.use(Page404Controllers.getPage404);

module.exports = Page404;