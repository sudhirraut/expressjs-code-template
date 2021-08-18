
/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

'use strict';

const Boom = require('@hapi/boom');
const Hoek = require('@hapi/hoek');
const Joi = require('@hapi/joi');

let compile = (rule) => {

  // false - nothing allowed

  if (rule === false) {
    return Joi.object({}).allow(null);
  }

  // Custom function

  if (typeof rule === 'function') {
    return rule;
  }

  // null, undefined, true - anything allowed

  if (!rule ||                            // false tested above
    rule === true) {

    return null;
  }

  // {...} - ... allowed

  if (typeof rule.validate === 'function') {
    return rule;
  }

  return Joi.compile(rule);
};

const requestFunc = {
  headers: (schema, request) => {
    return input('headers', schema, request);
  },
  params: (schema, request) => {
    return input('params', schema, request);
  },
  body: (schema, request) => {
    if (request.method === 'GET' ||
      request.method === 'head') {                // When route.method is '*'
      return;
    }
    return input('body', schema, request);
  },
  query: (schema, request) => {
    return input('query', schema, request);
  },
  state: (schema, request) => {
    return input('state', schema, request);
  }
}



const input = (source, validate, request) => {
  if (request.method === 'GET' && source === 'body') {
    return;
  }

  const localOptions = {
    context: {
      headers: request.headers,
      params: request.params,
      query: request.query,
      body: request.body,
      state: request.state,
      auth: request.auth,
    }
  };

  delete localOptions.context[source];
  Hoek.merge(localOptions, validate.options);
  let validationError = null;
  try {
    const schema = compile(validate[source]);
    if (!schema) {
      return;
    }
    const { error } = schema.validate(request[source], localOptions) //Validate(request[source], schema, localOptions);
    validationError = error;
    if (validationError) {
      const defaultError = validationError.isBoom ? validationError : Boom.badRequest(`Invalid request ${source} input`);
      const detailedError = Boom.boomify(validationError, { statusCode: 400, override: false });
      detailedError.output.payload.validation = { source, keys: [] };
      if (validationError.details) {
        for (const details of validationError.details) {
          const path = details.path;
          detailedError.output.payload.validation.keys.push(Hoek.escapeHtml(path.join('.')));
        }
      }

      if (validate.errorFields) {
        for (const field in validate.errorFields) {
          detailedError.output.payload[field] = validate.errorFields[field];
        }
      }
      return detailedError.output;
    }
    return;

  } catch (err) {
    return err;
  }
};


const Validate = (value, schema, options) => {

  if (typeof schema.validateAsync === 'function') {
    return schema.validateAsync(value, options);
  }

  return schema.validate(value, options);
};



/**
 * @param {object}
 * {
 *  validate: Boolean,
 *  schema: Object
 * }
 */
module.exports = (options) => {
  return async (req, res, next) => {

    if (options.validate !== undefined && options.validate === false) {
      next()
    } else {
      const validation = options.schema;
      if (req.method === 'get') {
        validation.body = null;
      }
      if (!validation.params || req.params.length) {
        return res.status(400).send(new Error('Cannot set path parameters validations without path parameters'));
      }
      if (typeof validation !== 'object') {
        return res.status(400).send(new Error('Cannot validate non-object schema'));
      }
      const types = ['headers', 'params', 'query', 'body', 'state'];
      const len = types.length;
      let response = null;
      for (let i = 0; i < len; i++) {
        let type = types[i];
        response = requestFunc[type](validation, req);
        if (response) {
          break;
        }
      }
      if (response) {
        res.status(400).send(response);
      } else {
        next();
      }
    }
  }
}
