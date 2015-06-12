// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowExecutionScope(mongoose, queue, WorkflowExecution) {
  'use strict';

  var helper = require('./serverHelper');

  function getWorkflowExecutions(req, res) {
    return helper.getAll(WorkflowExecution, req, res);
  }

  function getWorkflowExecutionById(req, res) {
    var workflowExecutionId = mongoose.Types.ObjectId(req.params.workflowExecutionId);
    return WorkflowExecution
      .findOne({
        _id: workflowExecutionId
      })
      .populate('executions workflow')
      .exec()
      .then(function returnCall(workflowExecution) {
        res.send(workflowExecution);
      });
  }

  function getWorkflowExecutionsByWorkflowId(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return WorkflowExecution
      .find({
        workflow: id
      })
      .exec()
      .then(function returnCall(call) {
        res.send(call);
      });
  }

  function getExecutionsFromWorkflowId(req, res) {
    var workflowExecutionId = mongoose.Types.ObjectId(req.params.workflowExecutionId);
    return WorkflowExecution
      .findOne({
        _id: workflowExecutionId
      })
      .populate('executions workflow')
      .exec()
      .then(function returnCall(call) {
        res.send(call);
      });
  }

  module.exports = {
    getWorkflowExecutions: getWorkflowExecutions,
    getWorkflowExecutionById: getWorkflowExecutionById,
    getWorkflowExecutionsByWorkflowId: getWorkflowExecutionsByWorkflowId,
    getExecutionsFromWorkflowId: getExecutionsFromWorkflowId
  };
}(
  require('mongoose'),
  require('q'),
  require('./resources/WorkflowExecution')
));
