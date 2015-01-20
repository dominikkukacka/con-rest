// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function executionScope(mongoose, queue, Execution) {
  'use strict';

  function getExecutions(req, res) {
    var deferred = queue.defer();
    Execution.find(deferred.makeNodeResolver());
    deferred.promise.then(function returnResults(results) {
      res.send(results);
    });
    return deferred.promise;
  }

  function getExecutionById(req, res) {
    var deferred = queue.defer();
    var id = mongoose.Types.ObjectId(req.params.id);
    Execution.findById(id, deferred.makeNodeResolver());
    deferred.promise.then(function returnCall(call) {
      res.send(call);
    });
    return deferred.promise;
  }

  function getExecutionsOfWorkflow(req, res) {
    var deferred = queue.defer();
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log('workflow:', id);

    Execution.
    find({
      workflow: id
    }).
    exec(deferred.makeNodeResolver());

    deferred.promise.then(function returnCall(call) {
      res.send(call);
    });
    return deferred.promise;
  }

  module.exports = {
    getExecutions: getExecutions,
    getExecutionById: getExecutionById,
    getExecutionsOfWorkflow: getExecutionsOfWorkflow
  };
}(
  require('mongoose'),
  require('q'),
  require('./resources/Execution')
));
