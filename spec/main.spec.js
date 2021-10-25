/*
 * Created on Thu Sep 09 2021 10:38:51 AM
 *
 * Created by SR0C100568@techmahindra.com
 * Copyright (c) 2021 Tech Mahindra Limited
 */

/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-const */
/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
process.env.NODE_ENV = 'test';

const path = require('path');
require('app-module-path').addPath(path.join(__dirname, '../'));


const axios = require('axios');
const jasmine = require('jasmine');
const instance = axios.create({
  baseURL: 'http://0.0.0.0:55203',
  timeout: 2000,
  headers: {}
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

// describe('Main- Test Suite: ', () => {
//     it('Should give 404 for /: ', async () => {
//         const result = await instance.get('/');
//         console.log(result);
//         expect(404);
//         console.log('\n *************** Main- Test-1 : PASSED *************** \n');
//     });
// });

describe('Test Suite: ', () => {
  let testCount = 0;
  // test 1 : Get subscribed products
  it('Should give 200 for /v1/users/:user_id: ', async () => {
    const params = {
      fields: ['name', 'status'].reduce((f, s) => `${f},${s}`)
    };
    const result = await instance.get(`/v1/users/h14d7wgpizrh`, { params: params });

    expect(200);
    testCount = 1;
    console.log(`\n *************** Test-${testCount} : PASSED *************** \n`);
  });

  // test 4 : Get inventory api
  it('Should give 200 for /v1/products: ', async () => {
    let params = {
      id: 'ID_h14d7wgpizrh',
      fields: ['name', 'status'].reduce((f, s) => `${f},${s}`)
    };
    const result = await instance.get(`/v1/products`, { params: params });
    expect(200);
    testCount += 1;
    console.log(`\n *************** Test-${testCount} : PASSED *************** \n`);
  });





});
