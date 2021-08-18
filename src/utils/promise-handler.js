/*
 * Created on Wed May 06 2020 1:16:34 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */


/**
  * Function to handle errors in promises
  */
module.exports = (promise) => promise.then((data) => [null, data])
  .catch((err) => [err]);
