/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

const Mongoose = require('mongoose');
const Config = require('config');
const log = require('services/logger/logger');

const { MONGO_HOST, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = process.env;

const host = MONGO_HOST || Config.database.mongo.host;
const port = MONGO_PORT || Config.database.mongo.port;
const username = MONGO_USERNAME || Config.database.mongo.username;
const password = MONGO_PASSWORD || Config.database.mongo.password;
const db_name = MONGO_DB_NAME || Config.database.mongo.name;

exports.init = () => {
  let connectionURI = '';
  if (Config.env === 'local' || Config.env === 'test') {
    if (username && password) {
      connectionURI = `mongodb://${username}:${password}@${host}:${port}/${db_name}?authSource=admin`;
    } else {
      connectionURI = `mongodb://${host}:${port}/${db_name}`;
    }
  } else if (username && password) {
    // connection_uri = `mongodb://${config.database.mongo.username}:${config.database.mongo.password}@${config.database.mongo.clusterHosts}/${config.database.mongo.name}?authSource=admin&replicaSet=${config.database.mongo.replicaSetName}`;
    connectionURI = `mongodb://${username}:${password}@${Config.replicaConfig.clusterHosts}/${db_name}?replicaSet=${Config.replicaConfig.replicaSetName}&authSource=admin`;
  } else {
    connectionURI = `mongodb://${Config.replicaConfig.clusterHosts}/${db_name}?replicaSet=${Config.replicaConfig.replicaSetName}`;
  }

  Mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    // useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10,
  });
  Mongoose.connection.on('connected', () => {
    log.info(`Mongoose default connection open to mongodb://${host}/${db_name}`);
  });

  Mongoose.connection.on('error', (err) => {
    log.info(`Mongoose default connection error => ${err}`);
  });

  Mongoose.connection.on('disconnected', () => {
    log.info('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    Mongoose.connection.close(() => {
      log.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};
