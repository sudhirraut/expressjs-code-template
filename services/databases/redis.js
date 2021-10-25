/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

const Redis = require('ioredis');
const Config = require('config');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const host = REDIS_HOST || Config.redis_env.host;
const port = REDIS_PORT || Config.redis_env.port;
const password = REDIS_PASSWORD || Config.redis_env.password;
// Create and redis client instance
exports.init = () => {
  try {
    return new Redis({
      port: port,
      host: host,
      password: password,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
  } catch (err) {
    console.log(`ERROR => ${err}`);
  }
};
