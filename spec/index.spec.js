/*
 * Created on Thu Sep 09 2021 10:38:51 AM
 *
 * Created by SR0C100568@techmahindra.com
 * Copyright (c) 2021 Tech Mahindra Limited
 */

/* eslint-disable linebreak-style */
/* eslint-disable indent */

process.env.NODE_ENV = 'test';

const path = require('path');
require('app-module-path').addPath(path.join(__dirname, '../'));


const log = require('services/logger/logger');
const Server = require('./../server');
const MongoDatabase = require('services/databases/mongodb');

// require('app-module-path').addPath(__dirname);
log.info(`[Info] Running environment ==> ${process.env.NODE_ENV}`);

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
  log.error(`[Error] uncaughtException ==> ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
  log.error(`[Error] unhandledRejection ==> ${reason}`);
});

(async () => {
  try {
    // Initialize the database connection
    const dbConn = await MongoDatabase.init();
    // Start the node server
    Server.init(dbConn);
  } catch (err) {
    log.error('[Error] node server ==> ', err);
  }
})();
