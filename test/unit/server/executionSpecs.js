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
                        // executions.length.should.be.above(0);
                        // res.send.args[0][0].length.should.be.above(0);
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
                                id: '5464b1e2f8243a3c32180000'
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
                        // call.name.should.be.exactly('firstexecution');
                        // call.calls.length.should.be.exactly(2);
                    }).
                    then(done).
                    catch(done);
            });
        });

        xdescribe('saving', function registrationScope() {
            it('should register an new execution', function registerexecution(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            body: {
                                name: 'fakeCall',
                                calls: ['545726927732d940235ce769', '545726928469e940235ce770']
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return execution.registerexecution(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(done).
                    catch(done);
            });

            it('should overwrite an existing execution', function saveExistingexecution(done) {
                var req;
                var res;
                queue().
                    then(function given() {
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
                    }).
                    then(function when() {
                        return execution.saveexecution(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(function when() {
                        return execution.getexecutionById(req);
                    }).
                    then(function then(execution) {
                        execution.name.should.be.exactly('overwritten');
                    }).
                    then(done).
                    catch(done);
            });
        });
    });

}(require('sinon'), require('nock')));