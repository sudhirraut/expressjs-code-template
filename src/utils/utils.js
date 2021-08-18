/*
 * Created on Wed May 06 2020 1:16:00 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

/**
 * input Array
 * [ { key: 'name', value: 'Sudhir'}]
 */
const arrayToObject = (array) => {
  let result = {};
  let arrLen = array.length;
  for (let i = 0; i < arrLen; i++) {
    result[array[i].key] = array[i].value;
  }
  return result;
}

module.exports = {
  arrayToObject,
};
