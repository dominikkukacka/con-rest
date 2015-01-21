// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function executionScope(mongoose, queue, Execution) {
  'use strict';

  var helper = require('./serverHelper');

  function getExecutions(req, res) {
    return helper.getAll(Execution, req, res);
  }

  function getExecutionById(req, res) {
    return helper.getById(Execution, req, res);
  }

  function getExecutionsOfWorkflow(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return Execution
      .find({
        workflow: id
      })
      .exec(helper.sendAndResolve(res));
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
