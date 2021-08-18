
/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */ 

const routes = require('express').Router();

const { catchErrors } = require('src/utils/error-handler');
const Validation = require('./validations/users.validations');
const validate = require('./../../middlewares/input-validator');
const authenticate = require('./../../middlewares/auth-validator');
const UsersFactory = require('../../components/users/factory/users.factory');


routes.post('/users', validate({schema: Validation.getSignals}), authenticate, UsersFactory.getUsers);

module.exports = routes;

// test comment added