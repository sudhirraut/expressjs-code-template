/*
 * Created on Wed May 06 2020 1:16:41 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

const Config = require('config');

exports.HTTP_METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

exports.MS_URLS = {
  BASE_URL: `${Config.ms_env.protocol}://${Config.ms_env.host}${(Config.ms_env.port !== '') ? ':' : ''}${Config.ms_env.port}${(Config.ms_env.directory !== '') ? (`/${Config.ms_env.directory}`) : ''}`,
};

exports.CONTENT_TYPE = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  FORM_DATA: 'multipart/form-data',
  XML: 'application/xml',
  TEXT_XML: 'text/xml',
};
