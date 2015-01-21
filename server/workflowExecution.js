// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowExecutionScope(mongoose, queue, WorkflowExecution) {
  'use strict';

  function getWorkflowExecutions(req, res) {
    var deferred = queue.defer();
    WorkflowExecution.find(deferred.makeNodeResolver());
    deferred.promise.then(function returnResults(results) {
      res.send(results);
    });
    return deferred.promise;
  }

  function getWorkflowExecutionById(req, res) {
    var deferred = queue.defer();
    var id = mongoose.Types.ObjectId(req.params.id);
    WorkflowExecution.findById(id, deferred.makeNodeResolver());
    deferred.promise.then(function returnCall(call) {
      res.send(call);
    });
    return deferred.promise;
  }

  function getWorkflowExecutionsByWorkflowId(req, res) {
    var deferred = queue.defer();
    var id = mongoose.Types.ObjectId(req.params.id);

    WorkflowExecution.
    find({
      workflow: id
    }).
    exec(deferred.makeNodeResolver());

    deferred.promise.then(function returnCall(call) {
      res.send(call);
    });
    return deferred.promise;
  }

  function getExecutionsFromWorkflowId(req, res) {
    var deferred = queue.defer();
    var workflowExecutionId = mongoose.Types.ObjectId(req.params.workflowExecutionId);

    WorkflowExecution.
    find({
      _id: workflowExecutionId
    }).
    populate('executions').
    exec(deferred.makeNodeResolver());

    deferred.promise.then(function returnCall(call) {
      res.send(call);
    });
    return deferred.promise;
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
