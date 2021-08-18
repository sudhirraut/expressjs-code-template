/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */


// eslint-disable-next-line import/no-unresolved
const SignalsModel = require('src/models/signals');

const createSignal = (data) => {
  const newRecord = new SignalsModel(data);
  return newRecord.save();
};
const createManySignals = (data) => SignalsModel.insertMany(data);

const findOneSignal = (condition, setValues) => SignalsModel.findOne(condition, setValues);

const getCount = (condition) => SignalsModel.countDocuments(condition);

const findSignals = (condition, selectValues, data, sort) => SignalsModel.find(condition, selectValues).skip(((data.page - 1) * data.limit)).limit(data.limit).sort(sort);

const getDistinct = (field, condition) => SignalsModel.distinct(field, condition);

const aggregate = (pipeline) => SignalsModel.aggregate(pipeline).allowDiskUse(true);

const getMaxTimeStampRecord = (condition) => SignalsModel.find(condition, {_id: 0, timestamp: 1}).sort({ timestamp: -1 }).limit(1);


module.exports = {
  createSignal,
  createManySignals,
  findOneSignal,
  getCount,
  findSignals,
  getDistinct,
  aggregate,
  getMaxTimeStampRecord
};
