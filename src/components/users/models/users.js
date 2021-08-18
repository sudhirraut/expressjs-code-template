/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const input = new Schema({
  _id: false,
  key: String,
  value: Schema.Types.Mixed
});

const signalRootSchema = new Schema({
  id: String,
  entity: String,
  service: String,
  type: String,
  rule_name: String,
  input: [input],
  data: Schema.Types.Mixed,
  batch_id: String,
  file_name: String,
  timestamp: Number,
  source: String,
  type: String,
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { strict: false });

module.exports = mongoose.model('signals', signalRootSchema, 'signals');
