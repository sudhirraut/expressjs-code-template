/* eslint-disable import/no-unresolved */

/*
 * Created on Wed May 06 2020 1:16:13 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */


const CallAPI = require('src/classes/RESTClient');


module.exports = (options) => new Promise((resolve, reject) => {
  const data = new CallAPI(options);
  data.makeRequest(resolve, reject);
});
