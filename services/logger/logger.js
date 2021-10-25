/*
 * Created on Mon Oct 04 2021 2:21:07 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2021
 */

const loggingConfig = require('config').logging;
const bunyan = require('bunyan'); // Bunyan dependency

const { LOGGING_NAME, LOGIING_LEVEL, LOGGING_PATH } = process.env;

const logger = bunyan.createLogger({
  name: LOGGING_NAME || loggingConfig.name,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: LOGIING_LEVEL || loggingConfig.level,
      path: LOGGING_PATH || loggingConfig.path,
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
