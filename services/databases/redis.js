/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

const Redis = require('ioredis');
const Config = require('config');

let redisClient;

// Create and redis client instance
exports.init = () => {
  try {
    return new Redis({
      port: Config.redis_env.port,
      host: Config.redis_env.host,
      password: Config.redis_env.password,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
  } catch (err) {
    console.log(`ERROR => ${err}`);
  }
};

exports.redisClient = redisClient;
