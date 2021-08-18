/*
 * Created on Wed May 06 2020 1:16:21 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

module.exports = class Response {
  static
  sendResponse(isSuccess, result, message, statusCode) {
    return {
      is_success: isSuccess,
      result,
      message,
      status_code: statusCode,
    };
  }
};
