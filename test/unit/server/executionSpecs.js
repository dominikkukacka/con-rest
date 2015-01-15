// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function executionSpecScope(sinon, nock) {
  'use strict';

  var mockgoose = require('mockgoose');
  var mongoose = require('mongoose');

  mockgoose(mongoose);


  var queue = require('q');
  var path = require('path');
  var execution = require('../../../server/execution');


  describe('con-rest execution', function conRestExecutionScope() {

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    describe('retrieval of executions', function retrievalScope() {
      it('should return all the registered executions', function getRegisteredexecutions(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {};
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return execution.getExecutions(req, res);
        }).
        then(function then(executions) {
          executions.length.should.be.above(0);
          res.send.args[0][0].length.should.be.above(0);
        }).
        then(done).
        catch(done);
      });

      it('should return a execution based on id', function getRegisteredexecutionById(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              id: '5464b1e2f8243a3c32180004'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return execution.getExecutionById(req, res);
        }).
        then(function then() {
          var call = res.send.args[0][0];
          call.id.should.be.exactly('5464b1e2f8243a3c32180004');
        }).
        then(done).
        catch(done);
      });
    });
  });

}(require('sinon'), require('nock')));
