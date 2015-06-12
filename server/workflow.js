// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowScope(mongoose, queue, api, connector, Workflow, WorkflowExecution, Execution, APICall) {
  'use strict';

  var helper = require('./serverHelper');

  function getWorkflows(req, res) {
    return helper.getAll(Workflow, req, res);
  }

  function getWorkflowById(req, res) {
    return Workflow.findById(req.params.id)
      .populate('calls')
      .exec()
      .then(function returnWorkflow(workflow) {
        if (!!workflow) {
          res.send(workflow);
        } else {
          res.status(404).send('not found');
        }
        return workflow;
      }, helper.sendAndResolve);
  }

  function deleteWorkflow(req, res) {
    return helper.deleteById(Workflow, req, res);
  }

  function registerWorkflow(req, res) {
    return helper.createAndReturnId(Workflow, req, res);
  }

  function saveWorkflow(req, res) {
    return helper.updateById(Workflow, req, res);
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

    return Workflow.findById(id)
      .populate('connectors.mapper')
      .exec()
      .then(function getCalls(retrievedWorkflow) {
        workflow = retrievedWorkflow;
        return APICall.find({
          _id: {
            $in: workflow.calls
          }
        }).populate('files.file').exec();
      })
      .then(function orderCalls(retrievedCalls) {
        return getSorted(retrievedCalls, workflow.calls);
      })
      .then(function executeCalls(retrievedCalls) {
        var apiCallQueue = queue();
        for (var i = 0; i < retrievedCalls.length; i++) {
          var call = retrievedCalls[i];

          apiCallQueue = apiCallQueue
            .then(connector.executeConnector(workflow, call, callResults))
            .then(api.executeAPICall)
            .then(registerAPICallExecution(queue, callIndex, callResults));
        }
        return apiCallQueue;
      })
      .then(function displayResults() {
        var results = [];
        return saveExecutions(workflow, callResults, results)
          .then(function saveExecution() {
            return saveWorkflowExecution(workflow, results);
          })
          .then(function(workflowExecution) {
            res.send(workflowExecution);
          });
      }, function error(err) {
        if (res.status) {
          console.log(err.toString());
          res.status(500).send(err.toString());
        }
        throw err;
      });
  }

  function saveExecutions(workflow, callResults, results) {
    var executionSaving = queue();
    for (var i in callResults) {
      var result = callResults[i];
      executionSaving = executionSaving
        .then(saveExecution(workflow, result))
        .then(pushResult(results));
    }
    return executionSaving;
  }

  function pushResult(results) {
    return function(entry) {
      results.push(entry);
    };
  }

  function saveWorkflowExecution(workflow, results) {
    var executionIds = results.map(function(execution) {
      return execution._id;
    });

    return WorkflowExecution.create({
      workflow: workflow._id,
      executedAt: new Date(),
      executions: executionIds
    });
  }

  function saveExecution(workflow, result) {
    return function saveExecution() {
      return Execution.create({
        workflow: workflow._id,
        apiCall: result.apiCall._id,
        url: result.url,
        statusCode: result.statusCode,
        response: result.response,
        headers: result.headers,
        type: result.type,
        data: result.data
      });
    };
  }

  function registerAPICallExecution(queue, callIndex, callResults) {
    return function registeredAPICall(data) {
      data.index = callIndex++;
      callResults[data.apiCall.id] = data;
      return data;
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
  require('./connector.js'),
  require('./resources/Workflow'),
  require('./resources/WorkflowExecution'),
  require('./resources/Execution'),
  require('./resources/APICall')
));
