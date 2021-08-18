
/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */ 

const routes = require('express').Router();
const { catchErrors } = require('src/utils/error-handler');
const Validation = require('./validations/products.validations');
const validate = require('./../../middlewares/input-validator');
const authenticate = require('./../../middlewares/auth-validator');

routes.get('/v1/products', (req, res) => {
  res.status(200).json({ message: 'Products Connected!' });
});

module.exports = routes;