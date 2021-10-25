/* eslint-disable import/no-unresolved */
const Config = require('config');
const express = require('express');
const cluster = require('cluster');
const numberOfCPUs = require('os').cpus().length;
const helmet = require('helmet')

const log = require('services/logger/logger');
const Components = require('./src/components/index');

const { NODE_PORT } = process.env;
exports.init = async (database) => {
  try {
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const port = NODE_PORT || Config.server.port;
    app.use(function (req, res, next) {
      res.on('finish', () => {
        const { statusCode, statusMessage } = res;
        if (statusCode) {
          log.error(`${req.socket.remoteAddress}: ${req.method.toUpperCase()} ${req.url} --> ${statusCode}`);
        } else {
          log.info('No statusCode : ', `${req.socket.remoteAddress}: ${req.method.toUpperCase()} ${req.url} --> `);
        }
      });
      next();
    });
    if (process.env.NODE_ENV !== 'test' && cluster.isMaster) {
      for (let i = 0; i < numberOfCPUs; i++) {
        const worker = cluster.fork();
        log.info('worker %s started.', worker.id);
      }
    } else {
      Components().forEach((component) => {
        log.info(`Component registered ==> ${component}`);
        app.use('/', require(`./src/components/${component}/routes`));
      });
      app.listen(port, () => {
        log.info('App listening on port : ', port);
      });

    }
  } catch (err) {
    log.error('Error starting server: ', err);
    throw err;
  }
};
