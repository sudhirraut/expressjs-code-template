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
    params:{
      page: Joi.number().required().example(1).description('page number'),
      limit: Joi.number().required().example(10).description('limit per page'),
    },
    query: {

      entity: Joi.string().example('projects').allow('',null).description('entity'),
      service: Joi.string().example('command-center').allow('',null).description('service'),
      id: Joi.string().example('project_id').allow('',null).description('entity id'),
      timestamp: Joi.number().example(1590079334246).allow(null).description('timestamp'),

      //search 
      parameter_search: Joi.string().allow('',null).description('parameter search string'),
      actual_value_search: Joi.string().allow('',null).description('actual value search string'),
      rule_search: Joi.string().allow('',null).description('rule search string'),
      output_search: Joi.string().allow('',null).description('output search string'),
      date_search: Joi.date().allow(null).description('date search'),

      //sort
      parameter_sort: Joi.number().allow(null).description('sort string').allow(null).valid(1, -1),
      actual_value_sort: Joi.number().allow(null).description('sort string').allow(null).valid(1, -1),
      rule_sort: Joi.number().allow(null).description('sort string').allow(null).valid(1, -1),
      output_sort: Joi.number().allow(null).description('sort string').allow(null).valid(1, -1),
      date_sort: Joi.number().allow(null).description('sort string').allow(null).valid(1, -1),
     
    },
    failAction: (request, h, err) => {
      return err;
    },
  }
}))();
