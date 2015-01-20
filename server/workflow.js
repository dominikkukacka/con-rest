// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowScope(mongoose, queue, api, Workflow, Connector, WorkflowExecution, Execution, APICall) {
  'use strict';

  function getWorkflows(req, res) {
    var deferred = queue.defer();
    Workflow.find(deferred.makeNodeResolver());
    deferred.promise.then(function returnResults(results) {
      res.send(results);
    });
    return deferred.promise;
  }

  function getWorkflowById(req, res) {
    var deferred = queue.defer();
    var id = mongoose.Types.ObjectId(req.params.id);
    Workflow.findById(id, deferred.makeNodeResolver());
    deferred.promise.then(function returnCall(call) {
      res.send(call);
    });
    return deferred.promise;
  }

  function deleteWorkflow(req, res) {
    var deferred = queue.defer();
    var id = mongoose.Types.ObjectId(req.params.id);
    Workflow.findByIdAndRemove(id, deferred.makeNodeResolver());
    deferred.promise.then(function returnDeleted() {
      res.send('deleted');
    });
    return deferred.promise;
  }

  function registerWorkflow(req, res) {
    var workflow = new Workflow(req.body);
    var deferred = queue.defer();
    workflow.save(deferred.makeNodeResolver());
    deferred.promise.then(function saveNewCall() {
      res.send(workflow.id);
    });
    return deferred.promise;
  }

  function saveWorkflow(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    var details = req.body;
    var workflow = null;
    return queue().
    then(function getExistingWorkflow() {
      var deferred = queue.defer();
      Workflow.findById(id, deferred.makeNodeResolver());
      return deferred.promise;
    }).
    then(function modifyWorkflow(retrievedWorkflow) {
      var deferred = queue.defer();
      workflow = retrievedWorkflow;
      workflow.name = details.name;
      workflow.calls = details.calls;
      workflow.save(deferred.makeNodeResolver());
      return deferred.promise;
    }).
    then(function returnTrue() {
      var deferred = queue.defer();
      deferred.resolve(workflow);
      res.send('ok');
      return deferred.promise;
    });
  }

  function getSorted(arr, sortArr) {
    var sorted = [];
    for (var i = 0; i < sortArr.length; i++) {
      var id = sortArr[i];

      var filtered = filterOnId(arr, id);

      sorted.push(filtered[0]);
    }
    return sorted;
  }

  function filterOnId(arr, id) {
    return arr.filter(function filterOnId(obj) {
      return String(obj._id) === String(id);
    });
  }

  function executeWorkflowById(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);


    var workflow = null;
    var callIndex = 0;
    var callResults = {};

    return queue().
    then(function getWorkflow() {
      var deferred = queue.defer();
      Workflow.findById(id, deferred.makeNodeResolver());
      return deferred.promise;
    }).
    then(function getCalls(retrievedWorkflow) {
      var deferred = queue.defer();
      workflow = retrievedWorkflow;

      APICall.find({
        _id: {
          $in: workflow.calls
        }
      }).exec(deferred.makeNodeResolver());

      return deferred.promise;
    }).
    then(function orderCalls(retrievedCalls) {
      var deferred = queue.defer();
      var calls = getSorted(retrievedCalls, workflow.calls);
      deferred.resolve(calls);

      return deferred.promise;
    }).
    then(function executeCalls(retrievedCalls) {
      var deferred = queue.defer();

      var apiCallQueue = queue();
      for (var i = 0; i < retrievedCalls.length; i++) {
        var call = retrievedCalls[i];

        apiCallQueue = apiCallQueue.
        then(executeApiCallWith(call)).
        then(registerAPICallExecution(queue, callIndex, callResults));
      }

      apiCallQueue.then(function() {
        deferred.resolve();
      }).catch(function error(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }).
    then(function displayResults() {
      var deferred = queue.defer();

      var results = [];

      queue().
      then(saveExecutions(workflow, callResults, results)).
      then(saveWorkflowExecution(workflow, results)).
      then(function() {
        res.send(results);
        deferred.resolve();
      });


      return deferred.promise;
    }).
    catch(function error(err) {
      res.status(500).send(err.toString());
    });
  }

  function executeApiCallWith(call) {
    return function wrapper() {
      return api.executeAPICall(call);
    };
  }

  function saveExecutions(workflow, callResults, results) {
    return function() {
      var deferred = queue.defer();

      var executionSaving = queue();

      for (var i in callResults) {

        var result = callResults[i];
        executionSaving = executionSaving.
        then(saveExecution(workflow, result)).
        then(pushResult(results));
      }

      executionSaving.then(deferred.makeNodeResolver());

      return deferred.promise;
    };
  }

  function pushResult(results) {
    return function(entry) {
      results.push(entry);
    };
  }

  function saveWorkflowExecution(workflow, results) {
    return function() {
      var deferred = queue.defer();

      var executionIds = results.map(function(execution) {
        return execution._id;
      });

      var workflowExecution = new WorkflowExecution({
        workflow: workflow._id,
        executedAt: new Date(),
        executions: executionIds
      });

      workflowExecution.save(deferred.makeNodeResolver());

      return deferred.promise;
    };
  }

  function saveExecution(workflow, result) {
    return function saveExecution() {
      var deferred = queue.defer();

      var execution = new Execution({
        workflow: workflow._id,
        apiCall: result.apiCall._id,
        statusCode: result.statusCode,
        response: result.response,
        headers: result.headers,
        type: result.type,
        data: result.data
      });


      execution.save(function(err, data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    };
  }

  function registerAPICallExecution(queue, callIndex, callResults) {
    return function registeredAPICall(data) {
      var deferred = queue.defer();

      data.index = callIndex++;
      callResults[data.apiCall.id] = data;

      deferred.resolve(data);
      return deferred.promise;
    };
  }

  module.exports = {
    deleteWorkflow: deleteWorkflow,
    getWorkflows: getWorkflows,
    getWorkflowById: getWorkflowById,
    registerWorkflow: registerWorkflow,
    saveWorkflow: saveWorkflow,
    executeWorkflowById: executeWorkflowById
  };
}(
  require('mongoose'),
  require('q'),
  require('./api.js'),
  require('./resources/Workflow'),
  require('./resources/Connector'),
  require('./resources/WorkflowExecution'),
  require('./resources/Execution'),
  require('./resources/APICall')
));
