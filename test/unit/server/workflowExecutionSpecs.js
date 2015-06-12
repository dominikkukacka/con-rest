// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowExecutionSpecScope(sinon, nock, WorkflowExecution) {
  'use strict';

  var mockgoose = require('mockgoose');
  var mongoose = require('mongoose');

  mockgoose(mongoose);


  var queue = require('q');
  var path = require('path');
  var workflowExecution = require('../../../server/workflowExecution');


  describe('con-rest workflowExecution', function conRestworkflowExecutionScope() {

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    describe('retrieval of workflowExecutions', function retrievalScope() {
      it('should return all the registered workflowExecutions', function getRegisteredworkflowExecutions(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {};
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return workflowExecution.getWorkflowExecutions(req, res);
        }).
        then(function then(workflowExecutions) {
          workflowExecutions.length.should.be.above(0);
          res.send.args[0][0].length.should.be.above(0);
        }).
        then(done).
        catch(done);
      });

      it('should return a workflowExecution based on id', function getRegisteredworkflowExecutionById(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              workflowExecutionId: '5464b1e2f8243a3c32170001'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return workflowExecution.getWorkflowExecutionById(req, res);
        }).
        then(function then() {
          var workflowExecution = res.send.args[0][0];
          workflowExecution._id.toString().should.be.exactly('5464b1e2f8243a3c32170001');
          workflowExecution.executions.length.should.be.exactly(3);
        }).
        then(done).
        catch(done);
      });
    });
  });

}(require('sinon'), require('nock'), require('../../../server/resources/WorkflowExecution')));
