// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowScope(mongoose, Execution, Workflow) { // jshint ignore:line
  'use strict';

  var Schema = mongoose.Schema;

  var workflowExecutionCallSchema = new Schema({
    workflow: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow'
    },
    executions: [{
      type: Schema.Types.ObjectId,
      ref: 'Execution'
    }],
    executedAt: Date
  });

  module.exports = mongoose.model('WorkflowExecution', workflowExecutionCallSchema);

}(
  require('mongoose'),
  require('./Execution'),
  require('./Workflow')
));
