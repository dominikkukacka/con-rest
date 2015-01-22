// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function connectorScope(mongoose, queue, Workflow, Connector) {
  'use strict';

  function addConnectorToWorkflow(req, res) {
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var connector = new Connector(req.body);
    return Workflow.findOneAndUpdate({
        _id: workflowId
      }, {
        $push: {
          connectors: connector
        }
      })
      .exec()
      .then(function returnWorkflow(workflow) {
        res.send(workflow);
        return workflow;
      }, function error(err) {
        res.status(500).send(err.toString());
      });
  }

  function saveConnector(req, res) {
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var connectorId = mongoose.Types.ObjectId(req.params.connectorId);
    var details = req.body;
    return Workflow.findOneAndUpdate({
        _id: workflowId,
        'connectors._id': connectorId
      }, {
        '$set': {
          'connectors.$.source': details.source,
          'connectors.$.destination': details.destination,
          'connectors.$.mapper': details.mapper
        }
      }).exec()
      .then(function resolveWithWorkflow(workflow) {
        res.send(workflow);
        return workflow;
      }, function(error) {
        res.status(500).send(error.toString());
        throw error;
      });
  }

  function getConnectorById(req, res) {
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var connectorId = mongoose.Types.ObjectId(req.params.connectorId);
    return Workflow.findOne({
        _id: workflowId
      }, {
        connectors: {
          $elemMatch: {
            _id: connectorId
          }
        }
      })
      .populate('connectors.source')
      .populate('connectors.destination')
      .populate('connectors.mapper')
      .exec()
      .then(function extractConnector(workflow) {
        var connector = workflow.connectors[0];
        res.send(connector);
        return connector;
      }, function error(err) {
        res.status(500).send(err.toString());
      });
  }

  function getConnectorsByWorkflowId(req, res) {
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    return Workflow.findById(workflowId)
      .exec()
      .then(function extractConnectors(workflow) {
        var connectors = workflow.connectors;
        res.send(connectors);
        return connectors;
      }, function error(err) {
        res.status(500).send(err.toString());
      });
  }


  function deleteConnector(req, res) {
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var connectorId = mongoose.Types.ObjectId(req.params.connectorId);
    return Workflow.findOneAndUpdate({
        _id: workflowId
      }, {
        $pull: {
          connectors: {
            _id: connectorId
          }
        }
      })
      .exec()
      .then(function deletedSuccessful() {
        res.send('deleted');
      }, function error(err) {
        res.status(500).send(err.toString());
      });
  }

  module.exports = {
    getConnectorById: getConnectorById,
    getConnectorsByWorkflowId: getConnectorsByWorkflowId,
    addConnectorToWorkflow: addConnectorToWorkflow,
    saveConnector: saveConnector,
    deleteConnector: deleteConnector
  };
}(
  require('mongoose'),
  require('q'),
  require('./resources/Workflow'),
  require('./resources/Connector')
));
