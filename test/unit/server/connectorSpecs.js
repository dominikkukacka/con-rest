// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function connectorScope(sinon, nock, _, expect, Connector, Workflow, Mapper) {
  'use strict';

  var mockgoose = require('mockgoose');
  var mongoose = require('mongoose');

  mockgoose(mongoose);


  var queue = require('q');
  var path = require('path');
  var connector = require('../../../server/connector');


  describe('con-rest connector', function conRestServerScope() {

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    describe('retrieval', function retrievalScope() {
      it('should return a connectors based on workflowId and connectorId', function getSingle(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              workflowId: '545726928469e940235ce701',
              connectorId: '545726928469e940235d0001'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return connector.getConnectorById(req, res);
        }).
        then(function then() {
          var call = res.send.args[0][0];
          expect(call._id.toString()).to.equal('545726928469e940235d0001');
          expect(call.source).to.exist;
          expect(call.destination).to.exist;
          expect(call.mapper).to.exist;
        }).
        then(done).
        catch(done);
      });
      it('should return all connectors based on workflowId', function getAll(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              workflowId: '545726928469e940235ce701'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return connector.getConnectorsByWorkflowId(req, res);
        }).
        then(function then() {
          var call = res.send.args[0][0];
          expect(call).to.have.length(3);
        }).
        then(done).
        catch(done);
      });
    });

    describe('saving', function registrationScope() {
      it('should register an new connector to an empty workflow', function registerConnector(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            body: {
              source: '545726928469e940235ce769',
              destination: '545726928469e940235ce770',
              mapper: '5464b1e2f8243a3c321a0001'
            },
            params: {
              workflowId: '545726928469e940235ce769'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return connector.addConnectorToWorkflow(req, res);
        }).
        then(function then(connector) {
          res.send.calledOnce.should.be.true;
          var data = res.send.args[0][0];
          expect(data).to.equal(connector._id);
        }).
        then(done).
        catch(done);
      });

      it('should register an new connector to an non-empty workflow', function registerConnector(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            body: {
              source: '545726928469e940235ce769',
              destination: '545726928469e940235ce770',
              mapper: '5464b1e2f8243a3c321a0001'
            },
            params: {
              workflowId: '545726928469e940235ce701'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return connector.addConnectorToWorkflow(req, res);
        }).
        then(function then(connector) {
          res.send.calledOnce.should.be.true;
          var data = res.send.args[0][0];
          expect(data).to.equal(connector._id);
        }).
        then(done).
        catch(done);
      });

      it('should overwrite an existing connector', function saveExistingConnector(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            body: {
              source: '545726928469e940235ce900',
              destination: '545726928469e940235ce900',
              mapper: '5464b1e2f8243a3c321a0002'
            },
            params: {
              workflowId: '545726928469e940235ce701',
              connectorId: '545726928469e940235d0003'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return connector.saveConnector(req, res);
        }).
        then(function then(data) {
          res.send.calledOnce.should.be.true;
        }).
        then(function when() {
          return connector.getConnectorById(req, {
            send: sinon.stub()
          });
        }).
        then(function then(connector) {
          var data = res.send.args[0][0];
          expect(data.connectors).to.have.length(3);
          expect(data.connectors[2].source.toString()).to.equal(req.body.source);
          expect(data.connectors[2].destination.toString()).to.equal(req.body.destination);
          expect(data.connectors[2].mapper.toString()).to.equal(req.body.mapper);
        }).
        then(done).
        catch(done);
      });
    });

    describe('deletion', function detionScope() {
      it('should delete an existing connector', function deleteWorkflow(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              workflowId: '545726928469e940235ce701',
              connectorId: '545726928469e940235d0002'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return connector.deleteConnector(req, res);
        }).
        then(function then() {
          var data = res.send.args[0][0];
          res.send.calledOnce.should.be.true;
          expect(data).to.be.a.String;
          expect(data).to.equal('deleted');
        }).
        then(function when() {
          return connector.getConnectorsByWorkflowId(req, {
            send: sinon.stub()
          });
        }).
        then(function then(workflow) {
          expect(workflow).to.have.length(2);
        }).
        then(done).
        catch(done);
      });
    });

  });
}(
  require('sinon'),
  require('nock'),
  require('underscore'),
  require('chai').expect,
  require('../../../server/resources/Connector'),
  require('../../../server/resources/Workflow'),
  require('../../../server/resources/Mapper')
));
