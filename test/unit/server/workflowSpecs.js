// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(sinon, nock, expect, Execution) {
  'use strict';

  var mockgoose = require('mockgoose');
  var mongoose = require('mongoose');

  mockgoose(mongoose);


  var queue = require('q');
  var path = require('path');
  var workflow = require('../../../server/workflow');

  describe('con-rest server', function conRestServerScope() {

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    describe('retrieval of Workflows', function retrievalScope() {
      it('should return all the registered workflows', function getRegisteredWorkflows(done) {
        var req;
        var res;
        queue()
          .then(function given() {
            req = {};
            res = {};
            res.send = sinon.spy();
          })
          .then(function when() {
            return workflow.getWorkflows(req, res);
          })
          .then(function then(workflows) {
            workflows.length.should.be.above(0);
            res.send.args[0][0].length.should.be.above(0);
          })
          .then(done)
          .catch(done);
      });

      it('should return a workflow based on id', function getRegisteredWorkflowById(done) {
        var req;
        var res;
        queue()
          .then(function given() {
            req = {
              params: {
                id: '545726928469e940235ce769'
              }
            };
            res = {};
            res.send = sinon.spy();
          })
          .then(function when() {
            return workflow.getWorkflowById(req, res);
          })
          .then(function then() {
            var call = res.send.args[0][0];
            call.name.should.be.exactly('firstWorkflow');
            call.calls.length.should.be.exactly(2);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('saving', function registrationScope() {
      it('should register an new workflow', function registerWorkflow(done) {
        var req;
        var res;
        queue()
          .then(function given() {
            req = {
              body: {
                name: 'fakeCall',
                calls: ['545726927732d940235ce769', '545726928469e940235ce770']
              }
            };
            res = {};
            res.send = sinon.spy();
          })
          .then(function when() {
            return workflow.registerWorkflow(req, res);
          })
          .then(function then() {
            res.send.calledOnce.should.be.true;
            res.send.args[0][0].should.be.a.String;
          })
          .then(done)
          .catch(done);
      });

      it('should overwrite an existing workflow', function saveExistingWorkflow(done) {
        var req;
        var res;
        queue()
          .then(function given() {
            req = {
              body: {
                name: 'overwritten',
                calls: ['545726928469e940235ce769', '545726928469e940235ce770']
              },
              params: {
                id: '545726928469e940235ce769'
              }
            };
            res = {};
            res.send = sinon.spy();
          })
          .then(function when() {
            return workflow.saveWorkflow(req, res);
          })
          .then(function then() {
            res.send.calledOnce.should.be.true;
            res.send.args[0][0].should.be.a.String;
          })
          .then(function when() {
            return workflow.getWorkflowById(req, {
              send: sinon.stub()
            });
          })
          .then(function then(workflow) {
            workflow.name.should.be.exactly('overwritten');
          })
          .then(done)
          .catch(done);
      });
    });

    describe('deletion', function detionScope() {
      it('should delete an existing workflow', function saveExistingWorkflow(done) {
        var req;
        var res;
        queue()
          .then(function given() {
            req = {
              params: {
                id: '545726928469e940235ce769'
              }
            };
            res = {};
            res.send = sinon.spy();
          })
          .then(function when() {
            return workflow.deleteWorkflow(req, res);
          })
          .then(function then() {
            res.send.calledOnce.should.be.true;
            res.send.args[0][0].should.be.a.String;
          })
          .then(function when() {
            return workflow.getWorkflowById(req, {
              send: sinon.stub(),
              status: function() {
                return {
                  send: sinon.stub()
                };
              }
            });
          })
          .then(function then(workflow) {
            (workflow === null).should.be.true;
          })
          .then(done)
          .catch(done);
      });
    });

    describe('execution of Workflows', function retrievalScope() {
      it('should execute a workflow', function getRegisteredWorkflows(done) {

        for (var i = 0; i <= 2; i++) {
          nock('http://httpbin.org').
          get('/get').
          reply(200, {
            indicator: 100 + i
          });
        }

        var req;
        var res;
        var startCount = 0;
        queue()
          .then(function given() {
            req = {
              params: {
                id: '545726928469e940235ce700'
              }
            };
            res = {};
            res.send = sinon.spy();
          })
          .then(function() {
            return Execution.count().exec();
          })
          .then(function when(count) {
            startCount = count;
            return workflow.executeWorkflowById(req, res);
          })
          .then(function then() {
            var workflowExecution = res.send.args[0][0];
            workflowExecution.executions.length.should.be.exactly(3);
          })
          .then(done)
          .catch(done);
      });

      it('should execute a workflow with connectors', function getRegisteredWorkflows(done) {

        for (var i = 0; i < 2; i++) {
          nock('http://httpbin.org').
          get('/get').
          reply(200, {
            indicator: 100 + i,
            path: {
              to: {
                follow: [
                  1336,
                  1337,
                  1338
                ]
              }
            }
          });
        }

        nock('http://httpbin.org').
        get('/get?testKey=1336').
        reply(200, {
          indicator: 100 + i,
          path: {
            to: {
              follow: [
                1336,
                1337,
                1338
              ]
            }
          }
        });

        var req;
        var res;
        var startCount = 0;
        queue()
          .then(function given() {
            req = {
              params: {
                id: '545726928469e940235ce701'
              }
            };
            res = {};
            res.send = sinon.spy();
          })
          .then(function() {
            return Execution.count().exec();
          })
          .then(function when(count) {
            startCount = count;
            return workflow.executeWorkflowById(req, res);
          })
          .then(function then() {
            var workflowExecution = res.send.args[0][0];
            workflowExecution.executions.length.should.be.exactly(3);
          })
          .then(done)
          .catch(done);
      });
      it('should execute a workflow with connectors (data)', function getRegisteredWorkflows(done) {

        nock('http://httpbin.org')
          .get('/get')
          .reply(200, {
            origin: '10.10.10.10',
            url: 'http://httpbin.org/get'
          });

        nock('http://httpbin.org')
          .filteringRequestBody(function(path) {
            return 'foobar';
          })
          .post('/post', 'foobar')
          .reply(200);

        var req;
        var res;
        var startCount = 0;
        queue()
          .then(function given() {
            req = {
              params: {
                id: '545726928469e940235ce702'
              }
            };
            res = {};
            res.send = sinon.spy();
          })
          .then(function() {
            return Execution.count().exec();
          })
          .then(function when(count) {
            startCount = count;
            return workflow.executeWorkflowById(req, res);
          })
          .then(function then() {
            var workflowExecution = res.send.args[0][0];
            workflowExecution.executions.length.should.be.exactly(2);
          })
          .then(done)
          .catch(done);
      });
    });
  });

}(
  require('sinon'),
  require('nock'),
  require('chai').expect,
  require('../../../server/resources/Execution')
));
