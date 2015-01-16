// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function connectorScope(mongoose, queue, Workflow) {
  'use strict';

  var Schema = mongoose.Schema;

  var connectorSchema = new Schema({
    source: {
      type: Schema.Types.ObjectId,
      ref: 'APICall'
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'APICall'
    },
    mapper: {
      type: Schema.Types.ObjectId,
      ref: 'Mapper'
    }
  });

  var Connector = mongoose.model('Connector', connectorSchema);

  function addConnectorToWorkflow(req, res) {
    var deferred = queue.defer();
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var details = req.body;

    queue().
    then(function() {
      var deferred = queue.defer();


      var connector = new Connector(details);

      Workflow.findOneAndUpdate({
        _id: workflowId
      }, {
        $push: {
          connectors: connector
        }
      }, deferred.makeNodeResolver());

      return deferred.promise;
    }).
    then(function(workflow) {
      res.send(workflow);
      deferred.resolve(workflow);
    }).
    catch(function error(err) {
      res.status(500).send(err.toString());
    });

    return deferred.promise;
  }

  function saveConnector(req, res) {
    var deferred = queue.defer();
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var connectorId = mongoose.Types.ObjectId(req.params.connectorId);
    var details = req.body;

    queue().
    then(function() {
      var deferred = queue.defer();
      Workflow.findById(workflowId, deferred.makeNodeResolver());
      return deferred.promise;
    }).
    then(function(workflow) {
      var deferred = queue.defer();

      // TODO: check if the .id(ObjectId) function will be better for this
      // idn't work when i checked, prob. Mockgoose does not support it
      for (var i = 0; i < workflow.connectors.length; i++) {
        var connector = workflow.connectors[i];
        if (connector._id.toString() === connectorId.toString()) {
          break;
        }
      }
      workflow.connectors[i] = details;
      workflow.save(deferred.makeNodeResolver());

      return deferred.promise;
    }).
    then(function(workflow) {
      res.send(workflow);
      deferred.resolve(workflow);
    }).
    catch(function error(err) {
      res.status(500).send(err.toString());
    });

    return deferred.promise;
  }

  function getConnectorById(req, res) {
    var mainDeferred = queue.defer();
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var connectorId = mongoose.Types.ObjectId(req.params.connectorId);

    queue().
    then(function() {
      var deferred = queue.defer();

      Workflow.find({
        _id: workflowId
      }, {
        connectors: {
          $elemMatch: {
            _id: connectorId.toString()
          }
        }
      }, deferred.makeNodeResolver());

      return deferred.promise;
    }).
    then(function(connectors) {
      var connector = connectors[0].connectors[0];
      mainDeferred.resolve(connector);
      res.send(connector);
    }).
    catch(function error(err) {
      res.status(500).send(err.toString());
    });

    return mainDeferred.promise;
  }

  function getConnectorsByWorkflowId(req, res) {
    var mainDeferred = queue.defer();
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);

    queue().
    then(function() {
      var deferred = queue.defer();
      Workflow.findById(workflowId, deferred.makeNodeResolver());
      return deferred.promise;
    }).
    then(function(workflow) {
      var connectors = workflow.connectors;
      mainDeferred.resolve(connectors);
      res.send(connectors);
    }).
    catch(function error(err) {
      res.status(500).send(err.toString());
    });

    return mainDeferred.promise;
  }


  function deleteConnector(req, res) {
    var mainDeferred = queue.defer();
    var workflowId = mongoose.Types.ObjectId(req.params.workflowId);
    var connectorId = mongoose.Types.ObjectId(req.params.connectorId);

    queue().
    then(function() {
      var deferred = queue.defer();

      Workflow.findOneAndUpdate({
        _id: workflowId
      }, {
        $pull: {
          connectors: {
            _id: connectorId
          }
        }
      }, deferred.makeNodeResolver());

      return deferred.promise;
    }).
    then(function() {
      res.send('deleted');
      mainDeferred.resolve('deleted');
    }).
    catch(function error(err) {
      res.status(500).send(err.toString());
    });

    return mainDeferred.promise;
  }

  module.exports = {
    Connector: Connector,
    getConnectorById: getConnectorById,
    getConnectorsByWorkflowId: getConnectorsByWorkflowId,
    addConnectorToWorkflow: addConnectorToWorkflow,
    saveConnector: saveConnector,
    deleteConnector: deleteConnector
  };
}(require('mongoose'), require('q'), require('./workflow').Workflow));
