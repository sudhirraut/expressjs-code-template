/*
* Created on Fri Jul 03 2020 3:31:39 PM
*
* Created by Sudhir Raut
* Copyright (c) 2020  
*/


let loggingConfig = require('config').logging;
const bunyan = require('bunyan'); // Bunyan dependency

const logger = bunyan.createLogger({
  name: loggingConfig.name,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: loggingConfig.level,
      path: loggingConfig.path,
    },
    {
      level: bunyan.ERROR,
      stream: process.stdout,
    }, {
      level: bunyan.DEBUG,
      stream: process.stdout,
    },
    {
      level: bunyan.INFO,
      stream: process.stdout,
    },
  ],
});

module.exports = logger;
