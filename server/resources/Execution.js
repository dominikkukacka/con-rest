// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowScope(mongoose, Workflow, APICall) { // jshint ignore:line
  'use strict';

  var Schema = mongoose.Schema;

  var executionCallSchema = new Schema({
    workflow: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow'
    },
    apiCall: {
      type: Schema.Types.ObjectId,
      ref: 'APICall'
    },
    statusCode: Number,
    url: String,
    response: Schema.Types.Mixed,
    headers: Schema.Types.Mixed,
    data: Schema.Types.Mixed,
    executedAt: Date
  });

  module.exports = mongoose.model('Execution', executionCallSchema);

}(
  require('mongoose'),
  require('./Workflow'),
  require('./APICall')
));
