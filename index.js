/* eslint-disable import/no-unresolved */
process.env.NODE_ENV = 'env-local';
require('app-module-path').addPath(__dirname);



const log = require('services/logger/logger');
const Server = require('./server');
const MongoDatabase = require('services/databases/mongodb');

// require('app-module-path').addPath(__dirname);
log.info(`Running environment ==> ${process.env.NODE_ENV}`);

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
  log.error(`uncaughtException ==> ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
  log.error(`unhandledRejection ==> ${reason}`);
});

 (async () => {
   try {
  // Initialize the database connection
  const dbConn = await MongoDatabase.init();
  // Start the node server
  Server.init(dbConn);
   } catch(err) {
     log.error('Error in the node server ==> ', err);
   }
})();
