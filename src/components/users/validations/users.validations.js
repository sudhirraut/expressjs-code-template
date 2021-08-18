/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

const Joi = require('@hapi/joi');

/**
 * Input JSON validation
 *
 * @type {{}}
 */
module.exports = (() => ({
  // createSignals: {
  //   headers: Joi.object({ authorization: Joi.string().required() }).options({ allowUnknown: true }),
  //   payload: {
  //     entity: Joi.string().required().example('projects'),
  //     service: Joi.string().required().example('command-center'),
  //     unique_key: Joi.string().required(),
  //     batch: Joi.array().items(
  //       Joi.object({
  //         input: Joi.array().items(Joi.object({
  //           key: Joi.string(),
  //           value: Joi.any(),
  //           alert: Joi.boolean().default(true).description('If rule is set and want to create an alert')
  //         })).allow([]).default([]),
  //       })
  //     )
  //   },
  //   failAction: (request, h, err) => {
  //     return err;
  //   },
  // },
  getSignals: {
    headers: Joi.object({ authorization: Joi.string().required() }).options({ allowUnknown: true }),
    query:{
      page: Joi.number().required().example(1).description('page number'),
      limit: Joi.number().required().example(10).description('limit per page'),
    },
    body: {
      entity: Joi.string().example('projects').allow('',null).description('entity')
    },
    failAction: (request, h, err) => {
      console.log('ERROR ', err);
      return err;
    },
  }
}))();
